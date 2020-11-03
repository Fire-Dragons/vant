/**
 * 生成页面
 * @module page.js
 */
import request from '../js/request'

export function object_list(proj_code, text, page_index, page_size, page) {
  /**
   * @method page_list
   */
  return request({
    url: '/rpcgateway/LegoObjectService/list_object',
    method: 'get',
    params: {
      proj_code: proj_code,
      text: text,
      page_index: page_index,
      page_size: page_size,
      page: page
    }
  })
}

export function object_create(
  proj_code,
  biz_code,
  biz_proj_code,
  object_code,
  object_name,
  fields,
  ext_fields,
  props,
  can_create,
  can_update,
  can_delete,
  can_view,
  can_export,
  design_form,
  orderby,
  description,
  authopenrole,
  auth_developers,
  pyafternew,
  pyafternew2,
  pybefore,
  pyafteredit,
  pyafteredit2,
  pybeforedel,
  pyafterdel,
  pybeforelist,
  pyafterlist,
  save_noscript,
  delete_applycondition,
  queryparam,
  enabledataauth,
  authcols,
  authlevel,
  enable_record,
  history_fields
) {
  /**
   * @method page_create
   * @param biz_id 项目业务类的ID
   * @param page_code 页面代码
   * @param page_name 页面显示名称
   * @param props 页面属性
   * @param fields [] 页面显示的字段
   * @param design_form 自定义表单
   * @param orderby 排序字段
   * @param description 对象用途描述
   * @param authopenrole 数据访问开放角色
   * @param enable_record 是否启用对象变动记录
   * @param auth_developers 有权修改对象定义的开发人员
   */
  return request({
    url: '/rpcgateway/LegoObjectService/create_object',
    method: 'post',
    data: {
      proj_code: proj_code,
      biz_code: biz_code,
      biz_proj_code: biz_proj_code,
      object_code: object_code,
      object_name: object_name,
      props: props,
      fields: fields,
      ext_fields: ext_fields,
      can_create: can_create,
      can_update: can_update,
      can_delete: can_delete,
      design_form: design_form,
      can_view: can_view,
      can_export: can_export,
      orderby: orderby,
      description: description,
      authopenrole: authopenrole,
      auth_developers: auth_developers,
      pyafternew: pyafternew,
      pyafternew2: pyafternew2,
      pybefore: pybefore,
      pyafteredit: pyafteredit,
      pyafteredit2: pyafteredit2,
      pybeforedel: pybeforedel,
      pyafterdel: pyafterdel,
      pybeforelist: pybeforelist,
      pyafterlist: pyafterlist,
      save_noscript: save_noscript,
      delete_applycondition: delete_applycondition,
      queryparam: queryparam,
      enabledataauth: enabledataauth,
      authcols: authcols,
      authlevel: authlevel,
      enable_record: enable_record,
      history_fields: history_fields
    },
    headers: { signature: true }
  })
}

export function object_edit(
  proj_code,
  old_object_code,
  biz_code,
  biz_proj_code,
  object_code,
  object_name,
  fields,
  ext_fields,
  props,
  can_create,
  can_update,
  can_delete,
  can_view,
  can_export,
  design_form,
  orderby,
  description,
  authopenrole,
  auth_developers,
  pyafternew,
  pyafternew2,
  pybefore,
  pyafteredit,
  pyafteredit2,
  pybeforedel,
  pyafterdel,
  pybeforelist,
  pyafterlist,
  save_noscript,
  delete_applycondition,
  queryparam,
  single_methods,
  other_methods,
  enabledataauth,
  authcols,
  authlevel,
  enable_record,
  history_fields
) {
  /**
   * @method page_edit
   * @param biz_id 项目业务类的ID
   * @param page_code 页面代码
   * @param page_name 页面显示名称
   * @param props 页面属性
   * @param fields [] 页面显示的字段
   * @param design_form 自定义表单
   * @param orderby 排序字段
   * @param description 对象用途描述
   * @param authopenrole 数据访问开放角色
   * @param enable_record 是否启用对象变动记录
   * @param auth_developers 有权修改对象定义的开发人员
   * @param single_methods 单条操作
   * @param other_methods 其他操作
   */
  return request({
    url: '/rpcgateway/LegoObjectService/edit_object_by_code',
    method: 'post',
    data: {
      proj_code: proj_code,
      old_object_code: old_object_code,
      biz_code: biz_code,
      biz_proj_code: biz_proj_code,
      object_code: object_code,
      object_name: object_name,
      props: props,
      fields: fields,
      ext_fields: ext_fields,
      can_create: can_create,
      can_update: can_update,
      can_delete: can_delete,
      design_form: design_form,
      can_view: can_view,
      can_export: can_export,
      orderby: orderby,
      description: description,
      authopenrole: authopenrole,
      auth_developers: auth_developers,
      pyafternew: pyafternew,
      pyafternew2: pyafternew2,
      pybefore: pybefore,
      pyafteredit: pyafteredit,
      pyafteredit2: pyafteredit2,
      pybeforedel: pybeforedel,
      pyafterdel: pyafterdel,
      pybeforelist: pybeforelist,
      pyafterlist: pyafterlist,
      save_noscript: save_noscript,
      delete_applycondition: delete_applycondition,
      queryparam: queryparam,
      single_methods: single_methods,
      other_methods: other_methods,
      enabledataauth: enabledataauth,
      authcols: authcols,
      authlevel: authlevel,
      enable_record: enable_record,
      history_fields: history_fields
    },
    headers: { signature: true }
  })
}

export function object_delete(proj_code, object_codes) {
  /**
   * @method page_delete
   * @param page_id: 项目ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/delete_object_by_code',
    method: 'post',
    data: {
      proj_code: proj_code,
      object_codes: object_codes
    },
    headers: { signature: true }
  })
}

export function object_info(proj_code, object_code) {
  /**
   * @method page_info
   * @param page_id: 项目ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/info_object_by_code',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code
    }
  })
}

export function object_info_by_id(object_id) {
  /**
   * @method page_info
   * @param page_id: 项目ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/info_object_by_id',
    method: 'get',
    params: {
      object_id: object_id
    }
  })
}

export function object_copy(proj_code, object_code, new_object_name, new_object_code) {
  return request({
    url: '/rpcgateway/LegoObjectService/copy_object',
    method: 'post',
    data: {
      proj_code: proj_code,
      object_code: object_code,
      new_object_name: new_object_name,
      new_object_code: new_object_code
    }
  })
}

export function object_download(proj_code, object_codes) {
  /**
   * @method project_info
   * @param project_id: 项目ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/downloads',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_codes: object_codes
    }
  })
}

export function object_upload(proj_code, datas) {
  return request({
    url: '/rpcgateway/LegoObjectService/uploads',
    method: 'post',
    data: {
      proj_code: proj_code,
      datas: datas
    }
  })
}

export function get_headers(object_id, all_fields, page_id) {
  /**
   * @method pagedata_get_headers
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/get_headers',
    method: 'get',
    params: {
      object_id: object_id,
      all_fields: all_fields,
      page_id: page_id
    }
  })
}

export function get_headers_by_code(proj_code, object_code, page_code, all_fields) {
  /**
   * @method get_headers_by_code
   */
  return request({
    url: '/rpcgateway/LegoObjectService/get_headers_by_code',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code,
      page_code: page_code,
      all_fields: all_fields
    }
  })
}

export function get_design_by_code(proj_code, object_code) {
  /**
   * @method pagedata_get_headers
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/get_design_by_code',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code
    }
  })
}

export function get_object_design_by_id(object_id) {
  /**
   * @method pagedata_get_headers
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/get_object_design_by_id',
    method: 'get',
    params: {
      object_id: object_id
    }
  })
}

export function method_create(object_id, operate_name, operate_type, edit_prop, view_prop, editval, apply_condition, confirm_msg, uri, uriopentype, summary,
  start_rows_input, cols_name_input, import_py, append_script, pyafternew, pyafternew2,
  pyafteredit, pyafteredit2, design_form, icon) {
  /**
   * @method method_create
   * @param page_id // 当前界面id
   * @param operate_name // 操作名称
   * @param operate_type // 类型
   * @param edit_prop // 修改属性 array
   * @param view_prop // 查看属性 array
   * @param editval // 设置值
   * @param apply_condition // 本操作适用条件
   * @param confirm_msg // 确认执行操作的提示信息
   * @param uri // URI or URL地址
   * @param uriopentype // 页面打开方式
   * @param summary // 描述
   * @param start_rows_input // 文件导入起始行
   * @param cols_name_input // 文件导入列名
   * @param import_py // 文件导入脚本操作
   * @param append_script // 注入JavaScript代码
   * @param pybeforenew
   * @param pyafternew
   * @param pyafternew2
   * @param pyafteredit
   * @param pyafteredit2
   */
  return request({
    url: '/rpcgateway/LegoObjectService/create_method',
    method: 'post',
    data: {
      object_id: object_id,
      operate_name: operate_name,
      operate_type: operate_type,
      edit_prop: edit_prop,
      view_prop: view_prop,
      editval: editval,
      apply_condition: apply_condition,
      confirm_msg: confirm_msg,
      uri: uri,
      uriopentype: uriopentype,
      summary: summary,
      start_rows_input: start_rows_input,
      cols_name_input: cols_name_input,
      import_py: import_py,
      append_script: append_script,
      pyafternew: pyafternew,
      pyafternew2: pyafternew2,
      pyafteredit: pyafteredit,
      pyafteredit2: pyafteredit2,
      design_form: design_form,
      icon: icon
    },
    headers: { signature: true }
  })
}

export function method_edit(mtd_id, operate_name, operate_type, edit_prop, view_prop, editval, apply_condition, confirm_msg, uri, uriopentype, summary,
  start_rows_input, cols_name_input, import_py, append_script, pyafternew, pyafternew2, pyafteredit, pyafteredit2, design_form, icon) {
  /**
   * @method method_edit
   * @param mtd_id // 当前操作id
   * @param operate_name // 操作名称
   * @param operate_type // 类型
   * @param edit_prop // 修改属性 array
   * @param view_prop // 查看属性 array
   * @param editval // 设置值
   * @param apply_condition // 本操作适用条件
   * @param confirm_msg // 确认执行操作的提示信息
   * @param uri // URI or URL地址
   * @param uriopentype // 页面打开方式
   * @param summary // 描述
   * @param start_rows_input // 文件导入起始行
   * @param cols_name_input // 文件导入列名
   * @param import_py // 文件导入脚本操作
   * @param append_script // 注入JavaScript代码
   * @param pybeforenew
   * @param pyafternew
   * @param pyafternew2
   * @param pyafteredit
   * @param pyafteredit2
   */
  return request({
    url: '/rpcgateway/LegoObjectService/edit_method',
    method: 'post',
    data: {
      mtd_id: mtd_id,
      operate_name: operate_name,
      operate_type: operate_type,
      edit_prop: edit_prop,
      view_prop: view_prop,
      editval: editval,
      apply_condition: apply_condition,
      confirm_msg: confirm_msg,
      uri: uri,
      uriopentype: uriopentype,
      summary: summary,
      start_rows_input: start_rows_input,
      cols_name_input: cols_name_input,
      import_py: import_py,
      append_script: append_script,
      pyafternew: pyafternew,
      pyafternew2: pyafternew2,
      pyafteredit: pyafteredit,
      pyafteredit2: pyafteredit2,
      design_form: design_form,
      icon: icon
    },
    headers: { signature: true }
  })
}

export function method_delete(mtd_id) {
  /**
   * @method method_edit
   * @param mtd_id // 当前操作id
   */
  return request({
    url: '/rpcgateway/LegoObjectService/delete_method',
    method: 'post',
    data: {
      mtd_id: mtd_id
    },
    headers: { signature: true }
  })
}

export function method_list(proj_code, object_code) {
  /**
   * @method method_edit
   * @param page_id // 当前页面id
   */
  return request({
    url: '/rpcgateway/LegoObjectService/list_method',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code
    }
  })
}

export function method_list_by_id(object_id) {
  /**
   * @method method_edit
   * @param page_id // 当前页面id
   */
  return request({
    url: '/rpcgateway/LegoObjectService/list_method_by_id',
    method: 'get',
    params: {
      object_id: object_id
    }
  })
}

export function method_list_by_pageid(page_id) {
  /**
   * @method method_edit
   * @param page_id // 当前页面id
   */
  return request({
    url: '/rpcgateway/LegoObjectService/list_method_by_pageid',
    method: 'get',
    params: {
      page_id: page_id
    }
  })
}

export function method_info(mtd_id) {
  /**
   * @method method_edit
   * @param mtd_id // 当前操作id
   */
  return request({
    url: '/rpcgateway/LegoObjectService/info_method',
    method: 'get',
    params: {
      mtd_id: mtd_id
    }
  })
}

export function get_method_design_by_id(mtd_id) {
  /**
   * @method pagedata_get_headers
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/get_method_design_by_id',
    method: 'get',
    params: {
      mtd_id: mtd_id
    }
  })
}

export function page_list(object_id, text, page_index, page_size, page) {
  /**
   * @method page_list
   */
  return request({
    url: '/rpcgateway/LegoObjectService/list_page',
    method: 'get',
    params: {
      object_id: object_id,
      text: text,
      page_index: page_index,
      page_size: page_size,
      page: page
    }
  })
}

export function page_list_by_code(proj_code, object_code, text, page_index, page_size, page) {
  /**
   * @method page_list_by_code
   */
  return request({
    url: '/rpcgateway/LegoObjectService/list_page_by_code',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code,
      text: text,
      page_index: page_index,
      page_size: page_size,
      page: page
    }
  })
}

export function page_create(
  object_id,
  page_code,
  page_name,
  fields,
  ext_fields,
  props,
  can_create,
  can_update,
  can_delete,
  can_view,
  can_export,
  orderby,
  description,
  pybeforelist,
  pyafterlist,
  queryparam
) {
  /**
   * @method page_create
   * @param biz_id 项目业务类的ID
   * @param page_code 页面代码
   * @param page_name 页面显示名称
   * @param props 页面属性
   * @param fields [] 页面显示的字段
   * @param design_form 自定义表单
   * @param orderby 排序字段
   * @param description 对象用途描述
   * @param authopenrole 数据访问开放角色
   * @param enable_record 是否启用对象变动记录
   * @param auth_developers 有权修改对象定义的开发人员
   */
  return request({
    url: '/rpcgateway/LegoObjectService/create_page',
    method: 'post',
    data: {
      object_id: object_id,
      page_code: page_code,
      page_name: page_name,
      props: props,
      fields: fields,
      ext_fields: ext_fields,
      can_create: can_create,
      can_update: can_update,
      can_delete: can_delete,
      can_view: can_view,
      can_export: can_export,
      orderby: orderby,
      description: description,
      pybeforelist: pybeforelist,
      pyafterlist: pyafterlist,
      queryparam: queryparam
    },
    headers: { signature: true }
  })
}

export function page_edit(
  page_id,
  page_code,
  page_name,
  fields,
  ext_fields,
  props,
  can_create,
  can_update,
  can_delete,
  can_view,
  can_export,
  orderby,
  description,
  pybeforelist,
  pyafterlist,
  single_methods,
  other_methods,
  queryparam
) {
  /**
   * @method page_edit
   * @param biz_id 项目业务类的ID
   * @param page_code 页面代码
   * @param page_name 页面显示名称
   * @param props 页面属性
   * @param fields [] 页面显示的字段
   * @param design_form 自定义表单
   * @param orderby 排序字段
   * @param description 对象用途描述
   * @param authopenrole 数据访问开放角色
   * @param enable_record 是否启用对象变动记录
   * @param auth_developers 有权修改对象定义的开发人员
   * @param single_methods 单条操作
   * @param other_methods 其他操作
   */
  return request({
    url: '/rpcgateway/LegoObjectService/edit_page',
    method: 'post',
    data: {
      page_id: page_id,
      page_code: page_code,
      page_name: page_name,
      props: props,
      fields: fields,
      ext_fields: ext_fields,
      can_create: can_create,
      can_update: can_update,
      can_delete: can_delete,
      can_view: can_view,
      can_export: can_export,
      orderby: orderby,
      description: description,
      pybeforelist: pybeforelist,
      pyafterlist: pyafterlist,
      single_methods: single_methods,
      other_methods: other_methods,
      queryparam: queryparam
    },
    headers: { signature: true }
  })
}

export function page_delete(page_ids) {
  /**
   * @method page_delete
   * @param page_id: 项目ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/delete_page',
    method: 'post',
    data: {
      page_ids: page_ids
    },
    headers: { signature: true }
  })
}

export function page_info(page_id) {
  /**
   * @method page_info
   * @param page_id: 项目ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/info_page',
    method: 'get',
    params: {
      page_id: page_id
    }
  })
}

export function page_info_by_code(proj_code, object_code, page_code) {
  /**
   * @method page_info_by_code
   */
  return request({
    url: '/rpcgateway/LegoObjectService/info_page_by_code',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code,
      page_code: page_code
    }
  })
}

export function data_create(object_id, fields, mtd_id, pntfk, pntid, pnt_clsname) {
  /**
   * @method pagedata_create
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/insert',
    method: 'post',
    data: {
      object_id: object_id,
      fields: fields,
      mtd_id: mtd_id,
      pntfk: pntfk,
      pntid: pntid,
      pnt_clsname: pnt_clsname
    }
  })
}

export function data_update(
  object_id,
  ids,
  fields,
  mtd_id
) {
  /**
   * @method pagedata_update
   * @param filters: 数据过滤条件
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/update',
    method: 'post',
    data: {
      object_id: object_id,
      mtd_id: mtd_id,
      ids: ids,
      fields: fields
    }
  })
}

export function data_delete(object_id, ids) {
  /**
   * @method pagedata_delete
   * @param ids: 数据的主键
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/delete',
    method: 'post',
    data: {
      object_id: object_id,
      ids: ids
    }
  })
}

export function data_list(
  object_id,
  page_id,
  text,
  page_index,
  page_size,
  page,
  filters,
  convert,
  pntfk,
  pntid,
  pnt_clsname
) {
  /**
   * @method pagedata_list
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/data_lists',
    method: 'get',
    params: {
      object_id: object_id,
      page_id: page_id,
      page_index: page_index,
      page_size: page_size,
      page: page,
      text: text,
      filters: filters,
      convert: convert,
      pntfk: pntfk,
      pntid: pntid,
      pnt_clsname: pnt_clsname
    }
  })
}

export function data_list_by_code(proj_code, object_code, page_code, text, page_index, page_size, page, filters, convert, pntfk, pntid, pnt_clsname) {
  return request({
    url: '/rpcgateway/LegoObjectService/data_lists_by_code',
    method: 'get',
    params: {
      proj_code: proj_code,
      object_code: object_code,
      page_code: page_code,
      text: text,
      page_index: page_index,
      page_size: page_size,
      page: page,
      filters: filters,
      convert: convert,
      pntfk: pntfk,
      pntid: pntid,
      pnt_clsname: pnt_clsname
    }
  })
}

export function data_info(object_id, id, mtd_id) {
  /**
   * @method pagedata_info
   * @param page_id: 页面ID
   */
  return request({
    url: '/rpcgateway/LegoObjectService/data_info',
    method: 'get',
    params: {
      object_id: object_id,
      mtd_id: mtd_id,
      id: id
    }
  })
}

export function export_data(object_id, fields, ids, text, page_index, page_size, page) {
  return request({
    url: '/rpcgateway/LegoObjectService/saveListToExcel',
    method: 'post',
    data: {
      object_id: object_id,
      fields: fields,
      ids: ids,
      text: text,
      page_index: page_index,
      page_size: page_size,
      page: page
    },
    responseType: 'blob'
  })
}

export function get_design_select(object_id, page_id) {
  return request({
    url: '/rpcgateway/LegoObjectService/get_design_select',
    method: 'post',
    data: {
      object_id: object_id,
      page_id: page_id
    }
  })
}

export function get_design_select_by_code(proj_code, object_code, page_code) {
  return request({
    url: '/rpcgateway/LegoObjectService/get_design_select_by_code',
    method: 'post',
    data: {
      object_code: object_code,
      proj_code: proj_code,
      page_code: page_code
    }
  })
}
export function get_changes(object_id, id, mtd_id, page_index, page_size, page) {
  /**
   * @method page_list
   */
  return request({
    url: '/rpcgateway/LegoObjectService/data_changes',
    method: 'get',
    params: {
      object_id: object_id,
      id: id,
      mtd_id: mtd_id,
      page_index: page_index,
      page_size: page_size,
      page: page
    }
  })
}
