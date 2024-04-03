import request from '@/utils/request'

export const createLoan = (data) => {
  return request({
    url: '/loan/create',
    method: 'post',
    data: data,
  })
}
export const getLoanList = (params) => {
  return request({
    url: '/loan/list',
    method: 'get',
    params,
  })
}
// 编辑提交接口
export const udpatedLoan = (data) => {
  return request({
    url: '/loan/update/',
    method: 'put',
    data,
  })
}
// 删除申请接口
export const deleteLoan = (id) => {
  return request({
    url: '/loan/delete/' + id,
    method: 'delete',
  })
}
// 提交审核接口
export const submitApprove = (id) => {
  return request({
    url: '/loan/submitToApprove',
    method: 'post',
    data: {
      id,
    },
  })
}
// 审批-初审-查询接口
export const queryList = (params) => {
  return request({
    url: '/approve/first/list',
    method: 'get',
    params,
  })
}
// 初审通过/拒绝接口
export const approveFirst = (id, flag) => {
  //调用时传入flag，改变调用的是通过或者是失败的接口
  return request({
    url: '/approve/first/' + flag,
    method: 'post',
    data: {
      loanId: id,
      appId: id,
    },
  })
}
// 审批-终审-查询接口
export const queryEndList = (params) => {
  return request({
    url: '/approve/end/list',
    method: 'get',
    params,
  })
}

// 审批 - 终审-通过/拒绝接口
export const approveEnd = (id, flag) => {
  return request({
    url: '/approve/end/' + flag,
    method: 'POST',
    data: {
      appId: id,
      loanId: id,
    },
  })
}
// 合同管理-合同列表接口
export const contractList = (params) => {
  return request({
    url: '/contract/list',
    method: 'get',
    params,
  })
}

// 合同管理- 生成合同接口
export const generateContract = (id) => {
  return request({
    url: '/contract/createFile',
    method: 'post',
    data: {
      id,
    },
  })
}

// 合同管理- 下载合同接口
export const downloadContract = (id) => {
  return request({
    url: '/contract/download',
    method: 'get',
    params: {
      id,
    },
  })
}
