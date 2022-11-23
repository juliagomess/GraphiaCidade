export const REACT_APP_APPLICATION_NAME: string = process.env.REACT_APP_APPLICATION_NAME as string;

export const API_URL: string = process.env.REACT_APP_API_BASE_URL as string;

export const REPORT_PAGE_SIZE: number = parseInt(process.env.REACT_APP_REPORT_PAGE_SIZE || '10', 10) as number;

export const GA_TOKEN: string = process.env.REACT_APP_GA_TOKEN as string;

export const LANGUAGE: string = (process.env.REACT_APP_LANGUAGE as string) || 'pt-BR';

// Whitelabel stuff
export const WL_COMPANY_LOGIN_LOGO: string = process.env.REACT_APP_WL_COMPANY_LOGIN_LOGO as string;
export const WL_COMPANY_PANEL_LOGO: string = process.env.REACT_APP_WL_COMPANY_PANEL_LOGO as string;
export const WL_COMPANY_LOADING_LOGO: string = process.env.REACT_APP_WL_COMPANY_LOADING_LOGO as string;

export const WL_COMPANY_PRIMARY_COLOR: string = process.env.REACT_APP_WL_COMPANY_PRIMARY_COLOR as string;

export const AUTH_API_KEY: string = process.env.REACT_APP_AUTH_API_KEY as string;

export const MAPBOX_API_KEY: string = process.env.REACT_APP_MAPBOX_API_KEY as string;
export const DEFAULT_LATITUDE: number = Number(process.env.REACT_APP_DEFAULT_LATITUDE as string);
export const DEFAULT_LONGITUDE: number = Number(process.env.REACT_APP_DEFAULT_LONGITUDE as string);
