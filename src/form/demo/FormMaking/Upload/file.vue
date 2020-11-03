<template>
  <div>
    <el-upload
      :id="file_id"
      ref="upload"
      :style="{width: width}"
      :limit="fileLimit"
      :show-file-list="false"
      :multiple="multiple"
      :action="action"
      :http-request="uploadFile"
    >
      <el-button slot="trigger" size="small" type="primary">
        点击上传
      </el-button>
      <div v-if="multiple && list.length > 1" class="download" @click="downloadAll">
        下载全部
      </div>
      <div v-if="tip" slot="tip" class="el-upload__tip">
        {{ tip }}
      </div>
    </el-upload>
    <div class="filelist">
      <ul>
        <li v-for="item in list" :key="item.uid">
          <div class="item" @click="download(item)">
            <i class="el-icon-document" />{{ item.name }}
          </div>
          <template v-if="isShow">
            <span @click="update(item)"><i class="el-icon-refresh" /></span>
            <span @click="remove(item)"><i class="el-icon-delete" /></span>
          </template>
        </li>
      </ul>
    </div>
    <input ref="uploadInput" :style="{width:0, height: 0}" type="file" name="file" class="el-upload__input upload-input" @change="handleChange">
    <div v-show="progressFlag">
      <el-progress :percentage="progressPercent" />
    </div>
  </div>
</template>

<script>
import { download_attachment_by_id } from '@/form/demo/api/attachment'
import request from '@/form/demo/js/request'
import { saveAs } from 'file-saver'
export default {
  props: {
    action: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9999
    },
    tip: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    file_id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // list: this.value
      list: [],
      fileVal: [],
      fileLimit: this.limit,
      fileListVal: [],
      progressPercent: 0,
      progressFlag: false,
      updateId: '',
      isShow: false,
      file_content: '',
      dwList: []
    }
  },
  watch: {
    list(val) {
      // console.log('&&&&', val)
      this.fileVal = []
      val.forEach(item => {
        this.fileVal.push(item.attach_id)
      })
      const value = this.fileVal.join('|')
      this.$emit('input', value)
    }
  },
  created() {
    if (this.multiple) {
      this.fileLimit = this.limit
    } else {
      this.fileLimit = 1
    }
    if (this.value) {
      if (this.multiple) {
        const val = this.value.split('|')
        val.forEach(item => {
          download_attachment_by_id(item).then(response => {
            if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
              this.list.push({
                name: response.payload.object_name,
                attach_id: item
              })
              this.isShow = true

              request({
                url: '/rpcgateway/AttachmentService/file_content?attach_id=' + item,
                responseType: 'arraybuffer'
              }).then(res => {
                this.dwList.push({
                  name: response.payload.object_name,
                  content: res
                })
              })
            }
          })
        })
      } else {
        download_attachment_by_id(this.value).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.list.push({
              name: response.payload.object_name,
              attach_id: this.value
            })
            this.isShow = true
          }
        })
      }
    }
    this.fileListVal = this.list
  },
  methods: {
    uploadFile(file) {
      const total = file.file.size
      // const startTime = new Date()
      const step = 1024 * 1024 * 3 // 每次读取文件大小
      let cuLoaded = 0 // 当前已经读取总数

      const that = this
      const reader = new FileReader()
      reader.readAsArrayBuffer(file.file.slice(0, 0 + step))
      reader.onload = function(evt) {
        // const blob = new Blob([evt.target.result])
        const loaded = evt.loaded
        var formData = new FormData()
        formData.append('object_name', file.file.name)
        // formData.append('content', blob, file.file.name)
        formData.append('content', file.file)
        that.list.push({
          name: file.file.name,
          uid: file.file.uid
        })
        that.progressFlag = true
        that.isShow = false
        request({
          url: that.action,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function(progressEvent) {
            that.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
          }
        }).then(response => {
          if (response.code === that.$Utils.Constlib.ERROR_CODE_OK) {
            cuLoaded += loaded
            if (cuLoaded < total) {
              reader.readAsArrayBuffer(file.file.slice(cuLoaded, cuLoaded + step))
            } else {
              // console.log('总共用时：' + (new Date().getTime() - startTime.getTime()) / 1000)
              cuLoaded = total

              if (that.progressPercent === 100) {
                file.onProgress({ percent: that.progressPercent })
                file.onSuccess({ status: 'success' })
                that.$set(that.list, that.list.findIndex(item => item.uid === file.file.uid), {
                  ...that.list[that.list.findIndex(item => item.uid === file.file.uid)],
                  attach_id: response.payload
                })
                setTimeout(() => {
                  that.progressFlag = false
                  that.progressPercent = 0
                  that.isShow = true
                }, 500)
              }
            }
          }
        })
      }
    },
    downloadAll() {
      var JSZip = require('jszip')
      var zip = JSZip()
      var fileDownload = require('js-file-download')
      try {
        var isFileSaverSupported = !!new Blob()
      } catch (e) {}
      this.dwList.forEach(item => {
        zip.file(item.name, item.content)
      })

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        if (isFileSaverSupported) {
          saveAs(content, '附件.zip')
        } else {
          fileDownload(content, '附件.zip')
        }
      })
    },
    download(item) {
      const aLink = document.createElement('a')
      const fileName = item.name
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = '/rpcgateway/AttachmentService/download_by_id?attach_id=' + item.attach_id
      aLink.click()
    },
    remove(item) {
      const uid = item.uid
      const attach_id = item.attach_id
      if (uid) {
        this.list.splice(this.list.findIndex(item => item.uid === uid), 1)
      } else {
        this.list.splice(this.list.findIndex(item => item.attach_id === attach_id), 1)
      }
    },
    update(item) {
      this.updateId = item.attach_id
      this.$refs.uploadInput.click()
    },
    handleChange() {
      const files = this.$refs.uploadInput.files
      // const startTime = new Date()
      const step = 1024 * 1024 * 3 // 每次读取文件大小
      let cuLoaded = 0 // 当前已经读取总数

      const that = this
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const total = file.size
        const reader = new FileReader()
        reader.readAsArrayBuffer(file.slice(0, 0 + step))
        reader.onload = function(evt) {
        // const blob = new Blob([evt.target.result])
          const loaded = evt.loaded
          var formData = new FormData()
          formData.append('attach_id', that.updateId)
          formData.append('object_name', file.name)
          formData.append('content', file)
          that.progressFlag = true
          request({
            url: '/rpcgateway/AttachmentService/update_attachment',
            method: 'post',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
              that.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
            }
          }).then(response => {
            if (response.code === that.$Utils.Constlib.ERROR_CODE_OK) {
              cuLoaded += loaded
              if (cuLoaded < total) {
                reader.readAsArrayBuffer(file.slice(cuLoaded, cuLoaded + step))
              } else {
                cuLoaded = total

                if (that.progressPercent === 100) {
                  that.$set(that.list, that.list.findIndex(item => item.attach_id === that.updateId), {
                    ...that.list[that.list.findIndex(item => item.attach_id === that.updateId)],
                    name: file.name,
                    attach_id: that.updateId
                  })
                  setTimeout(() => {
                    that.progressFlag = false
                    that.progressPercent = 0
                  }, 500)
                }
              }
            }
          })
        }

        // var formData = new FormData()
        // formData.append('attach_id', this.updateId)
        // formData.append('object_name', file.name)
        // formData.append('content', file)
        // this.progressFlag = true
        // request({
        //   url: '/rpcgateway/AttachmentService/update_attachment',
        //   method: 'post',
        //   data: formData,
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   onUploadProgress: function(progressEvent) {
        //     that.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
        //   }
        // }).then(response => {
        //   if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
        //     if (this.progressPercent === 100) {
        //       this.$set(this.list, this.list.findIndex(item => item.attach_id === this.updateId), {
        //         ...this.list[this.list.findIndex(item => item.attach_id === this.updateId)],
        //         name: file.name,
        //         attach_id: this.updateId
        //       })
        //       setTimeout(() => {
        //         this.progressFlag = false
        //         this.progressPercent = 0
        //       }, 500)
        //     }
        //   }
        // })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.download {
  display: inline-block;
  margin-left: 10px;
  padding: 9px 15px;
  background: #67c23a;
  border: 1px solid #67c23a;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  line-height: 1;
  &:hover {
    opacity: 0.8;
  }
}
.filelist {
  margin-top: 8px;
  ul li {
    display: flex;
    padding: 0 10px;
    align-items: center;
    cursor: pointer;
    color: #606266;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    position: relative;
    .item {
      flex: 1;
      i {
        margin-right: 6px;
        color: #909399;
      }
    }
    span {
      margin: 0 4px;
      font-size: 15px;
    }
    &:hover {
      background: #ededed;
      color: #409eff;
    }
  }
}
</style>
