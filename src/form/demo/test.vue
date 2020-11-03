<template>
  <demo-block :title="'测试'">
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
        jsonData: {"list":[{"type":"input","name":"单行文本","icon":"icon-input","options":{"width":"100%","defaultValue":null,"required":true,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"unit":"","textPosition":"left","uppercase":false,"events":{"blur":{"args":["number"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"单行文本-blur事件\")","func_name":"func_1603783411806"},"focus":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"单行文本-focus事件\")","func_name":"func_1603783457777"},"change":{"args":["value"],"tips":"value: string | number","func_body":"console.info(value)\nconsole.info(\"单行文本-change事件\")","func_name":"func_1603783469759"},"input":{"args":["value"],"tips":"value: string | number","func_body":"console.info(value)\nconsole.info(\"单行文本-input事件\")","func_name":"func_1603787627189"}},"conversion":"","remoteFunc":"func_1603783037842","fieldTips":"12212112"},"name_model":{"label":"单行文本","prop":"1603783037842"},"key":"1603783037842","model":"input_1603783037842","rules":[{"required":true,"message":"必须填写"}]},{"type":"textarea","name":"多行文本","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":null,"required":false,"requiredMessage":"","disabled":false,"pattern":"","patternMessage":"","placeholder":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"events":{"blur":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"多行文本-blur事件\")","func_name":"func_1603783482910"},"focus":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"多行文本-focus事件\")","func_name":"func_1603783490513"},"change":{"args":["value"],"tips":"value: string | number","func_body":"console.info(value)\nconsole.info(\"多行文本-change事件\")","func_name":"func_1603783502308"}},"remoteFunc":"func_1603783039304","textPosition":"left"},"name_model":{"label":"多行文本","prop":"1603783039304"},"key":"1603783039304","model":"textarea_1603783039304","rules":[]},{"type":"number","name":"计数器","icon":"icon-number","options":{"width":"","required":false,"requiredMessage":"","defaultValue":0,"min":0,"max":0,"step":1,"disabled":false,"controlsPosition":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"unit":"","events":{"blur":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"计数器文本-blur事件\")","func_name":"func_1603783520310"},"focus":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"计数器-focus事件\")","func_name":"func_1603783527714"},"change":{"args":["currentValue","oldValue"],"tips":"currentValue, oldValue","func_body":"console.info(currentValue, oldValue)\nconsole.info(\"计数器-change事件\")","func_name":"func_1603783542699"}},"remoteFunc":"func_1603783041764"},"name_model":{"label":"计数器","prop":"1603783041764"},"key":"1603783041764","model":"number_1603783041764","rules":[]},{"type":"radio","name":"单选框组","icon":"icon-radio-active","options":{"inline":true,"defaultValue":[],"showLabel":true,"options":[{"value":"选项1","label":"1"},{"value":"选项2","label":"2"},{"value":"选项3","label":"3"},{"value":"新选项4","label":"4"},{"value":"新选项5","label":"5"},{"value":"新选项6","label":"6"},{"value":"新选项7","label":"7"},{"value":"新选项8","label":"8"},{"value":"新选项9","label":"9"},{"value":"新选项10","label":"10"},{"value":"新选项11","label":"11"},{"value":"新选项12","label":"12"},{"value":"新选项13","label":"13"},{"value":"新选项14","label":"14"},{"value":"新选项15","label":"15"},{"value":"新选项16","label":"16"},{"value":"新选项17","label":"17"},{"value":"新选项18","label":"18"},{"value":"新选项19","label":"19"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1603783042168","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false,"events":{"change":{"args":["value"],"tips":"value: 选中的 Radio label 值","func_body":"console.info(value)\nconsole.info(\"单选框组-change事件\")","func_name":"func_1603783582783"}},"hideLabel":false},"name_model":{"label":"单选框组","prop":"1603783042168"},"key":"1603783042168","model":"radio_1603783042168","rules":[]},{"type":"checkbox","name":"多选框组","icon":"icon-check-box","options":{"inline":true,"defaultValue":[],"showLabel":true,"options":[{"value":"选项1","label":"1"},{"value":"选项2","label":"2"},{"value":"选项3","label":"3"},{"value":"新选项4","label":"4"},{"value":"新选项5","label":"5"},{"value":"新选项6","label":"6"},{"value":"新选项7","label":"7"},{"value":"新选项8","label":"8"},{"value":"新选项9","label":"9"},{"value":"新选项10","label":"10"},{"value":"新选项11","label":"11"},{"value":"新选项12","label":"12"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1603783042837","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false,"events":{"change":{"args":["value"],"tips":"value: 更新后的值","func_body":"console.info(value)\nconsole.info(\"多选框组-change事件\")","func_name":"func_1603783602698"}}},"name_model":{"label":"多选框组","prop":"1603783042837"},"key":"1603783042837","model":"checkbox_1603783042837","rules":[]},{"type":"time","name":"时间选择器","icon":"icon-time","options":{"defaultValue":null,"readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","isRange":false,"arrowControl":true,"format":"HH:mm:ss","required":false,"requiredMessage":"","width":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"events":{"blur":{"args":["event"],"tips":"event: 组件实例","func_body":"console.info(event)\nconsole.info(\"时间选择器-blur事件\")","func_name":"func_1603783625230"},"focus":{"args":["event"],"tips":"event: 组件实例","func_body":"console.info(event)\nconsole.info(\"时间选择器-focus事件\")","func_name":"func_1603783643378"},"change":{"args":["value"],"tips":"value: 组件绑定值。格式与绑定值一致，可受 value-format 控制","func_body":"console.info(value)\nconsole.info(\"时间选择器-change事件\")","func_name":"func_1603783656766"}},"remoteFunc":"func_1603783043213"},"name_model":{"label":"时间选择器","prop":"1603783043213"},"key":"1603783043213","model":"time_1603783043213","rules":[]},{"type":"date","name":"日期选择器","icon":"icon-date","options":{"defaultValue":"2020-10-28T06:33:48.644Z","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"month","format":"yyyy-MM-dd","timestamp":true,"required":false,"requiredMessage":"","width":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"event":{},"change":null,"events":{"blur":{"args":["event"],"tips":"event: 组件实例","func_body":"console.info(event)\nconsole.info(\"日期选择器-blur事件\")","func_name":"func_1603783673993"},"focus":{"args":["event"],"tips":"event: 组件实例","func_body":"console.info(event)\nconsole.info(\"日期选择器-focus事件\")","func_name":"func_1603783686143"},"change":{"args":["value"],"tips":"value: 组件绑定值。格式与绑定值一致，可受 value-format 控制","func_body":"console.info(value)\nconsole.info(\"日期选择器-change事件\")","func_name":"func_1603783697047"}},"remoteFunc":"func_1603783043888"},"name_model":{"label":"日期选择器","prop":"1603783043888"},"key":"1603783043888","model":"date_1603783043888","rules":[]},{"type":"rate","name":"评分","icon":"icon-pingfen1","options":{"defaultValue":0,"max":5,"disabled":false,"allowHalf":false,"required":false,"requiredMessage":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showScore":false,"events":{"change":{"args":["value"],"tips":"value: 改变后的分值","func_body":"console.info(value)\nconsole.info(\"评分-change事件\")","func_name":"func_1603783711021"}},"remoteFunc":"func_1603783044209"},"name_model":{"label":"评分","prop":"1603783044209"},"key":"1603783044209","model":"rate_1603783044209","rules":[]},{"type":"select","name":"下拉选择框","icon":"icon-select","options":{"defaultValue":null,"defaultLabel":"","multiple":false,"disabled":false,"clearable":false,"placeholder":"","required":false,"requiredMessage":"","showLabel":true,"width":"","options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"},{"value":"3","label":"下拉框3"}],"remote":false,"filterable":true,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1603783047251","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"pagination":false,"pageIndex":1,"pageSize":10,"pageCount":1,"remoteSearch":false,"events":{"blur":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"下拉选择框-blur事件\")","func_name":"func_1603783753179"},"focus":{"args":["event"],"tips":"event: Event","func_body":"console.info(event)\nconsole.info(\"下拉选择框-focus事件\")","func_name":"func_1603783765391"},"change":{"args":["value"],"tips":"value: 目前的选中值","func_body":"console.info(value)\nconsole.info(\"下拉选择框-change事件\")","func_name":"func_1603783779083"},"clear":{"args":[],"tips":"","func_body":"console.info(\"下拉选择框-clear事件\")","func_name":"func_1603783792886"}},"remoteParams":""},"name_model":{"label":"下拉选择框","prop":"1603783047251"},"key":"1603783047251","model":"select_1603783047251","rules":[]},{"type":"switch","name":"开关","icon":"icon-switch","options":{"defaultValue":false,"required":false,"requiredMessage":"","disabled":false,"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"events":{"change":{"args":["value"],"tips":"value: 改变后的分值","func_body":"console.info(\"改变后的值:\",value)\nconsole.info(\"开关-change事件\")","func_name":"func_1603783818790"}},"remoteFunc":"func_1603783047733"},"name_model":{"label":"开关","prop":"1603783047733"},"key":"1603783047733","model":"switch_1603783047733","rules":[]},{"type":"slider","name":"滑块","icon":"icon-slider","options":{"defaultValue":0,"disabled":false,"required":false,"requiredMessage":"","min":0,"max":100,"step":1,"showInput":false,"range":false,"width":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"unit":"","events":{"change":{"args":["value"],"tips":"value: 改变后的值","func_body":"console.info(\"改变后的值:\",value)\nconsole.info(\"滑块-change事件\")","func_name":"func_1603783832387"},"input":{"args":["value"],"tips":"value: 改变后的值","func_body":"console.info(\"改变后的值:\",value)\nconsole.info(\"滑块-input事件\")","func_name":"func_1603783845977"}},"remoteFunc":"func_1603783048098"},"name_model":{"label":"滑块","prop":"1603783048098"},"key":"1603783048098","model":"slider_1603783048098","rules":[]},{"type":"select2","name":"表格选择器","icon":"icon-select","options":{"defaultValue":null,"labelWidth":100,"hidden":false,"dataBind":true,"multiple":false,"customClass":"","proj_code":"student_mgmt","object_code":"Person","page_code":"person_page1","option":{"value":"person_id","label":"full_name"},"required":false,"events":{"change":{"args":["value"],"tips":"value: 目前的选中值","func_body":"console.info(\"目前选中值:\", value)\nconsole.info(\"表格选择器-change事件\")","func_name":"func_1603783862825"}},"remoteFunc":"func_1603783049739"},"name_model":{"label":"表格选择器","prop":"1603783049739"},"key":"1603783049739","model":"select2_1603783049739","rules":[]}],"config":{"labelWidth":100,"isLabelWidth":false,"labelPosition":"right","size":"small","customClass":"","ui":"element","width":"100%","readOnly":false,"hideLabel":false,"fieldTips":null,"textColor":"#ddd","events":{"created":{"args":[],"tips":"","func_body":"","func_name":""},"onsubmit":{"args":["models"],"tips":"models: 表单所有数据","func_body":"","func_name":""},"mounted":{"args":["models"],"tips":"models: 初始化数据","func_body":"","func_name":""}},"id":"student_mgmt-event_test"}},
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
        page_id: null

      }
    },
    watch: {
      design: {
        handler(val) {
          if (val.headersAll.length > 0 && val.design_form) {
            const design_form = JSON.parse(val.design_form)
            this.designFields = val.headersAll
            console.info(this.designFields)
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
        }),
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
