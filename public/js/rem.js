function remSize() {
  // 获取设备的宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth > 750) { // 一般不会超过750
    deviceWidth = 750;
  }
  if (deviceWidth < 320) { // 不能太小
    deviceWidth = 320;
  }
  // 调整font-size
  // 此时750px -> 1rem = 100px, 375px -> 1rem  50px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
  // 设置body字体大小 
  // 375px -> 字体15px（浏览器默认为16px，问题不大）
  document.querySelector('body').style.fontSize = 0.3 + 'rem';
}
// 调用函数
remSize();
// 当窗口发生变化时, 也调用函数
window.onresize = function() {
  remSize();
}