export enum AppRoutes {
  LIST = '/list',
  ADD = '/add'
}

export const CATALOG_HEAD_ROUTE = '/catalog';

export const BackendCatalogRoutes = {
  LIST: `${CATALOG_HEAD_ROUTE}/list`,
  TEAMS: `${CATALOG_HEAD_ROUTE}/teams`,
  COUNTRIES: `${CATALOG_HEAD_ROUTE}/countries`
} as const;
