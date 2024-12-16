import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import QueryTableView from "../QueryTableView.vue";
import { ElMessage } from "element-plus";

vi.mock("element-plus", () => ({
  ElMessage: {
    error: vi.fn(),
  },
}));

describe("QueryTableView", () => {
  it("renders properly", () => {
    const wrapper = mount(QueryTableView);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".query-table").exists()).toBe(true);
  });

  it("handles pagination changes", async () => {
    const wrapper = mount(QueryTableView);
    const pagination = wrapper.findComponent({ name: "el-pagination" });
    await pagination.vm.$emit("size-change", 20);
    expect(wrapper.vm.pagination.pageSize).toBe(20);
  });

  it("handles search input", async () => {
    const wrapper = mount(QueryTableView);
    const input = wrapper.findComponent({ name: "el-input" });
    await input.setValue("test");
    expect(wrapper.vm.searchQuery).toBe("test");
  });

  it("handles menu selection", async () => {
    const wrapper = mount(QueryTableView);
    const menu = wrapper.findComponent({ name: "el-menu" });
    await menu.vm.$emit("select", "2");
    expect(wrapper.vm.activeMenuItem).toBe("2");
  });
});
