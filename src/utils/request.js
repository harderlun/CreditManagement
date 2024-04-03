import axios from 'axios'
import router from '@/router'

//Notification是一种错误提醒
import { Message, Notification } from 'element-ui'

const request = axios.create({
  //设置/api前缀
  baseURL: '/api',
})
//请求拦截器
request.interceptors.request.use((config) => {
  //下面是加的内容
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }

  return config
})
//响应拦截器
request.interceptors.response.use((response) => {
  //20000代表成功
  if (response.data.code === 20000) {
    // 由于历史遗留问题, 后端响应的结构不能一次性做到统一,兼容处理一下
    if (typeof response.data.data === 'string')
      Message.success(response.data.data)
    if (typeof response.data.data.info === 'string')
      Message.success(response.data.data.info)
    return response

    // 603 代表token失效, 处理跳转到登录
  } else if (response.data.code === 603) {
    Notification.error({
      title: '错误',
      message: 'token失效,请重新登录',
    })
    // 替换到登录页面，但是如果是login页面那就不重复跳转
    let url = window.location.href.split('/')
    if (url[url.length - 1] !== 'login') {
      router.replace('/login')
    }
  } else {
    //如果原始的请求状态不等于200表示响应错误
    if (response.status !== 200) {
      Notification.error({
        title: '错误',
        message: '响应错误',
      })
    }
  }
  return response
})

export default request
