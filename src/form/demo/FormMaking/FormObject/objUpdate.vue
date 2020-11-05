<template>
  <div class="generateform-box" v-if="show">
    <fm-generate-form ref="generateForm" v-if="fmshow" :data="jsonData" :remote="remoteFuncs" :value="editData" :edit="edit" :design-fields="designFields" />
    <div :style="styleObject" class="handle-btn el-form">
      <el-button v-if="edit" id="submit" :loading="$store.state.app.loading" type="danger" @click="handleSubmit">
        立即修改
      </el-button>
      <el-button id="cancel" plain @click="handleReset">
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: true
    },
    object_id: {
      type: String,
      default: null
    },
    objid: {
      type: String,
      default: null
    },
    mtd_id: {
      type: String,
      default: null
    }
  },
  data() {
    const that = this
    return {
      jsonData: {},
      editData: {},
      design_form: null,
      headersAll: [],
      remoteFuncs: {
        remote_http_get(uri, body) {
          if (uri) {
            return that.$Utils.request({
              url: uri,
              method: 'get',
              params: body
            })
          } else {
            return new Promise((resolve, reject) => {
              resolve()
            })
          }
        },
        remote_http_post(uri, body) {
          if (uri) {
            return that.$Utils.request({
              url: uri,
              method: 'get',
              params: body
            })
          } else {
            return new Promise((resolve, reject) => {
              resolve()
            })
          }
        }
      },
      styleObject: null,
      show: false,
      fmshow: false,
      designFields: []
    }
  },
  computed: {
    design() {
      const { design_form, headersAll } = this
      return {
        design_form,
        headersAll
      }
    }
  },
  watch: {
    design: {
      handler(val) {
        if (val.headersAll.length > 0 && val.design_form) {
          const design_form = JSON.parse(val.design_form)
          const designFields = []
          val.headersAll.forEach(item => {
            if (item.is_object && item.object_form) {
              designFields.push(item)
            }
          })
          this.designFields = designFields
          this.jsonData = design_form
          this.show = true
          this.styleObject = {
            paddingLeft: design_form.config.labelWidth + 'px'
          }
        }
      }
    }
  },
  created() {
    this.fetchDate()
  },
  methods: {
    fetchDate() {
      this.$Apis.object.data_info(this.object_id, this.objid, this.mtd_id).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.editData = response.payload
          this.fmshow = true
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
      this.$Apis.object.get_headers(this.object_id, true).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.headersAll = response.payload
        }
      })
      if (this.mtd_id) {
        this.get_method_design()
      } else {
        this.get_object_design()
      }
    },
    get_method_design() {
      this.$Apis.object.get_method_design_by_id(this.mtd_id).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          if (response.payload) {
            this.design_form = response.payload
          } else {
            this.get_object_design()
          }
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    get_object_design() {
      this.$Apis.object.get_object_design_by_id(this.object_id).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.design_form = response.payload
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    handleSubmit() {
      this.$refs.generateForm.getData().then(data => {
         this.$store.commit('SET_LOADING', true)
         this.$Apis.object.data_update(this.object_id, this.objid, data, this.mtd_id).then(response => {
           if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
             this.$alert(response.message, '提示', {
               confirmButtonText: '确定',
               callback: action => {
                 this.$emit('refresh')
                 this.handleReset()
               }
             })
           } else {
             this.$alert(response.message, '提示', {
               confirmButtonText: '确定'
             })
           }
           this.$store.commit('SET_LOADING', false)
         })
      }).catch(e => {
        // 数据校验失败
        this.$alert(e, '提示', {
          confirmButtonText: '确定'
        })
      })
    },
    handleReset() {
      this.$emit('show')
    }
  }
}
</script>
