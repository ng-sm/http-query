import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Queries, QueryResponse } from './http-query.model';

export const isQueryInProgress = (queries: QueryResponse<unknown>[]): boolean =>
  queries.some(({isInProgress}) => isInProgress);

export const isQueryGroupInProgress = (queries: Queries): boolean =>
  isQueryInProgress(Object.values(queries));

export const isQueryInProgress$ = (queries: Observable<QueryResponse<unknown>>[]): Observable<boolean> =>
  combineLatest(queries).pipe(map(isQueryInProgress));
