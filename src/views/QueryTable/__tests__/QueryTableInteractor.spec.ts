import { describe, it, expect, vi } from "vitest";
import { useQueryTableInteractor } from "../interactors/QueryTableInteractor";

global.fetch = vi.fn();

describe("QueryTableInteractor", () => {
  it("fetches table data successfully", async () => {
    const mockData = [{ id: "1", name: "Test" }];
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const { loading, tableData, fetchTableData } = useQueryTableInteractor();

    expect(loading.value).toBe(false);
    await fetchTableData();
    expect(tableData.value).toEqual(mockData);
  });

  it("handles fetch error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("API Error"));
    const consoleSpy = vi.spyOn(console, "error");

    const { fetchTableData } = useQueryTableInteractor();
    await fetchTableData();

    expect(consoleSpy).toHaveBeenCalled();
  });
});
