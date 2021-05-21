import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpQueryState } from './store';

export interface Queries {
  [key: string]: QueryResponse<HttpResponse<unknown> | null>;
}

export interface QueryGroups {
  [key: string]: QueryGroup;
}

export interface QueryGroup {
  queryNames: string[];
  isInProgress: boolean;
}

export interface QueryConfig {
  name: string;
  groups?: string[] | null;
}

export enum QueryStatus {
  Success = 'SUCCESS',
  InProgress = 'IN_PROGRESS',
  Failure = 'FAILURE',
}

export interface QueryResponse<T = null> {
  name: string;
  response: T | null;
  error: HttpErrorResponse | null;
  status: QueryStatus | null;
  isSuccess: boolean;
  isFailed: boolean;
  isInProgress: boolean;
  isDirty: boolean;
  isFinished: boolean;
}

export interface QueryData<T> {
  state: HttpQueryState;
  config: QueryConfig;
  query: QueryResponse<T extends null ? null : HttpResponse<T>>;
  groupName?: string;
}
