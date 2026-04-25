import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { usersApi, type FetchUsersParams } from './users.api';

export type UsersListKey = Omit<FetchUsersParams, 'signal'>;

export const usersQueryKeys = {
  all: ['users'] as const,
  list: (params: UsersListKey) => [...usersQueryKeys.all, 'list', params] as const,
  detail: (id: number) => [...usersQueryKeys.all, 'detail', id] as const,
};

export const usersListQuery = (params: UsersListKey) =>
  queryOptions({
    queryKey: usersQueryKeys.list(params),
    queryFn: ({ signal }) => usersApi.list({ ...params, signal }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

export const userDetailQuery = (id: number) =>
  queryOptions({
    queryKey: usersQueryKeys.detail(id),
    queryFn: ({ signal }) => usersApi.byId(id, signal),
    staleTime: 60_000,
  });
