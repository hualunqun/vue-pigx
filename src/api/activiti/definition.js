import request from '@/router/axios'

//查询列表
export function fetchList(query) {
  return request({
    url: '/api/act/definition/list',
    method: 'post',
    params: query
  })
}

//删除
export function delObj(ids) {
  return request({
    url: '/api/act/definition/remove?ids=' + ids,
    method: 'delete'
  })
}

//上传流程定义文件
export function uploadObj(data) {
  return request({
    url: '/api/act/definition/upload',
    method: 'post',
    data: data
  })
}

//挂起或激活
export function suspendOrActiveApply(data){
  return request({
    url: '/api/act/definition/suspendOrActiveApply',
    method: 'put',
    params: data
  })
}

//转模型
export function convert2Model(processDefinitionId){
  return request({
    url: '/api/act/definition/convert2Model?processDefinitionId=' + processDefinitionId,
    method: 'post',
  })
}