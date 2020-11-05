<template>
  <el-container class="fm2-container fm-form">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate">
                基础字段
              </div>
              <draggable
                :list="basicComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                :move="handleMove"
                tag="ul"
                @end="handleMoveEnd"
                @start="handleMoveStart"
              >
                <li v-for="(item, index) in basicComponents" v-if="basicFields.indexOf(item.type)>=0" :id="'fm_'+item.type" :key="index" :class="{'no-put': item.type == 'divider'}" class="form-edit-widget-label" @click="handleField(item)">
                  <a>
                    <i :class="item.icon" class="icon iconfont-fm" />
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="advanceFields.length">
              <div class="widget-cate">
                高级字段
              </div>
              <draggable
                :list="advanceComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                :move="handleMove"
                tag="ul"
                @end="handleMoveEnd"
                @start="handleMoveStart"
              >
                <li v-for="(item, index) in advanceComponents" v-if="advanceFields.indexOf(item.type) >= 0" :id="'fm_'+item.type" :key="index" :class="{'no-put': item.type == 'table'}" class="form-edit-widget-label" @click="handleField(item)">
                  <a>
                    <i :class="item.icon" class="icon iconfont-fm" />
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="layoutFields.length">
              <div class="widget-cate">
                布局字段
              </div>
              <draggable
                :list="layoutComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                :move="handleMove"
                tag="ul"
                @end="handleMoveEnd"
                @start="handleMoveStart"
              >
                <li v-for="(item, index) in layoutComponents" v-if="layoutFields.indexOf(item.type) >=0" :id="'fm_'+item.type" :key="index" class="form-edit-widget-label no-put" @click="handleField(item)">
                  <a>
                    <i :class="item.icon" class="icon iconfont-fm" />
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="customFields.length">
              <div class="widget-cate">
                自定义字段
              </div>
              <draggable
                tag="ul"
                :list="customComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li @click="handleField(item)" class="form-edit-widget-label" v-for="(item, index) in customComponents" :key="index">
                  <a>
                    <i class="icon iconfont-fm" :class="item.icon" />
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>
          </div>
        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action" />
            <el-button :disabled="!undo" type="text" size="medium" icon="el-icon-back" @click="handleUndo">
              撤销
            </el-button>
            <el-button :disabled="!redo" type="text" size="medium" icon="el-icon-right" @click="handleRedo">
              重做
            </el-button>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">
              导入JSON
            </el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">
              清空
            </el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">
              预览
            </el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">
              生成JSON
            </el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">
              生成代码
            </el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form v-if="!resetJson" ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect" />
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div :class="{active: configTab=='widget'}" class="config-tab" @click="handleConfigSelect('widget')">
                字段属性
              </div>
              <div :class="{active: configTab=='form'}" class="config-tab" @click="handleConfigSelect('form')">
                表单属性
              </div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :key="widgetFormSelect ? widgetFormSelect.key : 0" :design-fields="designFields" :remote="remoteFuncsNames" />
              <form-config v-show="configTab=='form'" :data="widgetForm.config" />
            </el-main>
          </el-container>
        </el-aside>

        <cus-dialog
          ref="widgetPreview"
          :visible="previewVisible"
          width="1000px"
          form
          title="预览"
          @on-close="previewVisible = false"
        >
          <generate-form v-if="previewVisible && (previewForm.config.ui == 'element' || !previewForm.config.ui)" ref="generateForm" :data="previewForm" :value="widgetModels" :remote="remoteFuncs" insite="true" :design-fields="designFields" :module-init="moduleInit">
            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px" />
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px" />
            </template>
          </generate-form>
          <template slot="action">
            <el-button type="primary" @click="handleTest">
              获取数据
            </el-button>
            <el-button @click="handleReset">
              重置
            </el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          ref="uploadJson"
          :visible="uploadVisible"
          width="800px"
          form
          title="导入JSON"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可" />
          <code-editor height="400px" mode="json" v-model="jsonEg" />
        </cus-dialog>

        <cus-dialog
          ref="jsonPreview"
          width="800px"
          form
          title="生成JSON"
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
        >
          <code-editor height="400px" mode="json" v-model="jsonTemplate" />
          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">
              复制数据
            </el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          ref="codePreview"
          width="800px"
          form
          title="生成代码"
          :visible="codeVisible"
          @on-close="codeVisible = false"
        >
          <el-tabs type="border-card" style="box-shadow: none;" v-model="codeActiveName">
            <el-tab-pane label="Vue Component" name="vue">
              <code-editor height="450px" mode="html" v-model="vueTemplate" />
            </el-tab-pane>
            <el-tab-pane label="HTML" name="html">
              <code-editor height="450px" mode="html" v-model="htmlTemplate" />
            </el-tab-pane>
          </el-tabs>

          <template slot="action">
            <el-button type="primary" class="code-btn" :data-clipboard-text="codeCopyValue">
              复制
            </el-button>
          </template>
        </cus-dialog>
      </el-container>
    </el-main>
    <!-- <el-footer height="30px" style="font-weight: 600;">Powered by <a target="_blank" href="https://github.com/GavinZhuLei/vue-form-making">vue-form-making</a></el-footer> -->
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import CodeEditor from './CodeEditor'
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig.js'
import { EventBus } from '@/form/demo/js/event-bus'
import request from '@/form/demo/js/request.js'
import generateCode from './generateCode.js'
import historyManager from '@/form/demo/js/history-manager'
import _ from 'lodash'
import Vue from 'vue'

export default {
  name: 'FmMakingForm',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm,
    CodeEditor
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text', 'carousel', 'html', 'select2']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'component', 'fileupload', 'imgupload', 'editor', 'cascader', 'innerobject', 'outerobject']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid', 'report', 'tabs', 'divider']
    },
    customFields: {
      type: Array,
      default: () => []
    },
    designFields: {
      type: Array,
      default: () => []
    },
    moduleInit: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      customComponents: [],
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          isLabelWidth: false,
          labelPosition: 'right',
          size: 'small',
          customClass: '',
          ui: 'element',
          width: '100%',
          readOnly: false,
          hideLabel: false,
          fieldTips: null,
          textColor: '#ddd',
          events: {
            created: {
              args: [],
              tips: '',
              func_body: '',
              func_name: ''
            },
            onsubmit: {
              args: ['models'],
              tips: 'models: 表单所有数据',
              func_body: '',
              func_name: ''
            },
            mounted: {
              args: ['models'],
              tips: 'models: 初始化数据',
              func_body: '',
              func_name: ''
            }
          }
        }
      },
      previewForm: {},
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
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
        },
        funcGetToken(resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        }
      },
      widgetModels: {
      },
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      vueTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small",
    "customClass": "",
    "ui": "element",
    "width": "100%",
    "events": {
            'created': {
              'args': [],
              'tips': '',
              'func_body': '',
              'func_name': ''
            },
            "onsubmit": {
              "args": ['models'],
              "tips": "models: 表单所有数据",
              "func_body": "",
              "func_name": ""
            },
            "mounted": {
              "args": ['models'],
              "tips": "models: 初始化时数据",
              "func_body": "",
              "func_name": ""
            }
          }
  }
}`,
      remoteFuncsNames: [],
      codeCopyValue: '',
      codeClipboard: null,
      codeActiveName: 'vue',
      undo: false,
      redo: false
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function(val) {
        // console.log(this.$refs.widgetForm)
      }
    },
    codeActiveName(val) {
      this.codeCopyValue = this.codeActiveName === 'vue' ? this.vueTemplate : this.htmlTemplate
    },
    '$lang': function(val) {
      this._loadComponents()
    }
  },
  created() {
    this._loadComponents()
    Object.keys(this.remoteFuncs).forEach(element => {
      this.remoteFuncsNames.push({ label: element, value: element })
    })
  },
  mounted() {
    const _this = this

    historyManager.clear().then(() => {
      EventBus.$on('on-history-add', () => {
        // console.log('xxx', this.widgetFormSelect)
        historyManager.add(this.widgetForm, (this.widgetFormSelect && this.widgetFormSelect.key) ? this.widgetFormSelect.key : '').then(() => {
          _this.undo = true
          _this.redo = false
        })
      })
    })
  },
  methods: {
    handleGoGithub() {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect(value) {
      this.configTab = value
    },
    handleMoveEnd(evt) {
      // console.log('end', evt)
    },
    handleMoveStart({ oldIndex }) {
      // console.log('start', oldIndex, this.basicComponents)
    },
    handleMove() {
      return true
    },
    handlePreview() {
      // console.log('2222', this.widgetForm)
      this.previewForm = _.cloneDeep(this.widgetForm)
      this.previewVisible = true
    },
    handleReset() {
      this.$refs.generateForm.reset()
    },
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        this.jsonVisible = true
        this.jsonTemplate = data
        this.$nextTick(() => {
          if (!this.jsonClipboard) {
            this.jsonClipboard = new Clipboard('.json-btn')
            this.jsonClipboard.on('success', (e) => {
              this.$message.success('复制成功')
            })
          }
          this.jsonCopyValue = JSON.stringify(data)
        })
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$message.error(e)
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson() {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      // console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode() {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html', this.widgetForm.config.ui)
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue', this.widgetForm.config.ui)
      this.$nextTick(() => {
        if (!this.codeClipboard) {
          this.codeClipboard = new Clipboard('.code-btn')
          this.codeClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.codeCopyValue = this.codeActiveName == 'vue' ? this.vueTemplate : this.htmlTemplate
      })
    },
    handleUpload() {
      this.uploadVisible = true
    },
    handleUploadJson() {
      try {
        this.setJSON(this.jsonEg)
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear() {
      this.widgetForm = {
        ...this.widgetForm,
        list: []
      }

      this.widgetFormSelect = {}
      this.$nextTick(() => {
        EventBus.$emit('on-history-add')
      })
    },
    clear() {
      this.handleClear()
    },
    getJSON() {
      return this.widgetForm
    },
    getHtml() {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON(json) {
      if (typeof json === 'string') {
        json = JSON.parse(json)
      }

      json.list.forEach(element => {
        if (!('name_model' in element)) {
          element['name_model'] = { label: eval('element.name'), prop: eval('element.model') }
        }
      })
      if (json.config.events === undefined) {
        json.config.events = {}
      }
      for (const [event_name, event] of Object.entries(this.widgetForm.config.events)) {
        if (!(event_name in json.config.events)) {
          json.config.events[event_name] = event
        } else {
          const tips = this.widgetForm.config.events[event_name].tips
          const args = this.widgetForm.config.events[event_name].args
          json.config.events[event_name].tips = tips
          json.config.events[event_name].args = args
        }
      }
      this.widgetForm = json

      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0]
      } else {
        this.widgetFormSelect = {}
      }
      this.$nextTick(() => { EventBus.$emit('on-history-add') })
    },
    handleInput(val) {
      // console.log(val)
      this.blank = val
    },
    handleField(item) {
      // console.log(item)
      EventBus.$emit('on-field-add', item)
    },
    handleUndo() {
      historyManager.updateLatest(this.widgetForm, (this.widgetFormSelect && this.widgetFormSelect.key) ? this.widgetFormSelect.key : '').then(() => {
        historyManager.undo().then((data) => {
          this.widgetForm = { ...data.data }
          this.widgetFormSelect = this._findWidgetItem(this.widgetForm.list, data.key)
          this.undo = data.undo
          this.redo = data.redo
        })
      })
    },
    handleRedo() {
      historyManager.redo().then((data) => {
        this.widgetForm = { ...data.data }
        this.widgetFormSelect = this._findWidgetItem(this.widgetForm.list, data.key)

        this.undo = data.undo
        this.redo = data.redo
      })
    },
    _findWidgetItem(list, key) {
      const index = list.findIndex(item => item.key === key)

      if (index >= 0) {
        return list[index]
      } else {
        for (let m = 0; m < list.length; m++) {
          const item = list[m]

          if (item.type === 'grid') {
            for (let i = 0; i < item.columns.length; i++) {
              return this._findWidgetItem(item.columns[i].list, key)
            }
          }
          if (item.type === 'table') {
            return this._findWidgetItem(item.tableColumns, key)
          }
          if (item.type === 'tabs') {
            for (let i = 0; i < item.tabs.length; i++) {
              return this._findWidgetItem(item.tabs[i].list, key)
            }
          }
        }

        return {}
      }
    },
    _loadComponents() {
      // this.basicComponents = this.basicComponents.map(item => {
      //   return {
      //     ...item,
      //     name: this.$t(`fm.components.fields.${item.type}`)
      //   }
      // })
      // this.advanceComponents = this.advanceComponents.map(item => {
      //   return {
      //     ...item,
      //     name: this.$t(`fm.components.fields.${item.type}`)
      //   }
      // })
      // this.layoutComponents = this.layoutComponents.map(item => {
      //   return {
      //     ...item,
      //     name: this.$t(`fm.components.fields.${item.type}`)
      //   }
      // })

      this.customComponents = this.customFields.map(item => {
        return {
          ...item,
          type: 'custom',
          icon: 'icon-zidingyi',
          options: { ...item.options }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './custom-fm.scss';
.widget-empty {
  background-position: 50%;
}

.custom1 .el-col {
  border: 1px solid #ccc;
  overflow: hidden;
  padding: 5px;
  // margin-right:-1px;
  // margin-bottom:-1px;
  margin-right: -1px;
  margin-bottom: -1px;
}
.custom .el-col {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
</style>
<style lang="scss" scoped>
.fm-icon {
  font-family: 'iconfont' !important;
}
</style>

