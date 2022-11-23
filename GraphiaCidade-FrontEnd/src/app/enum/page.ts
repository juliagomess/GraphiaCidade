export const PAGE_TYPE = {
  ADD: 1,
  EDIT: 2,
};

export const USER_PAGE_TYPE = {
  ADMIN: 'ROLE_ADMIN',
  APP: 'ROLE_APP_USER',
  WEB: 'ROLE_WEB_USER',
};

export const UserPageTypeMap = new Map([
  [USER_PAGE_TYPE.ADMIN, 'ADMIN'],
  [USER_PAGE_TYPE.APP, 'APP'],
  [USER_PAGE_TYPE.WEB, 'WEB'],
]);
