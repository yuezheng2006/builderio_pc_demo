export interface QueryParams {
  id: string;
  filterType: string;
}

export interface TableColumn {
  prop: string;
  label: string;
  width?: string;
}

export interface NavigationIcon {
  icon: string;
  label: string;
}

export interface MenuItem {
  key: string;
  icon: string;
  label: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface TableItem {
  id: string;
  name: string;
  type: string;
  filter: string;
  count: number;
  date: string;
  status: string;
}
