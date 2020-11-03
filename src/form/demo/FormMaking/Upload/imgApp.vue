<template>
  <div :id="uploadId" class="img-app">
    <van-uploader
      v-model="fileList"
      :deletable="isDelete"
      :max-count="limit ? limit : 1"
      :before-read="beforeRead"
      multiple />
  </div>
</template>
<script>
export default {
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
      uploadId: 'upload_' + new Date().getTime()
    }
  },
  methods: {
    
  }
}
</script>
