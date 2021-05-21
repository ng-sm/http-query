import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { QueryConfig } from '../http-query.model';

export const QUERY_KEY = '[HTTP Query]';

export const init = createAction(
  `${QUERY_KEY} INIT`,
  props<{ config: QueryConfig }>(),
);

export const inProgress = createAction(
  `${QUERY_KEY} IN_PROGRESS`,
  props<{ config: QueryConfig }>(),
);

export const success = createAction(
  `${QUERY_KEY} SUCCESS`,
  props<{ config: QueryConfig, response: HttpResponse<unknown> }>(),
);

export const failure = createAction(
  `${QUERY_KEY} FAILURE`,
  props<{ config: QueryConfig, error: HttpErrorResponse }>(),
);

export const clear = createAction(
  `${QUERY_KEY} CLEAR`,
  props<{ config: QueryConfig }>(),
);
