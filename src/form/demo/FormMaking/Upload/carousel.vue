<template>
  <div>
    <el-upload
      :id="carousel_id"
      :show-file-list="false"
      :http-request="upload"
      action="/rpcgateway/AttachmentService/save_attachment"
      class="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <input ref="uploadInput" :style="{width:0, height: 0}" type="file" name="file" class="el-upload__input upload-input" @change="handleChange">
    <el-carousel
      :height="height"
      :trigger="trigger"
      :arrow="arrow"
      :direction="direction"
    >
      <el-carousel-item v-for="item in list" :key="item.src">
        <el-image :src="item.src" fit="contain" />
        <div class="filelist">
          <span @click="download(item)"><i class="el-icon-download" /></span>
          <span @click="update(item)"><i class="el-icon-refresh" /></span>
          <span @click="remove(item)"><i class="el-icon-delete" /></span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import request from '@/form/demo/js/request'
import { convertBase64UrlToBlob } from '@/form/demo/js/image'
import { download_attachment_by_id } from '@/form/demo/api/attachment'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    list: {
      type: Array,
      default: () => []
    },
    carousel_id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileVal: [],
      updateId: null
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
    if (this.value) {
      const val = this.value.split('|')
      val.forEach(item => {
        download_attachment_by_id(item).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.list.push({
              name: response.payload.object_name,
              attach_id: item,
              src: response.payload.content
            })
          }
        })
      })
    }
  },
  methods: {
    upload(f) {
      const file = f.file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (evt) => {
        request({
          url: '/rpcgateway/AttachmentService/save_attachment',
          method: 'post',
          data: {
            object_name: file.name,
            content: reader.result
          },
          headers: { signature: true }
        }).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.list.push({
              name: file.name,
              uid: file.uid,
              src: reader.result,
              attach_id: response.payload
            })
          }
        })
      }
    },
    download(item) {
      const aLink = document.createElement('a')
      const fileName = item.name
      const blob = convertBase64UrlToBlob(item.src)
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
    },
    update(item) {
      this.updateId = item.attach_id
      this.$refs.uploadInput.click()
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
    handleChange() {
      const files = this.$refs.uploadInput.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (evt) => {
          request({
            url: '/rpcgateway/AttachmentService/update_attachment',
            method: 'post',
            data: {
              attach_id: this.updateId,
              object_name: file.name,
              content: reader.result
            },
            headers: { signature: true }
          }).then(response => {
            if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
              this.$set(this.list, this.list.findIndex(item => item.attach_id === this.updateId), {
                ...this.list[this.list.findIndex(item => item.attach_id === this.updateId)],
                name: file.name,
                src: reader.result,
                attach_id: this.updateId
              })
            }
          })
        }
      }
    }
  }
}
</script>

