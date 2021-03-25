export function merge<T>(...args: T[][]): T[] {
  let arr: T[] = [];
  args.forEach((item: T[]) => {
    arr = arr.concat(item);
  });
  return arr;
}
