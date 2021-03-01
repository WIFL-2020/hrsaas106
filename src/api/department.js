import request from '@/utils/request'
// 查询企业的部门列表
// 封装方法
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

// 删除事件
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增部门接口
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
