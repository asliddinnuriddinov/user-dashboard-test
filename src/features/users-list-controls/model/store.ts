import { create } from 'zustand';
import { DEFAULT_PAGE_SIZE } from '@/shared/config/env';
import type { GenderFilter, SortOrder, UserSortField } from '@/entities/user';

export type ViewMode = 'grid' | 'list';

interface UsersListControlsState {
  search: string;
  gender: GenderFilter;
  sortBy: UserSortField;
  order: SortOrder;
  page: number;
  pageSize: number;
  view: ViewMode;
  setSearch: (value: string) => void;
  setGender: (value: GenderFilter) => void;
  setSort: (sortBy: UserSortField, order: SortOrder) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setView: (view: ViewMode) => void;
  reset: () => void;
}

const initialState = {
  search: '',
  gender: 'all' as GenderFilter,
  sortBy: 'firstName' as UserSortField,
  order: 'asc' as SortOrder,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  view: 'grid' as ViewMode,
};

export const useUsersListControls = create<UsersListControlsState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search, page: 1 }),
  setGender: (gender) => set({ gender, page: 1 }),
  setSort: (sortBy, order) => set({ sortBy, order, page: 1 }),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  setView: (view) => set({ view }),
  reset: () => set(initialState),
}));
