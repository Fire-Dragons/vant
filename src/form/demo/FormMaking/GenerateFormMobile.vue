<template>
  <div :style="{width: data.config.width}" class="fm-form">
    <van-form
      ref="generateForm"
      :key="formKey"
      :id="data.config.id?data.config.id:null"
      :class="{
        [data.config.customClass]: data.config.customClass?true: false,
        'no-label-form': data.config.labelWidth == 0
      }"
      :model="models"
      :label-width="data.config.labelWidth + 'px'"
      :rules="rules"
    >
      <template v-for="(item, index) in data.list">
        <generate-col-item
          v-if="item.type == 'grid'"
          :key="item.key"
          :model.sync="models"
          :element="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          :edit="!form_edit"
          :form-id="data.config.id"
          :design-fields="designFields"
          :helpers="helpers"
          :form-value="value"
          @input-change="onInputChange"
        >
          <template v-for="blank in blanks" v-slot:[blank.name]="scope">
            <slot :name="blank.name" :model="scope.model" />
          </template>
        </generate-col-item>

        <generate-tab-item
          v-else-if="item.type == 'tabs'"
          :key="item.key"
          :model.sync="models"
          :element="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          :edit="!form_edit"
          :form-id="data.config.id"
          :design-fields="designFields"
          :helpers="helpers"
          :form-value="value"
          @input-change="onInputChange"
        >
          <template v-for="blank in blanks" v-slot:[blank.name]="scope">
            <slot :name="blank.name" :model="scope.model" />
          </template>
        </generate-tab-item>

        <generate-report
          v-else-if="item.type == 'report'"
          :key="item.key"
          :model.sync="models"
          :element="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          :edit="!form_edit"
          :form-id="data.config.id"
          :design-fields="designFields"
          :helpers="helpers"
          :form-value="value"
          @input-change="onInputChange"
        >
          <template v-for="blank in blanks" v-slot:[blank.name]="scope">
            <slot :name="blank.name" :model="scope.model" />
          </template>
        </generate-report>

        <generate-form-item
          v-else
          :key="item.key"
          :models.sync="models"
          :widget="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          :edit="!form_edit"
          :form-id="data.config.id"
          :design-fields="designFields"
          :form-value="value"
          :helpers="helpers"
          @input-change="onInputChange"
        >
          <template v-for="blank in blanks" v-slot:[blank.name]="scope">
            <slot :name="blank.name" :model="scope.model" />
          </template>
        </generate-form-item>
      </template>
    </van-form>
  </div>
</template>

<script>
import GenerateFormItem from './Mobile/GenerateFormItem'
import GenerateColItem from './Mobile/GenerateColItem'
import GenerateTabItem from './Mobile/GenerateTabItem'
import GenerateReport from './Mobile/GenerateReport'

export default {
  name: 'GenerateFormMobile',
  components: {
    GenerateFormItem,
    GenerateColItem,
    GenerateTabItem,
    GenerateReport
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        'list': [],
        'config': {
          'labelWidth': 100,
          'labelPosition': 'right',
          'size': 'small',
          'customClass': '',
          'ui': 'element',
          'readOnly': false,
          'events': {
            'created': {
              'args': [],
              'tips': '',
              'func_body': '',
              'func_name': ''
            },
            'onsubmit': {
              'args': ['models'],
              'tips': 'models: 表单所有数据',
              'func_body': '',
              'func_name': ''
            },
            'mounted': {
              'args': ['models'],
              'tips': 'models: 初始化数据',
              'func_body': '',
              'func_name': ''
            }
          }
        }
      })
    },
    remote: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: true
    },
    designFields: {
      type: Array,
      default: function() {
        return []
      }
    },
    moduleInit: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      models: {},
      rules: {},
      blanks: [],
      displayFields: {},
      dataBindFields: [],
      generateShow: false,
      resetModels: {},
      formKey: new Date().getTime(),
      formValue: this.value,
      helpers: {
        nameModels: {},
        itemNameModels: {},
        refs: {},
        itemRefs: {},
        instances: {},
        itemInstances: {}
      },
      form_edit: !this.edit || this.data.config.readOnly
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this._initForm()
      }
    },
    models: {
      deep: true,
      handler(val) {
        Object.assign(this.formValue, val)
        // this.formValue = {...val}
      }
    }
  },
  created() {
    const events = this.data.config.events || {}
    if ('created' in events) {
      const event = events.created || {}
      const args = event.args || []
      const func_body = event.func_body || ''
      if (func_body !== '') {
        const func = new Function(args.toString(), func_body).bind(this)
        func(this.value)
      }
    }
    this._initForm()
  },
  mounted() {
    console.info(this.rules)
    this.helpers.generate = this
    this.helpers.generateForm = this.$refs['generateForm']
    const events = this.data.config.events || {}
    if ('mounted' in events) {
      const event = events.mounted || {}
      const args = event.args || []
      const func_body = event.func_body || ''
      if (func_body !== '') {
        const func = new Function(args.toString(), func_body).bind(this)
        func(this.value)
      }
    }
  },
  destroyed() {
    delete this.helpers.nameModels
    delete this.helpers.refs
    delete this.helpers.instances
    delete this.helpers.itemNameModels
    delete this.helpers.itemRefs
    delete this.helpers.itemInstances
  },
  methods: {
    _initForm() {
      if (Object.keys(this.data).length) {
        this.generateModel(this.data.list)
      } else {
        this.generateModel([])
      }

      this.resetModels = _.cloneDeep(this.models)
    },
    generateModel(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          this.displayFields[genList[i].model] = !genList[i].options.hidden

          genList[i].columns.forEach(item => {
            this.generateModel(item.list)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach(item => {
            this.generateModel(item.list)
          })

          this.displayFields[genList[i].model] = !genList[i].options.hidden
        } else if (genList[i].type === 'report') {
          genList[i].rows.forEach(row => {
            row.columns.forEach(column => {
              this.generateModel(column.list)
            })
          })

          this.displayFields[genList[i].model] = !genList[i].options.hidden
        } else {
          if (Object.keys(this.formValue).indexOf(genList[i].model) >= 0) {
            // 处理老版本没有dataBind值的情况，默认绑定数据
            if (Object.keys(genList[i].options).indexOf('dataBind') < 0 || genList[i].options.dataBind) {
              this.models[genList[i].model] = this.formValue[genList[i].model]
              // this.dataBindFields.push(genList[i].model)
            }

            this.displayFields[genList[i].model] = !genList[i].options.hidden

            if (genList[i].type === 'blank') {
              this.blanks.push({
                name: genList[i].model
              })
            }

            // 日期值如果是 Integer 类型转换成字符串
            if (genList[i].type === 'date') {
              if (Number.isInteger(this.models[genList[i].model])) {
                this.models[genList[i].model] = this.models[genList[i].model].toString()
              }
            }
          } else {
            if (genList[i].type === 'blank') {
              // 处理老版本没有dataBind值的情况，默认绑定数据
              if (Object.keys(genList[i].options).indexOf('dataBind') < 0 || genList[i].options.dataBind) {
                this.models[genList[i].model] = genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : [])
                // this.dataBindFields.push(genList[i].model)
              }
              this.displayFields[genList[i].model] = !genList[i].options.hidden

              this.blanks.push({
                name: genList[i].model
              })

              // 日期值如果是 Integer 类型转换成字符串
              if (genList[i].type === 'date') {
                if (Number.isInteger(this.models[genList[i].model])) {
                  this.models[genList[i].model] = this.models[genList[i].model].toString()
                }
              }
            } else {
              if (Object.keys(genList[i].options).indexOf('dataBind') < 0 || genList[i].options.dataBind) {
                this.models[genList[i].model] = genList[i].type === 'table' ? [] : genList[i].options.defaultValue
                // this.dataBindFields.push(genList[i].model)
              }
              this.displayFields[genList[i].model] = !genList[i].options.hidden

              // 日期值如果是 Integer 类型转换成字符串
              if (genList[i].type === 'date') {
                if (Number.isInteger(this.models[genList[i].model])) {
                  this.models[genList[i].model] = this.models[genList[i].model].toString()
                }
              }
            }
          }

          genList[i].tableColumns && genList[i].tableColumns.length && genList[i].tableColumns.forEach(item => {
            if (item.type === 'blank') {
              this.blanks.push({
                name: item.model
              })
            }

            // 处理 rules
            if (this.rules[`${genList[i].model}.${item.model}`]) {
              this.rules[`${genList[i].model}.${item.model}`] = [
                ...this.rules[`${genList[i].model}.${item.model}`],
                ...item.rules.map(im => {
                  if (im.pattern) {
                    return { ...im, pattern: eval(im.pattern) }
                  } else {
                    return { ...im }
                  }
                })
              ]
            } else {
              this.rules[`${genList[i].model}.${item.model}`] = [
                ...item.rules.map(im => {
                  if (im.pattern) {
                    return { ...im, pattern: eval(im.pattern) }
                  } else {
                    return { ...im }
                  }
                })
              ]
            }
          })
          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
              if (item.pattern) {
                return { ...item, pattern: eval(item.pattern) }
              } else {
                return { ...item }
              }
            })]
          } else {
            this.rules[genList[i].model] = [...genList[i].rules.map(item => {
              if (item.pattern) {
                return { ...item, pattern: eval(item.pattern) }
              } else {
                return { ...item }
              }
            })]
          }
        }
      }
    },
    _setDisabled(genList, fields, disabled) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this._setDisabled(item.list, fields, disabled)
          })
        } else if (genList[i].type === 'tabs') {
          genList[i].tabs.forEach(item => {
            this._setDisabled(item.list, fields, disabled)
          })
        } else if (genList[i].type == 'report') {
          genList[i].rows.forEach(row => {
            row.columns.forEach(column => {
              this._setDisabled(column.list, fields, disabled)
            })
          })
        } else {
          if (fields.indexOf(genList[i].model) >= 0) {
            this.$set(genList[i].options, 'disabled', disabled)
          }
        }
      }
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate().then(() => {
          const resData = {}
          const models = JSON.parse(JSON.stringify(this.formValue))
          Object.keys(models).forEach(key => {
            if (key in this.displayFields && this.displayFields[key]) {
              resData[key] = models[key]
            } else {
              resData[key] = models[key]
            }
          })
          const events = this.data.config.events || {}
          if ('onsubmit' in events) {
            const event = events.onsubmit || {}
            const args = event.args || []
            const func_body = event.func_body || ''
            if (func_body !== '') {
              const func = new Function(args.toString(), func_body).bind(this)
              const errmsg = func(resData)
              if (errmsg) {
                reject(new Error(errmsg).message)
              }
            }
          }
          resolve(JSON.parse(JSON.stringify(resData)))
        }).catch(e => {
          // reject(new Error('表单数据校验失败').message)
        })
      })
    },
    reset() {
      // this.$refs.generateForm.resetFields()
      this.setData(_.cloneDeep(this.resetModels))
      this.formKey = new Date().getTime()
    },
    onInputChange(value, field) {
      // console.log('******', field, value, this.models)
      this.$emit('on-change', field, value, this.models)
      this.$emit(`on-${field}-change`, value)
    },
    display(fields) {
      Object.keys(this.displayFields).forEach(key => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, true)
        }
      })
      this.displayFields = { ...this.displayFields }
    },
    hide(fields) {
      Object.keys(this.displayFields).forEach(key => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, false)
        }
      })
      this.displayFields = { ...this.displayFields }
    },
    disabled(fields, disabled) {
      this._setDisabled(this.data.list, fields, disabled)
    },
    refresh() {},
    setData(value) {
      this.models = { ...this.models, ...value }
    }
  }
}
</script>

<style lang="scss">
</style>
