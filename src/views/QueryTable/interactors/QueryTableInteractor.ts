import { ref } from "vue";
import type { TableItem } from "../types";

// mock 10 条数据
const mockData: TableItem[] = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    name: `Item ${index + 1}`,
    status: "active",
    date: "2024-03-18",
    // 随机选择一个类型
    type: ["user", "article", "video", "image"][Math.floor(Math.random() * 4)],
    filter: "all",
    count: 0,
  })),
];

export function useQueryTableInteractor() {
  const loading = ref(false);
  const tableData = ref<TableItem[]>([]);

  const fetchTableData = async () => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      tableData.value = mockData;
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    } finally {
      loading.value = false;
    }
  };

  const handleCreate = () => {
    // Implementation for creating new item
  };

  const handleBatchImport = () => {
    // Implementation for batch import
  };

  const handleDownload = () => {
    // Implementation for download
  };

  return {
    loading,
    tableData,
    fetchTableData,
    handleCreate,
    handleBatchImport,
    handleDownload,
  };
}
