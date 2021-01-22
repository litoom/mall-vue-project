import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  });

  //响应拦截
  instance.interceptors.response.use(res => {
    console.log("拦截响应成功", res);
    return res.data;
  }, err => {
    console.log("拦截响应失败", err);
  })
  //请求拦截
  instance.interceptors.request.use(config => {
    //请求成功时
    console.log(config);
    return config;
  }, err => {
    //请求失败时
    console.log(err)
  })

  //发送真正的网络请求
  return instance(config);
}
