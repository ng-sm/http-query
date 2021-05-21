import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { HttpQueryState } from './http-query.state';
import * as QuerySelectors from './http-query.selectors';
import { QueryResponse, QueryStatus } from '../http-query.model';

@Injectable()
export class HttpQueryFacade {
  constructor(private store: Store<HttpQueryState>) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  isInProgress$(groupName: string): Observable<boolean> {
    const selector = QuerySelectors.isInProgressSelector(groupName);
    return this.store.pipe(select(selector));
  }

  query$<T>(queryName: string): Observable<QueryResponse<HttpResponse<T>>> {
    const selector = QuerySelectors.query<T>(queryName);
    return this.store.pipe(select(selector));
  }

  response$<T>(queryName: string): Observable<HttpResponse<T> | null> {
    const selector = QuerySelectors.response<T>(queryName);
    return this.store.pipe(select(selector));
  }

  body$<T>(queryName: string): Observable<T | null> {
    const selector = QuerySelectors.body<T>(queryName);
    return this.store.pipe(select(selector));
  }

  error$(queryName: string): Observable<HttpErrorResponse | null> {
    const selector = QuerySelectors.error(queryName);
    return this.store.pipe(select(selector));
  }

  status$(queryName: string): Observable<QueryStatus | null> {
    const selector = QuerySelectors.status(queryName);
    return this.store.pipe(select(selector));
  }
}

