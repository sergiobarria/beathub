import { generateSvelteHelpers } from '@uploadthing/svelte';
import type { AppFileRouter } from './server/upload';

export const { createUploader, createUploadThing } = generateSvelteHelpers<AppFileRouter>();
