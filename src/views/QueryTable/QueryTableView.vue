<template>
  <div class="query-table">
    <nav class="navigation-bar">
      <div class="logo-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c3f12d55dfe8411e8f06a4c982cd5303/298dacfa747d47693c30d7e133dd677a6151c11b4b3c9310dd11c8363d0a8d7c?apiKey=c3f12d55dfe8411e8f06a4c982cd5303&"
          class="logo-image"
          alt="Arco Pro Logo"
        />
        <div class="brand-name">Arco Pro</div>
      </div>
      <div class="nav-actions">
        <el-input
          v-model="searchQuery"
          placeholder="输入内容查询"
          class="search-input"
          prefix-icon="el-icon-search"
        />
        <el-button-group class="action-buttons">
          <el-button
            v-for="(icon, index) in navigationIcons"
            :key="index"
            circle
            :icon="icon.icon"
            :aria-label="icon.label"
          />
        </el-button-group>
        <el-avatar
          :size="32"
          src="https://cdn.builder.io/api/v1/image/assets/c3f12d55dfe8411e8f06a4c982cd5303/60733d6072844efc552715b66a640f5a7245e88766b6dd27a0643158c9c4d3fc?apiKey=c3f12d55dfe8411e8f06a4c982cd5303&"
          alt="User avatar"
        />
      </div>
    </nav>

    <div class="main-content">
      <aside class="sidebar">
        <el-menu
          :default-active="activeMenuItem"
          class="menu-container"
          @select="handleMenuSelect"
        >
          <template v-for="item in sidebarMenuItems" :key="item.key">
            <el-menu-item :index="item.key">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.label }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <main class="content-area">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item>列表页</el-breadcrumb-item>
          <el-breadcrumb-item>查询表格</el-breadcrumb-item>
        </el-breadcrumb>

        <section class="query-section">
          <h1 class="section-title">查询表格</h1>

          <el-form
            ref="queryFormRef"
            :model="queryParams"
            label-width="100px"
            class="query-form"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="集合编号">
                  <el-input
                    v-model="queryParams.id"
                    placeholder="请输入集合编号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="筛选方式">
                  <el-select
                    v-model="queryParams.filterType"
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in filterOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div class="table-actions">
            <el-button-group>
              <el-button type="primary" :icon="Plus" @click="handleCreate">
                新建
              </el-button>
              <el-button @click="handleBatchImport">批量导入</el-button>
            </el-button-group>
            <el-button :icon="Download" @click="handleDownload">
              下载
            </el-button>
          </div>

          <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              v-for="column in tableColumns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
            />
          </el-table>

          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Download } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { useQueryTableInteractor } from "./interactors/QueryTableInteractor";
import { useQueryTablePresenter } from "./presenters/QueryTablePresenter";
import type { QueryParams } from "./types";

const {
  loading,
  tableData,
  fetchTableData,
  handleCreate,
  handleBatchImport,
  handleDownload,
} = useQueryTableInteractor();

const { navigationIcons, sidebarMenuItems, filterOptions, tableColumns } =
  useQueryTablePresenter();

const queryFormRef = ref<FormInstance>();
const searchQuery = ref("");
const activeMenuItem = ref("1");
const queryParams = ref<QueryParams>({
  id: "",
  filterType: "",
});

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  fetchTableData();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  fetchTableData();
};

const handleMenuSelect = (key: string) => {
  activeMenuItem.value = key;
};

onMounted(() => {
  fetchTableData();
});
</script>

<style scoped>
.query-table {
  background: var(---Fill-2, #f7f8fa);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e6eb;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-image {
  width: 32px;
  height: 32px;
}

.brand-name {
  font-size: 20px;
  font-weight: 500;
  color: #1d2129;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  width: 240px;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #e5e6eb;
}

.content-area {
  flex: 1;
  padding: 20px;
}

.query-section {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}

.query-form {
  margin-bottom: 20px;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

@media (max-width: 991px) {
  .sidebar {
    width: 200px;
  }

  .content-area {
    padding: 10px;
  }
}
</style>
