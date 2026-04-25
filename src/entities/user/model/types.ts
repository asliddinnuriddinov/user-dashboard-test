export type Gender = 'male' | 'female';

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface UserCompany {
  name: string;
  title: string;
  department: string;
  address: UserAddress;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  image: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  university: string;
  address: UserAddress;
  company: UserCompany;
  role?: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export type UserSortField = 'firstName' | 'lastName' | 'age' | 'email';

export type SortOrder = 'asc' | 'desc';

export type GenderFilter = 'all' | Gender;
