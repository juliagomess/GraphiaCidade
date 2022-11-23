export as namespace models;

import('./reducers');
import('./advanced-filters');

export type AuthResponse = {
  jwtToken: string,
  refreshToken: string,
  type: string,
  id: string,
  username: string,
  email: string,
  roles: string[];
};

export type AuthRequest = {
  username: string;
  password: string;
};

export type UserPasswordRecovery = {
  email: string;
  password: string;
};

export type PanelSidebar = {
  link?: string;
  name?: string;
  icon?: any;
  isBottom?: boolean;
};

export type routeInner = {
  route: string;
  id: string;
  name: string;
  sidebarHidden?: boolean;
  accessType?: string;
  accessGranted?: string[];
};

export type route = {
  route: string;
  icon: string;
  iconAlt: string;
  name: string;
  id: string;
  items: routeInner[];
  accessType?: string;
  accessGranted?: string[];
};

export type PaginationResponse<T> = {
  rows: T[];
  count: number;
};

export type Count = {
  count: number;
};

export type Range = {
  min: number;
  max: number;
};

export type PageType = {
  ADD: number;
  EDIT: number;
};

export type DaysOfWeek = {
  ONE: number;
  TWO: number;
  THREE: number;
  FOUR: number;
  FIVE: number;
  SIX: number;
  SEVEN: number;
};

export type UserPageType = {
  ADMIN: number;
};

export type ResetPassword = {
  email: string;
  recoveryToken: string;
  password: string;
};

export type Currency = {
  min: number;
  step?: number;
  max?: number;
};

export type File = {
  name: string | null;
  base64: string | null;
  extension: string | null;
};

export type User = {
  id?: string;
  username: string;
  email: string;
  password?: string;
  roles: string[];
  confirmPassword?: string;
  changePassword?: boolean;
};

export type Category = {
  id?: string;
  categoryName: string;
  subCategories: string[];
};

export type Occurrence = {
  id: string,
  category: string,
  problemType: string,
  profileType: string,
  description: string,
  photo: string | null,
  audio: string | null,
  longitude: string | null,
  latitude: string | null
};

export type Profile = {
  id?: string;
  profileName: string;
};

export type ChangePassword = {
  oldPassword: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
};

export type KPI = {
  value: number;
  name: string;
};

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Export = {
  start: string,
  end: string,
  period: any[],
};