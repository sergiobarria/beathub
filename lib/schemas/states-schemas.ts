import { z } from 'zod';

export const StateSchema = z.object({
	id: z.string(),
	name: z.string(),
	abbreviation: z.string()
});

export type State = z.infer<typeof StateSchema>;
