import type { CollectionConfig } from 'payload/types';

export const Events: CollectionConfig = {
	slug: 'events',
	auth: false, // TODO: Set to true once we have authentication
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true
		}
	]
};
