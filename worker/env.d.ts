/// <reference types="@cloudflare/workers-types/2023-07-01" />

import type { Ai, Fetcher, R2Bucket } from "@cloudflare/workers-types";

declare module "h3" {
  interface H3EventContext {
    cf: CfProperties;
    cloudflare: {
      request: Request;
      env: Env;
      context: ExecutionContext;
    };
  }
}

export interface Env {
  ASSETS: Fetcher,
  WHISPER: Ai,
  MEDIA: R2Bucket,
}

export {};
