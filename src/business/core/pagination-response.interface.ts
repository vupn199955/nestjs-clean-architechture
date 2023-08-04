export interface IResponsePagination<T> {
  data: T[];
  meta: {
    totalPage: number;
    page: number;
    take: number;
    totalItem: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
