import { InjectionToken } from '@angular/core';

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
}

export const SANITY_CONFIG = new InjectionToken<SanityConfig>('SANITY_CONFIG');
