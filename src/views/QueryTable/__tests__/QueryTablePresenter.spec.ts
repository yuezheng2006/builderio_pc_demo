import { describe, it, expect } from "vitest";
import { useQueryTablePresenter } from "../presenters/QueryTablePresenter";

describe("QueryTablePresenter", () => {
  it("provides navigation icons", () => {
    const { navigationIcons } = useQueryTablePresenter();
    expect(navigationIcons).toHaveLength(5);
    expect(navigationIcons[0]).toHaveProperty("icon");
    expect(navigationIcons[0]).toHaveProperty("label");
  });

  it("provides sidebar menu items", () => {
    const { sidebarMenuItems } = useQueryTablePresenter();
    expect(sidebarMenuItems).toHaveLength(8);
    expect(sidebarMenuItems[0]).toHaveProperty("key");
    expect(sidebarMenuItems[0]).toHaveProperty("icon");
    expect(sidebarMenuItems[0]).toHaveProperty("label");
  });

  it("provides filter options", () => {
    const { filterOptions } = useQueryTablePresenter();
    expect(filterOptions).toHaveLength(3);
    expect(filterOptions[0]).toHaveProperty("value");
    expect(filterOptions[0]).toHaveProperty("label");
  });

  it("provides table columns", () => {
    const { tableColumns } = useQueryTablePresenter();
    expect(tableColumns).toHaveLength(7);
    expect(tableColumns[0]).toHaveProperty("prop");
    expect(tableColumns[0]).toHaveProperty("label");
  });
});
