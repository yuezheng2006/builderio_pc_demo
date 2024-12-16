import type {
  NavigationIcon,
  MenuItem,
  FilterOption,
  TableColumn,
} from "../types";

export function useQueryTablePresenter() {
  const navigationIcons: NavigationIcon[] = [
    { icon: "Search", label: "Search" },
    { icon: "Bell", label: "Notifications" },
    { icon: "Setting", label: "Settings" },
    { icon: "Help", label: "Help" },
    { icon: "Message", label: "Messages" },
  ];

  const sidebarMenuItems: MenuItem[] = [
    { key: "1", icon: "Menu", label: "仪表盘" },
    { key: "2", icon: "DataLine", label: "数据可视化" },
    { key: "3", icon: "List", label: "列表页" },
    { key: "4", icon: "Document", label: "表单页" },
    { key: "5", icon: "InfoFilled", label: "详情页" },
    { key: "6", icon: "Check", label: "结果页" },
    { key: "7", icon: "Warning", label: "异常页" },
    { key: "8", icon: "User", label: "个人中心" },
  ];

  const filterOptions: FilterOption[] = [
    { value: "", label: "全部" },
    { value: "manual", label: "人工" },
    { value: "auto", label: "自动" },
  ];

  const tableColumns: TableColumn[] = [
    { prop: "id", label: "集合编号", width: "180" },
    { prop: "name", label: "集合名称", width: "180" },
    { prop: "type", label: "内容体裁" },
    { prop: "filter", label: "筛选方式" },
    { prop: "count", label: "内容量" },
    { prop: "date", label: "创建时间" },
    { prop: "status", label: "状态" },
  ];



  return {
    navigationIcons,
    sidebarMenuItems,
    filterOptions,
    tableColumns,

  };
}
