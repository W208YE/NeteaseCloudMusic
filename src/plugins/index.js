/* 对插件集中管理 */
import { Button, Swipe, SwipeItem, Popup } from "vant";
// 将用到的插件放入数组中
let plugins = [Button, Swipe, SwipeItem, Popup];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  })
}