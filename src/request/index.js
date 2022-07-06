import axios from 'axios';
// 创建 axios 实例 service
let service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // 返回数据允许最大时间(10s)
});
export default service;