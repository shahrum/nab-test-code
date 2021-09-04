export namespace MaterialTable {
	export interface HeadCells {
		id: string;
		numeric: boolean;
		disablePadding: boolean;
		label: string;
	}
	export interface PaginationInfo {
		page: number;
		perPage: number;
		total: number;
		totalPages: number;
	}
}
