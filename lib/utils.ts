import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from './env';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateImageURL(objectKey: string | undefined) {
	console.log('🚀 ~ generateImageURL ~ objectKey:', objectKey);
	if (!objectKey) return 'https://placehold.co/400';

	return process.env.NEXT_PUBLIC_STORAGE_URL + '/' + objectKey;
}
