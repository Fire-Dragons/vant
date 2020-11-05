<template>
  <div
    :id="uploadId"
    class="fm-uplaod-container"
  >
    <draggable
      v-model="fileList"
      v-bind="{group: uploadId, ghostClass: 'ghost', animation: 200}"
      :no-transition-on-drag="true"
      class="drag-img-list"
    >
      <div
        v-for="(item) in fileList"
        :id="item.key"
        :key="item.key"
        :style="{width: width+'px', height: height+'px'}"
        :class="{uploading: item.status=='uploading', 'is-success': item.status=='success', 'is-diabled': disabled}"
        class="upload-file"
      >
        <!-- <a :href="'/rpcgateway/AttachmentService/download_by_id?attach_id=' + item.attach_id">
          <img :src="item.url" >
        </a> -->
        <img :src="item.url">

        <el-progress v-if="item.status=='uploading'" :width="miniWidth*0.9" :percentage="item.percent" class="upload-progress" type="circle" />

        <label v-if="item.status=='success'" class="item-status">
          <i class="el-icon-upload-success el-icon-check" />
        </label>

        <div :style="{height: miniWidth / 4 + 'px'}" class="uplaod-action">
          <i :style="{'font-size': miniWidth/8+'px'}" class="iconfont-fm icon-tupianyulan" title="预览" @click="handlePreviewFile(item.key)" />
          <i class="el-icon-download" style="font-weight:bold" title="下载" @click="handleDownloadFile(item.key)" />
          <i v-if="isedit && !disabled" :style="{'font-size': miniWidth/8+'px'}" class="iconfont-fm icon-sync1" title="替换" @click="handleEdit(item.key, item.object_name, item.attach_id)" />
          <i v-if="isdelete && fileList.length > min && !disabled" :style="{'font-size': miniWidth/8+'px'}" class="iconfont-fm icon-delete" title="删除" @click="handleRemove(item.key)" />
        </div>
      </div>
    </draggable>

    <div
      v-show="(!isQiniu || (isQiniu && token)) && (fileList.length < 1 || limit)"
      :class="{'is-disabled': disabled}"
      :style="{width: width+'px', height: height+'px'}"
      class="el-upload el-upload--picture-card"
      @click.self="handleAdd"
    >
      <i :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}" class="el-icon-plus" @click.self="handleAdd" />
      <input v-if="multiple" ref="uploadInput" :style="{width: 0, height: 0}" accept="image/*" multiple type="file" name="file" class="el-upload__input upload-input" @change="handleChange">
      <input v-else ref="uploadInput" :style="{width:0, height: 0}" accept="image/*" type="file" name="file" class="el-upload__input upload-input" @change="handleChange">
    </div>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import Draggable from 'vuedraggable'
import * as qiniu from 'qiniu-js'
import { download_attachment_by_id, update_attachment } from '@/form/demo/api/attachment'
import request from '@/form/demo/js/request'
import { convertBase64UrlToBlob } from '@/form/demo/js/image'
require('viewerjs/dist/viewer.css')
export default {
  components: {
    Draggable
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    token: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 9
    },
    isQiniu: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    meitu: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      viewer: null,
      uploadId: 'upload_' + new Date().getTime(),
      editIndex: -1,
      meituIndex: -1,
      imgVals: [],
      isdelete: this.isDelete,
      isedit: this.isEdit,
      isUpdate: false,
      updateId: '',
      updateObjName: ''
    }
  },
  computed: {
    miniWidth() {
      if (this.width > this.height) {
        return this.height
      } else {
        return this.width
      }
    }
  },
  watch: {
    'fileList': {
      // deep: true,
      handler(val) {
        if (val.length > 0) {
          this.imgVals = []
          val.forEach(item => {
            if (this.limit) {
              this.imgVals.push(item.attach_id)
              const value = this.imgVals.join('|')
              this.$emit('input', value)
            }
          })
        } else {
          this.$emit('input', '')
        }
      }
    }
  },
  created() {
    if (this.value) {
      if (this.limit) {
        const val = this.value.split('|')
        val.forEach(item => {
          download_attachment_by_id(item).then(response => {
            if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
              this.fileList.push({
                key: item,
                url: response.payload.content,
                percent: 100,
                status: 'success',
                attach_id: item,
                object_name: response.payload.object_name
              })
              this.isdelete = true
              this.isedit = true
            }
          })
        })
      } else {
        download_attachment_by_id(this.value).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.fileList = [
              {
                key: this.value,
                url: response.payload.content,
                percent: 100,
                status: 'success',
                attach_id: this.value,
                object_name: response.payload.object_name
              }
            ]
            this.isdelete = true
            this.isedit = true
          }
        })
      }
    }
  },
  mounted() {
    // this.$emit('input', this.fileList)
  },
  methods: {
    handleChange() {
      const files = this.$refs.uploadInput.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        const key = (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999)
        reader.readAsDataURL(file)
        reader.onload = () => {
          if (this.editIndex >= 0) {
            if (this.isUpdate) {
              this.$set(this.fileList, this.editIndex, {
                key: this.updateId,
                url: reader.result,
                percent: 0,
                status: 'uploading'
              })
            } else {
              this.$set(this.fileList, this.editIndex, {
                key,
                url: reader.result,
                percent: 0,
                status: 'uploading'
              })
            }

            this.editIndex = -1
          } else {
            this.fileList.push({
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading'
            })
          }

          this.$nextTick(() => {
            if (this.isQiniu) {
              this.uplaodAction2(reader.result, file, key)
            } else if (this.isUpdate) {
              this.handleUpdate(reader.result, file, this.updateId)
              this.isUpdate = false
            } else {
              this.uplaodAction(reader.result, file, key)
            }
          })
        }
      }
    },
    uplaodAction(res, file, key) {
      const url = this.action

      request({
        url: url,
        method: 'post',
        data: {
          object_name: file.name,
          content: res
        },
        headers: { signature: true }
      }).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
            ...this.fileList[this.fileList.findIndex(item => item.key === key)],
            url: res,
            percent: 100,
            attach_id: response.payload,
            object_name: file.name
          })
          setTimeout(() => {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              status: 'success'
            })
            this.isdelete = true
            this.isedit = true
            this.imgVals.push(response.payload)
            const value = this.imgVals.join('|')
            this.$emit('input', value)
          }, 200)
        } else {
          this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
            ...this.fileList[this.fileList.findIndex(item => item.key === key)],
            status: 'error'
          })
          this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
        }
      })
    },
    handleUpdate(res, file, key) {
      let object_name = ''
      if (file.name) {
        object_name = file.name
      } else {
        object_name = this.updateObjName
      }
      update_attachment(key, res, object_name).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
            ...this.fileList[this.fileList.findIndex(item => item.key === key)],
            url: res,
            percent: 100,
            attach_id: key,
            object_name: file.name
          })
          setTimeout(() => {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              status: 'success'
            })
          }, 200)
        }
      })
    },
    uplaodAction2(res, file, key) {
      const _this = this
      const observable = qiniu.upload(file, key, this.token, {
        fname: key,
        mimeType: []
      }, {
        useCdnDomain: true,
        region: qiniu.region.z2
      })
      observable.subscribe({
        next(res) {
          _this.$set(_this.fileList[_this.fileList.findIndex(item => item.key === key)], 'percent', parseInt(res.total.percent))
        },
        error(err) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            status: 'error'
          })
          _this.fileList.splice(_this.fileList.findIndex(item => item.key === key), 1)
        },
        complete(res) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            url: _this.domain + res.key,
            percent: 100
          })
          setTimeout(() => {
            _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
              ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
              status: 'success'
            })
            _this.$emit('input', _this.fileList)
          }, 200)
        }
      })
    },
    handleRemove(key) {
      this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
    },
    handleEdit(key, object_name, attach_id) {
      this.isUpdate = true
      if (key === attach_id) {
        this.updateId = key
      } else {
        this.updateId = attach_id
      }
      this.updateObjName = object_name
      this.editIndex = this.fileList.findIndex(item => item.key === key)
      this.$refs.uploadInput.click()
    },
    handleMeitu(key) {
      this.$emit('on-meitu', this.fileList.findIndex(item => item.key === key))
    },
    handleAdd() {
      if (!this.disabled) {
        this.editIndex = -1
        this.$refs.uploadInput.click()
      }
    },
    handlePreviewFile(key) {
      this.viewer && this.viewer.destroy()
      this.uploadId = 'upload_' + new Date().getTime()

      console.log(this.viewer)
      this.$nextTick(() => {
        this.viewer = new Viewer(document.getElementById(this.uploadId))
        this.viewer.view(this.fileList.findIndex(item => item.key === key))
      })
    },
    handleDownloadFile(key) {
      const index = this.fileList.findIndex(item => item.key === key)
      const aLink = document.createElement('a')
      const file = this.fileList[index]
      const blob = convertBase64UrlToBlob(file.url) // new Blob([content]);
      const fileName = file.object_name
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
      // aLink.dispatchEvent(evt);
    }
  }
}
</script>

<style lang="scss">
.fm-uplaod-container {
  .is-disabled {
    position: relative;

    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // background: rgba(0,0,0,.1);
      content: '';
      display: block;
      cursor: not-allowed;
    }
  }

  .upload-file {
    margin: 0 10px 10px 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // background: #fff;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    vertical-align: top;
    &:hover {
      .uplaod-action {
        display: flex;
      }
    }
    .uplaod-action {
      position: absolute;
      // top: 0;
      // height: 30px;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      display: none;
      justify-content: center;
      align-items: center;
      i {
        color: #fff;
        cursor: pointer;
        margin: 0 5px;
      }
    }
    &.is-success {
      .item-status {
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
        & > i {
          font-size: 12px;
          margin-top: 11px;
          color: #fff;
          transform: rotate(-45deg);
        }
      }
    }
    &.uploading {
      &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .upload-progress {
      position: absolute;
      .el-progress__text {
        color: #fff;
        font-size: 16px !important;
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }
  .el-upload--picture-card {
    position: relative;
    overflow: hidden;
    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    opacity: 0;
    cursor: pointer;
  }

  .drag-img-list {
    display: inline;

    .ghost {
      position: relative;
      &::after {
        width: 100%;
        height: 100%;
        display: block;
        content: '';
        background: #fbfdff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px dashed #3bb3c2;
      }
    }

    & > div {
      cursor: move;
    }
  }
}

.viewer-container {
  z-index: 9999 !important;
}
</style>
