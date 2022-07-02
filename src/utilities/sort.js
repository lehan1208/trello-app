export const mapOrder = (array, order, key) => {
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return array;
};
// order là mảng lưu trữ các phẩn từ
// key là id
