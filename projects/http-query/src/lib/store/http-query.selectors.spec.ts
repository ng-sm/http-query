import { HttpQueryState } from './http-query.state';
import { QueryStatus } from '../http-query.model';
import * as selectors from './http-query.selectors';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('http-query.Selectors', () => {
  const initialState: HttpQueryState = {
    queries: {
      queryTest: {
        name: 'queryTest',
        status: QueryStatus.Failure,
        isDirty: true,
        isInProgress: false,
        isSuccess: false,
        isFailed: true,
        isFinished: true,
        response: new HttpResponse({ body: 'test' }),
        error:  new HttpErrorResponse({ error: 'test' }),
      }
    },
    groups: {
      groupTest: {
        queryNames: ['queryTest'],
        isInProgress: true
      }
    },
  };

  it('should select "isInProgress" flag for selected group', () => {
    const result = selectors
      .isInProgressSelector('groupTest')
      .projector(initialState);

    expect(result).toEqual(true);
  });

  it('should "isInProgress" selector return false when HTTP query group is not existed', () => {
    const result = selectors
      .isInProgressSelector('notExistedGroup')
      .projector(initialState);

    expect(result).toEqual(false);
  });

  it('should select "isInProgress" flag of provided group', () => {
    const result = selectors
      .query('queryTest')
      .projector(initialState);

    expect(result).toEqual({
      name: 'queryTest',
      status: QueryStatus.Failure,
      isDirty: true,
      isInProgress: false,
      isSuccess: false,
      isFailed: true,
      isFinished: true,
      response: new HttpResponse({ body: 'test' }),
      error:  new HttpErrorResponse({ error: 'test' }),
    });
  });

  it('should select "body" of provided query', () => {
    const result = selectors
      .body('queryTest')
      .projector(initialState);

    expect(result).toEqual('test');
  });

  it('should return null for not existed query', () => {
    const result = selectors
      .body('notExistQuery')
      .projector(initialState);

    expect(result).toEqual(null);
  });

  it('should select "response" of provided query', () => {
    const result = selectors
      .response('queryTest')
      .projector(initialState);

    expect(result).toEqual(new HttpResponse({ body: 'test' }));
  });

  it('should "response" selector return "null" when HTTP query group is not existed', () => {
    const result = selectors
      .response('notExistedGroup')
      .projector(initialState);

    expect(result).toEqual(null);
  });

  it('should select "error" of provided query', () => {
    const result = selectors
      .error('queryTest')
      .projector(initialState);

    expect(result).toEqual(new HttpErrorResponse({ error: 'test' }));
  });

  it('should "error" selector return "null" when HTTP query group is not existed', () => {
    const result = selectors
      .error('notExistedGroup')
      .projector(initialState);

    expect(result).toEqual(null);
  });

  it('should select "status" of provided query', () => {
    const result = selectors
      .status('queryTest')
      .projector(initialState);

    expect(result).toEqual(QueryStatus.Failure);
  });

  it('should "status" selector return "null" when HTTP query group is not existed', () => {
    const result = selectors
      .status('notExistedGroup')
      .projector(initialState);

    expect(result).toEqual(null);
  });
});
