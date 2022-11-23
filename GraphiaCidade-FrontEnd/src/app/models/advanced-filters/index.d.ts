export as namespace advancedFilterModels;

export interface BaseFilter {
  pageSize: number = 10;
  page: number = 1;
  orderBy: string = 'createdAt';
  sort: 'asc' | 'desc' = 'desc';
  offset?: number | null;
  limit?: number | null;
  isDESC?: string | null;
  isPaginated?: boolean;
}

export interface UserAdvancedFilter extends BaseFilter {
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  roles?: string | string[];
  password?: string | null,
  confirmPassword?: string | null,
}

export interface CategoryAdvancedFilter extends BaseFilter {
  categoryName?: string | null;
}

export interface OccurrenceAdvancedFilter extends BaseFilter {
  category?: string | null;
  problemType?: string | null;
  profileType?: string | null;
  from?: Date | string | null;
  to?: Date | string | null;
}

export interface MapAdvancedFilter {
  latitude: number;
  longitude: number;
  range: number;
}

export interface ProfileAdvancedFilter extends BaseFilter {
  profileName?: string | null;
}

export interface KpiAdvancedFilter extends BaseFilter {
  //
}