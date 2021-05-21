import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as HttpQueryActions from './http-query.actions';

describe('http-query.actions', () => {
  const config = { name: 'test', groups: ['test']};

  it('should create "init" action', () => {
    const action = HttpQueryActions.init({ config });

    expect(action).toEqual({
      type: `${HttpQueryActions.QUERY_KEY} INIT`,
      config,
    });
  });

  it('should create "in progress" action', () => {
    const action = HttpQueryActions.inProgress({ config });

    expect(action).toEqual({
      type: `${HttpQueryActions.QUERY_KEY} IN_PROGRESS`,
      config,
    });
  });


  it('should create "success" action', () => {
    const response = new HttpResponse();
    const action = HttpQueryActions.success({ config, response });

    expect(action).toEqual({
      type: `${HttpQueryActions.QUERY_KEY} SUCCESS`,
      config,
      response
    });
  });

  it('should create "failure" action', () => {
    const error = new HttpErrorResponse({});
    const action = HttpQueryActions.failure({ config, error });

    expect(action).toEqual({
      type: `${HttpQueryActions.QUERY_KEY} FAILURE`,
      config,
      error
    });
  });

  it('should create "clear" action', () => {
    const action = HttpQueryActions.clear({ config });

    expect(action).toEqual({
      type: `${HttpQueryActions.QUERY_KEY} CLEAR`,
      config,
    });
  });
});
