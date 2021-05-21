import { QueryResponse, QueryGroups, Queries, QueryData } from './http-query.model';
import { isQueryInProgress } from './http-query.utils';
import { HttpQueryState } from './store';

export const initialQuery: QueryResponse = {
  name: '',
  status: null,
  response: null,
  error: null,
  isDirty: false,
  isInProgress: false,
  isSuccess: false,
  isFailed: false,
  isFinished: false
};

export const addQueryToGroup = <T>(data: QueryData<T>): string[] => {
  const { state, config, groupName } = data;
  const { groups } = state;
  const { name } = config;
  const queryNames = groupName && groups[groupName]?.queryNames || [];

  return [
    ...queryNames,
    ...(!queryNames.includes(name) ? [name] : []),
  ];
};

export const addQueryToGroups = <T>(data: QueryData<T>): QueryGroups => {
  const { state, config, query } = data;
  const { groups: stateGroups } = state;
  const { groups } = config;
  const extendedGroups = { ...stateGroups };

  if (!groups) {
    return extendedGroups;
  }

  groups.map(groupName => {
    const queryNames = addQueryToGroup({ state, config, query, groupName });
    const isInProgress = isQueryInProgress([
      ...queryNames
        .filter(name => name !== query.name && state.queries[name])
        .map(name => state.queries[name]),
      query
    ]);

    extendedGroups[groupName] = { isInProgress, queryNames };
  });

  return extendedGroups;
};

export const addQuery = <T>(data: QueryData<T>): Queries => ({
  ...data.state.queries,
  [data.config.name]: data.query
});

export const parseQueryState = <T>(data: QueryData<T>): HttpQueryState => {
  const groups = addQueryToGroups(data);
  const queries = addQuery(data);

  return {
    ...data.state,
    queries,
    groups
  };
};
