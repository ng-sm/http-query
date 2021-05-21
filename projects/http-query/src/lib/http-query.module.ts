import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { QueryReducer, HTTP_QUERY_KEY, HttpQueryFacade } from './store';
import { HttpQueryInterceptor } from './http-query.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature(HTTP_QUERY_KEY, QueryReducer),
  ],
  providers: [
    HttpQueryFacade,
    { provide: HTTP_INTERCEPTORS, useClass: HttpQueryInterceptor, multi: true },
  ]
})
export class HttpQueryModule {}
