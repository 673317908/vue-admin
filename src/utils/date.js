export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() + 1 < 10
    ? "0" + (date.getDate() + 1)
    : date.getDate() + 1) + "   ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = (date.getSeconds() + 1 < 10 ? "0" + (date.getSeconds() + 1) : date.getSeconds() + 1);
  return Y + M + D + h + m + s;
}
