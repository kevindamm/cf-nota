// Copyright (c) 2025, Kevin Damm
// All Rights Reserved.
// BSD 3-Clause License:
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
// 
// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
// 
// github:kevindamm/cf-nota/worker/composables/useMediaRecorder.ts

interface MediaRecorderState {
  isRecording: boolean;
  recordingDuration: number;
  audioData: Uint8Array | null;
  updateTrigger: number;
}

export function useMediaRecorder() {
  const state = ref<MediaRecorderState>({
    isRecording: false,
    recordingDuration: 0,
    audioData: null,
    updateTrigger: 0,
  })

  let animationFrame: number | null = null
  let analyser: AnalyserNode | null = null

  const updateAudioData = () => {
    // Handle transition between recording and not recording.
    if (!analyser || !state.value.isRecording || !state.value.audioData) {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      return;
    }

    // signal that updates are ready, schedule next update at next animation frame.
    analyser.getByteTimeDomainData(state.value.audioData);
    state.value.updateTrigger += 1;
    animationFrame = requestAnimationFrame(updateAudioData);
  };

  let audioContext: AudioContext | null = null
  let mediaRecorder: MediaRecorder | null = null
  let audioChunks: Blob[] | undefined = undefined

  // Use the MediaRecorder browser object to capture the default recording device.
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        audioChunks?.push(e.data);
        state.value.recordingDuration += 1;
      };

      state.value.audioData = new Uint8Array(analyser.frequencyBinCount);
      state.value.isRecording = true;
      state.value.recordingDuration = 0;
      state.value.updateTrigger = 0;
      mediaRecorder.start(1000);

      updateAudioData();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      throw err;
    }
  };

  // Stop the audio recording through MediaRecorder.
  const stopRecording = async () => {
    return await new Promise<Blob>((resolve) => {
      if (mediaRecorder && state.value.isRecording) {
        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          audioChunks = undefined;

          state.value.recordingDuration = 0;
          state.value.updateTrigger = 0;
          state.value.audioData = null;

          resolve(blob);
        };

        state.value.isRecording = false;
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());

        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }

        audioContext?.close();
        audioContext = null;
      }
    });
  };

  // Make sure this composable cleans up after itself.
  onUnmounted(() => {
    stopRecording();
  });

  // Components can read the state and call start/stop functions.
  return {
    state: readonly(state),
    startRecording,
    stopRecording,
  };
}
