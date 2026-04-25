import { httpClient } from '@/shared/api/http-client';
import type {
  GenderFilter,
  SortOrder,
  User,
  UserSortField,
  UsersListResponse,
} from '../model/types';

export interface FetchUsersParams {
  limit: number;
  skip: number;
  search?: string;
  sortBy?: UserSortField;
  order?: SortOrder;
  gender?: GenderFilter;
  signal?: AbortSignal;
}

const buildEndpoint = (params: FetchUsersParams): string => {
  const trimmedSearch = params.search?.trim();
  if (trimmedSearch) return '/users/search';
  if (params.gender && params.gender !== 'all') return '/users/filter';
  return '/users';
};

export const usersApi = {
  list: ({
    limit,
    skip,
    search,
    sortBy,
    order,
    gender,
    signal,
  }: FetchUsersParams): Promise<UsersListResponse> => {
    const trimmedSearch = search?.trim();
    const endpoint = buildEndpoint({ limit, skip, search, gender });

    const query: Record<string, string | number | undefined> = {
      limit,
      skip,
      sortBy,
      order,
    };

    if (trimmedSearch) {
      query.q = trimmedSearch;
    } else if (gender && gender !== 'all') {
      query.key = 'gender';
      query.value = gender;
    }

    return httpClient.get<UsersListResponse>(endpoint, { query, signal });
  },

  byId: (id: number, signal?: AbortSignal): Promise<User> =>
    httpClient.get<User>(`/users/${id}`, { signal }),
};
