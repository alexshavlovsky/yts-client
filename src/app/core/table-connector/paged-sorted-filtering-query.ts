export interface PagedSortedFilteringQuery {
  pageIndex: number;
  pageSize: number;
  sortProperty: string | undefined;
  sortDirection: string | undefined;
  filter: string;
}
