import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueryResponse } from '../http-query.model';
import { HttpQueryState, HTTP_QUERY_KEY } from './http-query.state';
import { HttpResponse } from '@angular/common/http';

export const httpQueryState = createFeatureSelector<HttpQueryState>(HTTP_QUERY_KEY);

export const isInProgressSelector = (groupName: string) => createSelector(
  httpQueryState,
  (state: HttpQueryState) => state.groups[groupName]?.isInProgress ?? false,
);

export const getQuery = <T>(state: HttpQueryState, name: string): QueryResponse<HttpResponse<T>> =>
  state.queries[name] as QueryResponse<HttpResponse<T>>;

export const query = <T>(queryName: string) => createSelector(
  httpQueryState,
  (state: HttpQueryState) => getQuery<T>(state, queryName)
);

export const body = <T>(queryName: string) => createSelector(
  httpQueryState,
  (state: HttpQueryState) => {
    const queryData = getQuery<T>(state, queryName);
    return queryData?.response?.body || null;
  }
);

export const response = <T>(queryName: string) => createSelector(
  httpQueryState,
  (state: HttpQueryState) => {
    const queryData = getQuery<T>(state, queryName);
    return queryData?.response || null;
  }
);

export const error = (queryName: string) => createSelector(
  httpQueryState,
  (state: HttpQueryState) => {
    const queryData = getQuery(state, queryName);
    return queryData?.error ?? null;
  }
);

export const status = (queryName: string) => createSelector(
  httpQueryState,
  (state: HttpQueryState) => {
    const queryData = getQuery(state, queryName);
    return queryData?.status ?? null;
  }
);
