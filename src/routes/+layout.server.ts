import type { LayoutServerLoad } from './$types';
import { loadFlash } from 'sveltekit-flash-message/server';

// NOTE: We wrap the load function with `loadFlash` to enable flash messages in the layout
export const load: LayoutServerLoad = loadFlash(async () => {
	return {};
});
