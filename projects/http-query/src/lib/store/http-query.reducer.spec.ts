import { httpQueryReducer, QueryReducer } from './http-query.reducer';
import { initialState } from './http-query.state';
import * as httpQueryActions from './http-query.actions';
import { initialQuery } from '../http-query.helpers';
import { QueryStatus, QueryResponse } from '../http-query.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('http-query.reducer', () => {
  const config = { name: 'queryTest', groups: ['groupTest']};

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = httpQueryReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('init action', () => {
    it('should update the state in an immutable way', () => {
      const action = httpQueryActions.init({ config });
      const state = httpQueryReducer(initialState, action);

      expect(state).toEqual({
        queries: {
          queryTest: {
            ...initialQuery,
            name: 'queryTest',
          }
        },
        groups: {
          groupTest: {
            queryNames: ['queryTest'],
            isInProgress: false
          }
        },
      });
    });
  });

  describe('clear action', () => {
    it('should update the state in an immutable way', () => {
      const action = httpQueryActions.clear({ config });
      const state = httpQueryReducer(initialState, action);

      expect(state).toEqual({
        queries: {
          queryTest: {
            ...initialQuery,
            name: 'queryTest',
          }
        },
        groups: {
          groupTest: {
            queryNames: ['queryTest'],
            isInProgress: false
          }
        },
      });
    });
  });

  describe('inProgress action', () => {
    it('should update the state in an immutable way', () => {
      const action = httpQueryActions.inProgress({ config });
      const state = httpQueryReducer(initialState, action);

      expect(state).toEqual({
        queries: {
          queryTest: {
            name: 'queryTest',
            status: QueryStatus.InProgress,
            isDirty: true,
            isInProgress: true,
            isSuccess: false,
            isFailed: false,
            isFinished: false,
          } as QueryResponse<null>
        },
        groups: {
          groupTest: {
            queryNames: ['queryTest'],
            isInProgress: true
          }
        },
      });
    });
  });

  describe('success action', () => {
    it('should update the state in an immutable way', () => {
      const response = new HttpResponse<null>({ body: null });
      const action = httpQueryActions.success({ config, response });
      const state = httpQueryReducer(initialState, action);

      expect(state).toEqual({
        queries: {
          queryTest: {
            name: 'queryTest',
            status: QueryStatus.Success,
            isDirty: true,
            isInProgress: false,
            isSuccess: true,
            isFailed: false,
            isFinished: true,
            response,
            error: null,
          } as QueryResponse<HttpResponse<null>>
        },
        groups: {
          groupTest: {
            queryNames: ['queryTest'],
            isInProgress: false
          }
        },
      });
    });
  });

  describe('failure action', () => {
    it('should update the state in an immutable way', () => {
      const error = new HttpErrorResponse({});
      const action = httpQueryActions.failure({ config, error });
      const state = httpQueryReducer(initialState, action);

      expect(state).toEqual({
        queries: {
          queryTest: {
            name: 'queryTest',
            status: QueryStatus.Failure,
            isDirty: true,
            isInProgress: false,
            isSuccess: false,
            isFailed: true,
            isFinished: true,
            response: null,
            error,
          } as QueryResponse<null>
        },
        groups: {
          groupTest: {
            queryNames: ['queryTest'],
            isInProgress: false
          }
        },
      });
    });
  });

  it('QueryReducer should return HTTP Query reducer with state', () => {
    const action = { type: 'Unknown' };
    const state = httpQueryReducer(initialState, action);

    expect(QueryReducer(state, action)).toEqual(initialState);
  });
});
