import { DataApiResponse } from './data-api-response';

export interface DataApiPageResponse<T> {
  page: number;
  limit: number;
  data: DataApiResponse<T>;
}
