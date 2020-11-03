/**
 * 附件相关http接口
 * @module attachment.js
 */
import request from '../js/request'

export function save_attachment(object_name, content) {
/**
 * 保存附件
 * @method save_attachment
 * @param object_name: 附件/对象名称
 * @param content: 附件/对象内容
 */
  return request({
    url: '/rpcgateway/AttachmentService/save_attachment',
    method: 'post',
    data: {
      'object_name': object_name,
      'content': content
    },
    headers: { signature: true }
  })
}

export function update_attachment(attach_id, content) {
/**
 * 保存附件
 * @method update_attachment
 * @param attach_id: 附件ID
 * @param content: 附件/对象内容
 */
  return request({
    url: '/rpcgateway/AttachmentService/update_attachment',
    method: 'post',
    data: {
      'attach_id': attach_id,
      'content': content
    },
    headers: { signature: true }
  })
}

export function download_attachment_by_id(attach_id) {
/**
 * 保存附件
 * @method download_attachment_by_id
 * @param attach_id: 附件ID
 */
  return request({
    url: '/rpcgateway/AttachmentService/download_attachment_by_id',
    method: 'get',
    params: {
      'attach_id': attach_id
    }
  })
}

export function download_attachment_by_owner(owner, object_name) {
/**
 * 保存附件
 * @method download_attachment_by_owner
 * @param owner: 拥有者
 * @param object_name: 附件名称
 */
  return request({
    url: '/rpcgateway/AttachmentService/download_attachment_by_id',
    method: 'get',
    params: {
      'owner': owner,
      'object_name': object_name
    }
  })
}

