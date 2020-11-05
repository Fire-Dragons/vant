<template>
  <demo-block :title="'测试'" v-if="show">
      <generate-form-mobile ref="generateForm" :data="jsonData" :remote="remoteFuncs" :design-fields="designFields" />
  </demo-block>
</template>

<script>
  import request from '@/form/demo/js/request';
  import GenerateFormMobile from './FormMaking/GenerateFormMobile.vue'

  export default {
    name: 'test',
    components: {
      GenerateFormMobile,
    },
    data() {
      return {
        jsonData: {},
        headersAll: [],
        remoteFuncs: {
          remote_http_get(uri, body) {
            if (uri) {
              return request({
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
              return request({
                url: uri,
                method: 'post',
                data: body
              })
            } else {
              return new Promise((resolve, reject) => {
                resolve()
              })
            }
          }
        },
        designFields: [],
        object_id: '20201027151705000005007843834137',
        all_fields: true,
        page_id: null,
        show: false

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
            this.designFields = val.headersAll
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
      get_headers(object_id, all_fields, page_id) {
        return request({
          url: '/rpcgateway/LegoObjectService/get_headers',
          method: 'get',
          params: {
            object_id,
            all_fields,
            page_id
          }
        })
      },
      get_object_design_by_id(object_id) {
        /**
         * @method pagedata_get_headers
         * @param page_id: 页面ID
         */
        return request({
          url: '/rpcgateway/LegoObjectService/get_object_design_by_id',
          method: 'get',
          params: {
            object_id
          }
        })
      },
      fetchDate() {
        this.get_headers(this.object_id, true).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.headersAll = response.payload
          }
        })
        this.get_object_design_by_id(this.object_id).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.design_form = response.payload
          } else {
            this.$alert(response.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
    }
  };
</script>

<style scoped>

</style>
