<template>
  <cus-dialog
    :visible="templateVisible"
    @on-close="templateVisible = false"
    ref="templateDialog"
    width="800px"
    form
    title="自定义模板"
    @on-submit="handleSubmit"
  >
    <code-editor height="400px" :mode="this.mode" v-model="templ" />
  </cus-dialog>
</template>

<script>
import CusDialog from './CusDialog'
import CodeEditor from './CodeEditor'

export default {
  components: {
    CusDialog,
    CodeEditor
  },
  props: {
    mode: {
      type: String,
      default: 'xml'
    }
  },
  data() {
    return {
      templateVisible: false,
      templ: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('on-confirm', this.templ)
    },

    open(val) {
      this.templ = val

      this.templateVisible = true
    },

    close() {
      this.templateVisible = false
    }
  }
}
</script>
