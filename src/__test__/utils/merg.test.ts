import { merge } from "../../utils/merge";

describe("merge function tests", () => {
  it("should merge arrays of arrays ", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const arr3 = [7, 8, 9];

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = merge(arr1, arr2, arr3);
    expect(result).toEqual(array);
  });

  it("should return empty array", () => {
    const arr1 = [];
    const arr2 = [];
    const result = merge(arr1, arr2);
    expect(result).toEqual([]);
  });

  it("should also return empty array", () => {
    const arr1 = [];
    const result = merge(arr1);
    expect(result).toEqual([]);
  });

  it("should also [1]", () => {
    const arr1 = [];
    const arr2 = [1];
    const result = merge(arr1, arr2);
    expect(result).toEqual(arr2);
  });
});
