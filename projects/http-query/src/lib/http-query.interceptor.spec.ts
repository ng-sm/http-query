import { HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpQueryInterceptor } from './http-query.interceptor';
import { QueryActions } from './store';
import { HttpQueryFacade } from './store/http-query.facade';

describe('http-query.interceptor', () => {
  const queryName = 'test-query-name';
  const queryGroups =  ['test-query-group'];

  let httpQueryInterceptor: HttpQueryInterceptor;
  let httpQueryFacade: HttpQueryFacade;
  let requestMock: HttpRequest<unknown>;
  let requestHeaders: HttpHeaders;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        HttpQueryFacade,
        HttpQueryInterceptor,
      ]
    });

    httpQueryInterceptor = TestBed.inject(HttpQueryInterceptor);
    httpQueryFacade = TestBed.inject(HttpQueryFacade);
  });

  beforeEach(() => {
    requestHeaders = new HttpHeaders({
      [httpQueryInterceptor.queryNameKey]: queryName,
      [httpQueryInterceptor.queryGroupsKey]: queryGroups,
    });
    requestMock = new HttpRequest('GET', 'https://test.com/', { headers: requestHeaders });
  });


  it('#deleteHeaders should remove http query headers', () => {
    expect(requestMock.headers.get(httpQueryInterceptor.queryNameKey)).toEqual(queryName);
    expect(requestMock.headers.getAll(httpQueryInterceptor.queryGroupsKey)).toEqual(queryGroups);

    const transformedHeaders = httpQueryInterceptor.deleteHeaders(requestMock);

    expect(transformedHeaders.get(httpQueryInterceptor.queryNameKey)).toEqual(null);
    expect(transformedHeaders.getAll(httpQueryInterceptor.queryGroupsKey)).toEqual(null);
  });

  it('#getConfig should return config structure based on headers', () => {
    const config = httpQueryInterceptor.getConfig(requestMock);

    expect(config).toEqual({ name: queryName, groups: queryGroups });
  });

  it('#parseRequest should return not changed request when HttpHeaders not exist', () => {
    const requestWithoutHttpHeaders =  new HttpRequest('GET', 'https://test.com/');

    expect(httpQueryInterceptor.parseRequest(requestWithoutHttpHeaders)).toEqual(requestWithoutHttpHeaders);
  });

  it('#parseRequest should return changed request when HttpHeaders exist', () => {
    const transformedRequest = httpQueryInterceptor.parseRequest(requestMock);

    expect(transformedRequest.headers.get(httpQueryInterceptor.queryNameKey)).toEqual(null);
    expect(transformedRequest.headers.getAll(httpQueryInterceptor.queryGroupsKey)).toEqual(null);
  });

  it('#handleSuccess should dispatch HTTP query SUCCESS action for HttpResponse instance', () => {
    const queeryActionSpyOn = spyOn(httpQueryFacade, 'dispatch');
    const config = { name: queryName, groups: queryGroups };
    const response = new HttpResponse({ body: 'test' });

    httpQueryInterceptor.handleSuccess(response, config);

    expect(queeryActionSpyOn).toHaveBeenCalledWith(QueryActions.success({ config, response }));
  });

  it('#handleError should dispatch HTTP query ERROR action', () => {
    const queeryActionSpyOn = spyOn(httpQueryFacade, 'dispatch');
    const config = { name: queryName, groups: queryGroups };
    const error = new HttpErrorResponse({ error: 'test' });

    httpQueryInterceptor.handleError(error, config);

    expect(queeryActionSpyOn).toHaveBeenCalledWith(QueryActions.failure({ config, error }));
  });
});
