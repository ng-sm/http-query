import { Queries, QueryGroups } from '../http-query.model';

export const HTTP_QUERY_KEY = 'http-query';

export interface HttpQueryState {
  queries: Queries;
  groups: QueryGroups;
}

export const initialState: HttpQueryState = {
  queries: {},
  groups: {},
};
