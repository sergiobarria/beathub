export type APIListResponse<T> = {
	docs: T[];
	hasNextPage: boolean;
	hasPrevPage: boolean;
	limit: number;
	nextPage: number | null;
	page: number;
	pagingCounter: number;
	prevPage: number | null;
	totalDocs: number;
	totalPages: number;
};

export type Event = {
	id: number;
	title: string;
	updatedAt: string;
	createdAt: string;
};
