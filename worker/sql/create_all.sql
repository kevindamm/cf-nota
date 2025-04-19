-- Copyright (c) 2025, Kevin Damm
-- All Rights Reserved.
-- BSD 3-Clause License:
-- 
-- Redistribution and use in source and binary forms, with or without
-- modification, are permitted provided that the following conditions are met:
-- 
-- 1. Redistributions of source code must retain the above copyright notice,
--    this list of conditions and the following disclaimer.
-- 
-- 2. Redistributions in binary form must reproduce the above copyright notice,
--    this list of conditions and the following disclaimer in the documentation
--    and/or other materials provided with the distribution.
-- 
-- 3. Neither the name of the copyright holder nor the names of its
--    contributors may be used to endorse or promote products derived from
--    this software without specific prior written permission.
-- 
-- THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
-- AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
-- IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
-- ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
-- LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
-- CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
-- SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
-- INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
-- CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
-- ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
-- POSSIBILITY OF SUCH DAMAGE.
-- 
-- github:kevindamm/cf-nota/worker/sql/create_all.sql

--
-- Database TABLE and INDEX definitions for oidio
--
--   [-------]
--   | Notes |------ 1..N ---[ Note_Audio ]
--   [-------]                  +
--      + text         
--      + created_ts (indexed)
--      + updated_ts (indexed)

-- The main relation, a note's text transcription and its ID
-- includes some metadata about creation and last updated
CREATE TABLE IF NOT EXISTS "Notes" (
    "note_id"      INTEGER
      PRIMARY KEY    

  , "created_ts"   DATETIME
                     DEFAULT CURRENT_TIMESTAMP
) WITHOUT rowid;

-- Index on timestamp for efficient chronological ordering by creation time.
CREATE INDEX IF NOT EXISTS "Note__Created"
  ON Notes (created_ts);

-- Secondary relation that includes a text representation.
-- The text may be transcribed from audio or manually entered, or edited.
CREATE TABLE IF NOT EXISTS "Note_Text" (
    "note_id"      INTEGER
      NOT NULL
      REFERENCES    Notes (note_id)
      ON DELETE     CASCADE

  , "text"         TEXT
      NOT NULL       DEFAULT "..."
  , "updated_ts"   DATETIME
                     DEFAULT CURRENT_TIMESTAMP
);

-- Index for gathering all note edits for the same note together.
CREATE INDEX IF NOT EXISTS "Note__Collection"
  ON Note_Text (note_id);

-- Index on timestamp for efficient latest-of and timeline ordering.
CREATE UNIQUE INDEX IF NOT EXISTS "Note__Updated"
  ON Note_Text (note_id, updated_ts);

-- Secondary relation that includes an audio representation.
CREATE TABLE IF NOT EXISTS "Note_Audio" (
    "note_id"      INTEGER
      NOT NULL
      REFERENCES     Notes (note_id)
      ON DELETE      CASCADE

  , "audio_uri"    TEXT
      NOT NULL       CHECK (audio_uri <> "")
  , "uploaded_ts"  DATETIME
                     DEFAULT CURRENT_TIMESTAMP
); 

-- Index for collecting all audio for the same note together.
CREATE INDEX IF NOT EXISTS "Audio__Note"
  ON Note_Audio (note_id);

-- Each audio_url is only associated with a single (textual) note.
CREATE UNIQUE INDEX IF NOT EXISTS "AudioUri__Unique"
  ON Note_Audio (audio_uri);
