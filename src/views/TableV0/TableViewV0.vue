<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <el-container class="app-wrapper">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar-container">
      <div class="logo-container">
        <img src="" alt="Arco Pro" class="logo">
        <span class="title">Arco Pro</span>
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <el-icon><Odometer /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><DataLine /></el-icon>
          <span>数据可视化</span>
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><List /></el-icon>
            <span>列表页</span>
          </template>
          <el-menu-item index="3-1">查询表格</el-menu-item>
          <el-menu-item index="3-2">卡片列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon><Document /></el-icon>
          <span>表单页</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><User /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <el-header class="navbar">
        <div class="left-menu">
          <el-icon class="hamburger" @click="toggleSidebar"><Fold /></el-icon>
        </div>
        <div class="right-menu">
          <el-input
            v-model="searchQuery"
            placeholder="输入内容查询"
            class="header-search"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Search /></el-icon>
            </template>
          </el-input>
          <el-tooltip content="使用文档" placement="bottom">
            <el-icon class="right-menu-item"><QuestionFilled /></el-icon>
          </el-tooltip>
          <el-tooltip content="全屏" placement="bottom">
            <el-icon class="right-menu-item"><FullScreen /></el-icon>
          </el-tooltip>
          <el-tooltip content="消息通知" placement="bottom">
            <el-badge :value="3" class="right-menu-item">
              <el-icon><Bell /></el-icon>
            </el-badge>
          </el-tooltip>
          <el-dropdown trigger="click">
            <div class="avatar-wrapper">
              <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <i class="el-icon-caret-bottom" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容区域 -->
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>列表页</el-breadcrumb-item>
          <el-breadcrumb-item>查询表格</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main-content">
          <!-- 搜索表单 -->
          <el-form :inline="true" :model="searchForm" class="demo-form-inline mb-4">
            <el-form-item label="集合编号">
              <el-input v-model="searchForm.id" placeholder="请输入集合编号" />
            </el-form-item>
            <el-form-item label="集合名称">
              <el-input v-model="searchForm.name" placeholder="请输入集合名称" />
            </el-form-item>
            <el-form-item label="内容载体">
              <el-select v-model="searchForm.contentType" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="横版短视频" value="horizontal" />
                <el-option label="竖版短视频" value="vertical" />
              </el-select>
            </el-form-item>
            <el-form-item label="筛选方式">
              <el-select v-model="searchForm.filterType" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="规则筛选" value="rule" />
                <el-option label="人工" value="manual" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="searchForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="已上线" value="online" />
                <el-option label="未上线" value="offline" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>

          <!-- 操作按钮 -->
          <div class="operation-buttons mb-4">
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>新建
            </el-button>
            <el-button @click="handleBatchImport">批量导入</el-button>
            <el-button @click="handleDownload">
              <el-icon><Download /></el-icon>下载
            </el-button>
          </div>

          <!-- 数据表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="集合编号" width="180">
              <template #default="{ row }">
                <span>{{ row.id }}</span>
                <el-icon class="ml-2 cursor-pointer"><CopyDocument /></el-icon>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="集合名称" width="180" />
            <el-table-column prop="contentType" label="内容载体" width="120">
              <template #default="{ row }">
                <el-tag :type="row.contentType === 'horizontal' ? '' : 'warning'">
                  {{ row.contentType === 'horizontal' ? '横版短视频' : '竖版短视频' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="filterType" label="筛选方式" width="120" />
            <el-table-column prop="count" label="内容量" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === 'online' ? 'success' : 'danger'">
                  {{ row.status === 'online' ? '已上线' : '未上线' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
              <template #default="{ row }">
                <el-button link type="primary" @click="handleView(row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 30, 40]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ref, reactive } from 'vue'
import {
  Odometer,
  DataLine,
  List,
  Document,
  User,
  Fold,
  Search,
  QuestionFilled,
  FullScreen,
  Bell,
  Plus,
  Download,
  CopyDocument
} from '@element-plus/icons-vue'

// 搜索表单数据
const searchForm = reactive({
  id: '',
  name: '',
  contentType: '',
  filterType: '',
  dateRange: [],
  status: ''
})

// 表格数据
const tableData = ref([
  {
    id: '50225024-7129',
    name: '每日推荐视频集',
    contentType: 'horizontal',
    filterType: '规则筛选',
    count: 543,
    createTime: '2022-02-20 13:50:15',
    status: 'online'
  },
  {
    id: '51525367-5027',
    name: '国际新闻集合',
    contentType: 'horizontal',
    filterType: '规则筛选',
    count: 1743,
    createTime: '2022-01-29 13:20:10',
    status: 'offline'
  },
  // ... 更多数据
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 搜索查询
const searchQuery = ref('')

// 处理侧边栏折叠
const toggleSidebar = () => {
  // 实现侧边栏折叠逻辑
}

// 处理搜索
const handleSearch = () => {
  console.log('搜索条件：', searchForm)
}

// 处理重置
const handleReset = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = ''
  })
  searchForm.dateRange = []
}

// 处理新建
const handleAdd = () => {
  console.log('点击新建')
}

// 处理批量导入
const handleBatchImport = () => {
  console.log('点击批量导入')
}

// 处理下载
const handleDownload = () => {
  console.log('点击下载')
}

// 处理查看
const handleView = (row) => {
  console.log('查看行：', row)
}

// 处理分页大小变化
const handleSizeChange = (val) => {
  console.log('每页显示数量变化：', val)
}

// 处理页码变化
const handleCurrentChange = (val) => {
  console.log('当前页码变化：', val)
}
</script>

<style scoped>
.app-wrapper {
  height: 100vh;
}

.sidebar-container {
  background-color: #001529;
  color: white;
}

.logo-container {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  background-color: #002140;
}

.logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  vertical-align: middle;
}

.navbar {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-menu {
  display: flex;
  align-items: center;
}

.hamburger {
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
}

.right-menu {
  display: flex;
  align-items: center;
}

.header-search {
  width: 200px;
  margin-right: 15px;
}

.right-menu-item {
  font-size: 18px;
  color: #5a5e66;
  margin: 0 8px;
  cursor: pointer;
}

.avatar-wrapper {
  cursor: pointer;
  margin-left: 15px;
}

.main-content {
  padding: 20px;
  background-color: #f0f2f5;
}

.operation-buttons {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
