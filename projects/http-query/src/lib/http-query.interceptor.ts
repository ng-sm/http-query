import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryConfig } from './http-query.model';
import { HttpQueryFacade } from './store/http-query.facade';
import * as QueryActions from './store/http-query.actions';

@Injectable()
export class HttpQueryInterceptor implements HttpInterceptor {
  public readonly queryNameKey = 'queryName';
  public readonly queryGroupsKey = 'queryGroups';

  constructor(private queryFacade: HttpQueryFacade) {}

  getConfig(request: HttpRequest<unknown>): QueryConfig {
    return {
      name: request.headers.get(this.queryNameKey) || '',
      groups: request.headers.getAll(this.queryGroupsKey)
    };
  }

  deleteHeaders(request: HttpRequest<unknown>): HttpHeaders {
    return request.headers
      .delete(this.queryNameKey)
      .delete(this.queryGroupsKey);
  }

  parseRequest(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    return !request.headers.has(this.queryNameKey)
      ? request
      : request.clone({ headers: this.deleteHeaders(request) });
  }

  handleSuccess(response: HttpEvent<unknown>, config: QueryConfig): void {
    if (response instanceof HttpResponse) {
      this.queryFacade.dispatch(QueryActions.success({ config, response }));
    }
  }

  handleError(error: HttpErrorResponse, config: QueryConfig): Observable<never> {
    this.queryFacade.dispatch(QueryActions.failure({ config, error }));
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const config = this.getConfig(request);

    if (!config.name) {
      return next.handle(request);
    }

    this.queryFacade.dispatch(QueryActions.inProgress({ config }));

    return next
      .handle(this.parseRequest(request))
      .pipe(
        tap(response => this.handleSuccess(response, config)),
        catchError(error => this.handleError(error, config)),
      );
  }
}
