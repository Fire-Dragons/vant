<template>
  <span>
    <template v-if="widget.type == 'blank'">
      <div :style="{width: isTable ? '100%' : widget.options.width}">
        <slot :name="widget.model" :model="dataModels" :ref="widget.model" />
      </div>
    </template>

    <template v-if="widget.type == 'component'">
      <div :style="{width: isTable ? '100%' : widget.options.width}">
        <component :is="widget.options.isQuote ? widget.options.name : `component-${widget.key}-${key}`" :key="key" v-model="dataModel" :ref="widget.model" />
      </div>
    </template>

    <template v-if="widget.type == 'custom'">
      <div :style="{width: isTable ? '100%' : widget.options.width}">
        <component
          :ref="widget.model"
          :is="widget.el"
          v-model="dataModel"
          :width="widget.options.width"
          :height="widget.options.height"
          :placeholder="widget.options.placeholder"
          :readonly="widget.options.readonly"
          :disabled="!edit || isDisable"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
        />
      </div>
    </template>

    <template v-if="widget.type == 'input'">
      <template v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'">
        <el-input
          :id="id"
          :ref="widget.model"
          v-model.number="dataLabel"
          :disabled="!edit || isDisable"
          :placeholder="widget.options.placeholder"
          :show-password="widget.options.showPassword"
          :style="{width: isTable ? '100%' : widget.options.width}"
          :class="textPosition"
          type="number"
          @blur="events['blur']"
          @focus="events['focus']"
          @change="events['change']"
          @input="onInput"
        >
          <template v-if="fieldUnit" slot="append">{{ fieldUnit }}</template>
        </el-input>
        <!-- <div v-if="widget.options.dataType == 'money' && dataLabel && widget.options.uppercase" class="tips">{{ Capitalization | toChies }}</div> -->
      </template>
      <template v-else-if="widget.options.dataType == 'money'">
        <el-input
          :id="id"
          :ref="widget.model"
          v-model.number="dataLabel"
          :disabled="!edit || isDisable"
          :placeholder="widget.options.placeholder"
          :show-password="widget.options.showPassword"
          :style="{width: isTable ? '100%' : widget.options.width}"
          :class="textPosition"
          @blur="events['blur']"
          @focus="events['focus']"
          @change="events['change']"
          @input="onInputMoney"
        >
          <template v-if="fieldUnit" slot="append">{{ fieldUnit }}</template>
        </el-input>
        <div v-if="dataLabel && widget.options.uppercase" class="tips">{{ Capitalization | toChies }}</div>
      </template>

      <el-input
        v-else
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :type="widget.options.dataType"
        :disabled="!edit || isDisable"
        :placeholder="widget.options.placeholder"
        :show-password="widget.options.showPassword"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :class="textPosition"
        @blur="events['blur']"
        @focus="events['focus']"
        @change="events['change']"
      >
        <template v-if="fieldUnit" slot="append">{{ fieldUnit }}</template>
      </el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :rows="5"
        :disabled="!edit || isDisable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        type="textarea"
        @blur="events['blur']"
        @focus="events['focus']"
        @change="events['change']"
      />
    </template>

    <template v-if="widget.type == 'number'">
      <div class="fm-nuit-box">
        <el-input-number
          :id="id"
          :ref="widget.model"
          v-model="dataModel"
          :style="{width: isTable ? '100%' : widget.options.width}"
          :step="widget.options.step"
          :disabled="!edit || isDisable"
          controls-position="right"
          @blur="events['blur']"
          @focus="events['focus']"
          @change="events['change']"
        />
        <span v-if="widget.options.unit" class="fm-unit">{{ widget.options.unit }}</span>
      </div>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || isDisable"
        @change="events['change']"
      >
        <el-radio
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || isDisable"
        @change="events['change']"
      >
        <el-checkbox

          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :id="id"
        :ref="widget.model"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="!edit || isDisable"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrow-control="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: isTable ? '100%' : widget.options.width}"
        @change="events['change']"
      />
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :id="id"
        :ref="widget.model"
        :default-value="widget.options.defaultValue"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="!edit || isDisable"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: isTable ? '100%' : widget.options.width}"
        @change="events['change']"
      />
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="!edit || isDisable"
        :allow-half="widget.options.allowHalf"
        :show-score="widget.options.showScore"
        @change="events['change']"
      />
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :disabled="!edit || isDisable"
        :show-alpha="widget.options.showAlpha"
        @change="events['change']"
      />
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :ref="widget.model"
        :id="id"
        v-loadmore="loadMore"
        :disabled="!edit || isDisable"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :filterable="widget.options.filterable"
        :remote="widget.options.remoteSearch"
        :remote-method="remoteMethod"
        :loading="searchLoading"
        @blur="events['blur']"
        @focus="events['focus']"
        @change="events['change']"
        @clear="events['clear']"
      >
        <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value" />
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :disabled="!edit || isDisable"
        @change="events['change']"
      />
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="!edit || isDisable"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :format-tooltip="formatTooltip"
        :style="{width: isTable ? '100%' : widget.options.width}"
        @change="events['change']"
        @input="events['input']"
      />
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :ref="widget.model"
        :disabled="!edit || isDisable"
        :style="{'width': isTable ? '100%' : widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :id="id"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :limit="widget.options.limit"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
      />
    </template>

    <template v-if="widget.type == 'editor'">
      <fm-editor
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :sty="{width: isTable ? '100%' : widget.options.width, cursor: (!edit || isDisable) ? 'no-drop' : '', backgroundColor: (!edit || isDisable) ? '#F5F7FA' : ''}"
        :toolbar="widget.options.customToolbar"
        :disabled="!edit || isDisable"
        class="fm-editor"
      />
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :disabled="!edit || isDisable"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :options="widget.options.remoteOptions"
        :filterable="widget.options.filterable"
        :props="cascaderProp"
      />
    </template>

    <template v-if="widget.type == 'text'">
      <span :id="id" :ref="widget.model">{{ dataModel }}</span>
    </template>

    <template v-if="widget.type == 'html'">
      <span v-html="dataModel" :ref="widget.model" />
    </template>

    <template v-if="widget.type == 'table'">
      <fm-form-table
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :columns="widget.tableColumns"
        :models="dataModels"
        :remote="remote"
        :blanks="blanks"
        :disabled="!edit || isDisable"
        :widget="widget"
        :helpers="helpers"
      >
        <template v-for="blank in blanks" v-slot:[blank.name]="scope">
          <slot :name="blank.name" :model="scope.model" />
        </template>
      </fm-form-table>
    </template>

    <template v-if="widget.type == 'innerobject'">
      <fm-form-innerobject
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :models="dataModels"
        :remote="remote"
        :blanks="blanks"
        :disabled="!edit || isDisable"
        :widget="widget"
        :helpers="helpers"
      >
        <template v-for="blank in blanks" v-slot:[blank.name]="scope">
          <slot :name="blank.name" :model="scope.model" />
        </template>
      </fm-form-innerobject>
    </template>

    <template v-if="widget.type == 'outerobject'">
      <fm-form-outerobject
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :models="dataModels"
        :remote="remote"
        :blanks="blanks"
        :disabled="!edit || isDisable"
        :widget="widget"
        :helpers="helpers"
        :design-fields="designFields"
        :form-value="formValue"
      >
        <template v-for="blank in blanks" v-slot:[blank.name]="scope">
          <slot :name="blank.name" :model="scope.model" />
        </template>
      </fm-form-outerobject>
    </template>

    <template v-if="widget.type == 'fileupload'">

      <fm-file-upload
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :action="widget.options.action"
        :width="isTable ? '100%' : widget.options.width"
        :disabled="!edit || isDisable"
        :limit="widget.options.limit"
        :tip="widget.options.tip"
        :multiple="widget.options.multiple"
      />
    </template>

    <div v-if="widget.type == 'carousel'" class="cascader-box">
      <carousel
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :height="widget.options.height"
        :trigger="widget.options.trigger"
        :arrow="widget.options.arrow"
        :direction="widget.options.direction"
        :list="widget.options.list"
      />
    </div>
    <div v-if="widget.type == 'select2'">
      <select-table
        :id="id"
        :ref="widget.model"
        v-model="dataModel"
        :multiple="widget.options.multiple"
        :proj_code="widget.options.proj_code"
        :object_code="widget.options.object_code"
        :page_code="widget.options.page_code"
        :option="widget.options.option"
        :widget="widget"
        :disabled="!edit || isDisable"
        @change="events['change']"
      />
    </div>
  </span>
</template>

<script>
import FmUpload from './Upload'
import FmFormTable from './FormTable'
import FmFileUpload from './Upload/file'
import carousel from './Upload/carousel'
import FmEditor from './Editor'
import Vue from 'vue'
import selectTable from './select2'
// import FmFormInnerobject from './FormObject/innerObject'
// import FmFormOuterobject from './FormObject/outerObject'

export default {
  name: 'GenerateElementItem',
  components: {
    FmUpload,
    FmFormTable,
    FmFileUpload,
    carousel,
    FmEditor,
    selectTable,
    // FmFormInnerobject,
    // FmFormOuterobject
  },
  filters: { // 局部过滤器
    toChies: function(amount) {
      const negative = amount.toString().slice(0,1) === '-'
      const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'] // 汉字的数字
      const cnIntRadice = ['', '拾', '佰', '仟'] // 基本单位
      const cnIntUnits = ['', '万', '亿', '兆'] // 对应整数部分扩展单位
      const cnDecUnits = ['角', '分'] // 对应小数部分单位
      const cnInteger = '整' // 整数金额时后面跟的字符
      const cnIntLast = '元' // 整型完以后的单位
      const maxNum = 9999999999999999.99 // 最大处理的数字
      let integerNum // 金额整数部分
      let decimalNum // 金额小数部分
      let chineseStr = '' // 输出的中文金额字符串
      let parts // 分离金额后用的数组，预定义
      if (amount === '') {
        return ''
      }
      amount = parseFloat(amount)
      if (amount >= maxNum) {
        // 超出最大处理数字
        return ''
      }
      if (amount === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger
        return chineseStr
      }
      if (negative) {
        amount = amount.toString().slice(1)
      }
      // 转换为字符串
      amount = amount.toString()
      if (amount.indexOf('.') === -1) {
        integerNum = amount

        decimalNum = ''
      } else {
        parts = amount.split('.')
        integerNum = parts[0]
        decimalNum = parts[1].substr(0, 4)
      }
      // 获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        let zeroCount = 0
        const IntLen = integerNum.length
        for (let i = 0; i < IntLen; i++) {
          const n = integerNum.substr(i, 1)
          const p = IntLen - i - 1
          const q = p / 4
          const m = p % 4
          if (n === '0') {
            zeroCount++
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0]
            }
            // 归零
            zeroCount = 0
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
          }
          if (m === 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q]
          }
        }
        chineseStr += cnIntLast
      }
      // 小数部分
      if (decimalNum !== '') {
        const decLen = decimalNum.length
        for (let i = 0; i < decLen; i++) {
          const n = decimalNum.substr(i, 1)
          if (n !== '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i]
          }
        }
      }
      if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger
      } else if (decimalNum === '') {
        chineseStr += cnInteger
      }
      if (negative) {
        chineseStr = '负' + chineseStr
      }
      return chineseStr
    }
  },
  props: ['widget', 'value', 'models', 'remote', 'isTable', 'blanks', 'edit', 'id', 'rules', 'designFields', 'helpers', 'formValue'],
  data() {
    const that = this
    return {
      dataModel: this.value,
      dataModels: { ...this.models },
      moneyUnit: '',
      text: null,
      searchLoading: false,
      event_names: ['change', 'blur', 'focus', 'input', 'clear'],
      events: {},
      key: new Date().getTime(),
      tableColumns: [],
      dataLabel: null,
      isDisable: this.widget.options.disabled,
      cascaderProp: {
        emitPath: this.widget.options.emitPath,
        checkStrictly: true,
        lazy: this.widget.options.lazy,
        lazyLoad (node, resolve) {
          that.loadChild(node, resolve)
        }
      },
      fieldUnit: this.widget.options.unit,
      conversion: this.widget.options.conversion,
      textPosition: 'input_text_' + this.widget.options.textPosition
    }
  },
  computed: {
    Capitalization() {
      let total = this.dataLabel
      if (!this.edit || this.isDisable) {
        total = this.dataModel
      }
      if (this.widget.options.dataType === 'money') {
        if (this.moneyUnit) {
          total *= this.moneyUnit
          return total
        } else {
          total *= 1
          return total
        }
      }
    }
  },
  watch: {
    value(val) {
      this.dataModel = val
    },
    dataModel(val) {
      let value = null
      if (val) {
        value = val
      }
      this.$emit('input', value)
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModels = this.models
      }
    },
    dataModels: {
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model]
        this.$emit('update:models', val)
      }
    }
  },
  created() {
    if (this.widget.type === 'table') {
      if (JSON.stringify(this.widget.tableColumns) === '[]' && this.designFields) {
        this.designFields.forEach(item => {
          if (item.prop === this.widget.model) {
            this.widget.uselist = item.uselist
            if (item.object_form && !Array.isArray(item.object_form)) {
              this.widget.tableColumns = JSON.parse(item.object_form).list
            }
          }
        })
      }
    }
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.getRemoteData()
    } else {
      if (this.widget.options.required && this.widget.type === 'select') {
        if (this.widget.options.multiple && (this.widget.options.defaultValue.length < 1 || this.dataModel.length < 1)) {
          this.dataModel.push(this.widget.options.options[0].value)
        } else {
          if (!this.widget.options.defaultValue && !this.dataModel) {
            this.dataModel = this.widget.options.options[0].value
          }
        }
      }
      if (this.widget.type === 'select' && this.dataModel) {
        if (Number.isFinite(this.dataModel)) {
          this.dataModel = this.dataModel.toString()
        }
      }
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }

    if (this.widget.type === 'input' && (this.widget.options.dataType === 'number' || this.widget.options.dataType === 'integer' || this.widget.options.dataType === 'float' || this.widget.options.dataType === 'money')) {
      if (this.conversion) {
        if (this.dataModel) {
          this.dataLabel = this.dataModel / this.conversion.replace('*', '')
          if (this.widget.options.defaultValue) {
            this.dataLabel = this.widget.options.defaultValue
            this.dataModel = this.widget.options.defaultValue * this.conversion.replace('*', '')
          }
        } else {
          this.dataLabel = this.dataModel
        }
      } else {
        this.dataLabel = this.dataModel
      }
      if (this.widget.options.dataType === 'money') {
        this.moneyUnit = this.conversion.replace('*', '')
        if (!this.edit || this.isDisable) {
          const val = Number(this.dataLabel)
          this.dataLabel = val.toLocaleString()
        }

      }
    }

    const events = this.widget.options.events || {}
    for (var index in this.event_names) {
      const event_name = this.event_names[index]
      const event = events[event_name] || {}
      const args = event.args || []
      const func_body = event.func_body || ''
      const func = new Function(args.toString(), func_body)
      this.events[event_name] = func.bind(this)
      // this.events[event_name] = func
    }

    if (this.widget.type === 'component' && !this.widget.options.isQuote) {
      Vue.component(`component-${this.widget.key}-${this.key}`, {
        template: `<span>${this.widget.options.template}</span>`,
        props: ['value'],
        data: () => ({
          dataModel: this.value
        }),
        watch: {
          dataModel(val) {
            if (this.ui === 'antd') {
              Vue.prototype.$Utils.EventBus.$emit('on-field-change', this.$attrs.id, val)
            } else {
              this.$emit('input', val)
            }
          },
          value(val) {
            this.dataModel = val
          }
        }
      })
      // 如果不是在主应用中打开表单生成器，需先把要注册的信息传入子应用后再注册
      if (this.$actions) {
        const data = {
          name: `component-${this.widget.key}-${this.key}`,
          component: `<span>${this.widget.options.template}</span>`,
          props: ['value'],
          value: this.value
        }
        this.$actions.setGlobalState({
          showComponent: data
        })
      }
    }

    if (this.widget.options.defaultValue) {
      let value = this.widget.options.defaultValue
      if (Array.isArray(value)) {
        value = this.widget.options.defaultValue
        if (this.widget.options.multiple || this.widget.type === 'checkbox' || (this.widget.type === 'cascader' && this.widget.options.emitPath)) {
          this.dataModel = []
          for (var i = 0; i < value.length; i++) {
            if (value[i] && value[i].toString().match(/##(\S*)##/)) {
              this.dataModel.push(eval(value[i].match(/##(\S*)##/)[1]))
            } else {
              this.dataModel.push(value[i])
            }
          }
        }
      } else {
        if (this.dataModel && !this.dataModel.toString().match(/##(\S*)##/)) {
          this.dataModel = this.dataModel
        } else {
          value = this.widget.options.defaultValue
          if (value && value.toString().match(/##(\S*)##/)) {
            this.dataModel = eval(value.match(/##(\S*)##/)[1])
          } else {
            this.dataModel = value
          }
        }
      }
    }
    if (this.widget.type === 'select' || this.widget.type === 'radio' || this.widget.type === 'checkbox') {
      if (this.widget.options.remote) {
        for (var i = 0; i < this.widget.options.remoteOptions.length; i++) {
          if (this.widget.options.remoteOptions[i].value && this.widget.options.remoteOptions[i].value.match(/##(\S*)##/)) {
            this.widget.options.remoteOptions[i].value = eval(this.widget.options.remoteOptions[i].value.match(/##(\S*)##/)[1])
          }
          if (this.widget.options.remoteOptions[i].label && this.widget.options.remoteOptions[i].label.match(/##(\S*)##/)) {
            this.widget.options.remoteOptions[i].label = eval(this.widget.options.remoteOptions[i].label.match(/##(\S*)##/)[1])
          }
        }
      } else {
        for (var i = 0; i < this.widget.options.options.length; i++) {
          if (this.widget.options.options[i].value && this.widget.options.options[i].value.match(/##(\S*)##/)) {
            this.widget.options.options[i].value = eval(this.widget.options.options[i].value.match(/##(\S*)##/)[1])
          }
          if (this.widget.options.options[i].label && this.widget.options.options[i].label.match(/##(\S*)##/)) {
            this.widget.options.options[i].label = eval(this.widget.options.options[i].label.match(/##(\S*)##/)[1])
          }
        }
      }
    }
    if (this.widget.type === 'cascader') {
      for (var i = 0; i < this.widget.options.remoteOptions.length; i++) {
        if (this.widget.options.remoteOptions[i].value && this.widget.options.remoteOptions[i].value.match(/##(\S*)##/)) {
          this.widget.options.remoteOptions[i].value = eval(this.widget.options.remoteOptions[i].value.match(/##(\S*)##/)[1])
        }
        if (this.widget.options.remoteOptions[i].label && this.widget.options.remoteOptions[i].label.match(/##(\S*)##/)) {
          this.widget.options.remoteOptions[i].label = eval(this.widget.options.remoteOptions[i].label.match(/##(\S*)##/)[1])
        }
      }
    }

    if (this.widget.type === 'date' && this.widget.options.defaultValue && this.widget.options.type !== 'dates') {
      if (this.dataModel.indexOf('T') !== -1) {
        this.dataModel = this.$Utils.util.formatDate(new Date(), this.widget.options.format)
      } else {
        this.dataModel = this.dataModel
      }
    }
  },
  mounted() {
    this.helpers.nameModels[this.widget.model] = this.widget.name
    this.helpers.instances[this.widget.model] = this
    Object.assign(this.helpers.refs, this.$refs)
  },
  destroyed() {
  },
  methods: {
    getRemoteData() {
      return new Promise((resolve, reject) => {
        let uri = ''
        let page = true
        const page_index = 1
        const newParams = { text: text, page_index: page_index }
        let page_size = 10
        const text = null
        if (this.widget.options.remoteUri) {
          // 判断是否开启分页
          uri = this.widget.options.remoteUri

          const params = uri.split('?')[1] || ''
          uri = uri.split('?')[0]
          const paramArr = params.split('&')
          for (let i = 0; i < paramArr.length; i++) {
            const str = paramArr[i].split('=')
            newParams[str[0]] = str[1]
          }
          if (this.widget.options.pagination) {
            page = true
            page_size = this.widget.options.pageSize
          } else {
            page = false
          }
          if (this.widget.options.remoteParams) {
            const uriParams = JSON.parse(this.widget.options.remoteParams)
            Object.assign(newParams, uriParams)
          }
        }
        newParams['page'] = page
        newParams['page_size'] = page_size
        async function remote_http(uri, newParams) {
          const response = await _that.remote[_that.widget.options.remoteFunc](uri, newParams)
          if (response) {
            var data = response
            if (_that.widget.options.remoteData) {
              data = eval(_that.widget.options.remoteData)
              if (_that.widget.options.pagination && _that.widget.options.pageCount) {
                _that.widget.options.pageCount = response.payload.pagination.pages
              }
            }
            _that.widget.options.remoteOptions = data.map(item => {
              if (_that.widget.type !== 'cascader') {
                return {
                  value: item[_that.widget.options.props.value],
                  label: item[_that.widget.options.props.label]
                }
              } else {
                // return item
                if (_that.widget.options.lazy) {
                  return {
                    value: item[_that.widget.options.props.value],
                    label: item[_that.widget.options.props.label]
                  }
                } else {
                  return {
                    value: item[_that.widget.options.props.value],
                    label: item[_that.widget.options.props.label],
                    children: _that.processRemoteProps(item[_that.widget.options.props.children], _that.widget.options.props)
                  }
                }
              }
            })
            if (_that.widget.options.required && _that.widget.type === 'select') {
              if (_that.widget.options.multiple && (_that.widget.options.defaultValue.length < 1 || _that.dataModel.length < 1)) {
                _that.dataModel.push(_that.widget.options.remoteOptions[0].value)
              } else {
                if (!_that.widget.options.defaultValue && !_that.dataModel) {
                  _that.dataModel = _that.widget.options.remoteOptions[0].value
                }
              }
            }
          }
        }
        const _that = this
        remote_http(uri, newParams).then(() => {
          resolve(_that.dataModel)
        })
      })
    },
    loadChild(node, resolve) {
      if (node.value) {
        if (!this.widget.options.primary) {
          this.$alert('请配置需要动态加载数据的主键', '提示', {
            confirmButtonText: '确定'
          })
          resolve([])
          return
        }
        let uri = this.widget.options.remoteUri
        const newParams = {}
        const params = uri.split('?')[1] || ''
        if (params) {
          uri = uri.split('?')[0]
          const paramArr = params.split('&')
          for (let i = 0; i < paramArr.length; i++) {
            const str = paramArr[i].split('=')
            newParams[str[0]] = str[1]
          }
          if (this.widget.options.remoteParams) {
            const uriParams = JSON.parse(this.widget.options.remoteParams)
            Object.assign(newParams, uriParams)
          }
        }
        this.$set(newParams, this.widget.options.primary, node.data.value)

        this.$Utils.request({
          url: uri,
          method: 'get',
          params: newParams
        }).then(response => {
          if (response.code === 200) {
            var data = response
            if (this.widget.options.remoteData) {
              data = eval(this.widget.options.remoteData)
              setTimeout(() => {
                const nodes = data
                  .map(item => ({
                    value: item[this.widget.options.props.value],
                    label: item[this.widget.options.props.label]
                  }))
                resolve(nodes)
              }, 1000)
            }
          } else {
            resolve([])
          }
        })
      }
    },
    processRemoteProps(children, props) {
      if (children && children.length) {
        return children.map(item => {
          if (this.processRemoteProps(item[props.children], props).length) {
            return {
              value: item[props.value],
              label: item[props.label],
              children: this.processRemoteProps(item[props.children], props)
            }
          } else {
            return {
              value: item[props.value],
              label: item[props.label]
            }
          }
        })
      } else {
        return []
      }
    },
    onInput(val) {
      // if (this.widget.options.dataType === 'money' && (this.widget.options.conversion === '' || this.widget.options.conversion === '*1')) {
      //   this.dataLabel = val.replace(/^(\-)*(\d*)\.(\d\d).*$/, '$1$2.$3')
      //   this.dataModel = val * 1
      // }
      if (this.widget.options.conversion) {
        this.dataLabel = val
        this.dataModel = val * this.widget.options.conversion.replace('*', '')
      } else {
        this.dataModel = val * 1
      }
    },
    onInputMoney(value) {
      const val = value.replace(/[^(\-)\d^\.]/g,'')
      if (this.widget.options.conversion === '' || this.widget.options.conversion === '*1') {
        this.dataLabel = val.replace(/^(\-)*(\d*)\.(\d\d).*$/, '$1$2.$3')
        this.dataModel = val * 1
      }
      if (this.widget.options.conversion) {
        this.dataLabel = val
        this.dataModel = val * this.widget.options.conversion.replace('*', '')
      } else {
        this.dataModel = val * 1
      }
    },
    loadMore() {
      if (this.widget.options.pagination) {
        this.widget.options.pageIndex++
        if (this.widget.options.pageIndex <= this.widget.options.pageCount) {
          this.getList()
        }
      }
    },
    getList() {
      var uri = this.widget.options.remoteUri || ''
      const newParams = { page: true, page_index: this.widget.options.pageIndex, page_size: this.widget.options.pageSize, text: this.text }
      if (uri) {
        const params = uri.split('?')[1] || ''
        uri = uri.split('?')[0]
        const paramArr = params.split('&')
        for (let i = 0; i < paramArr.length; i++) {
          const str = paramArr[i].split('=')
          newParams[str[0]] = str[1]
        }
        if (this.widget.options.remoteParams) {
          const uriParams = JSON.parse(this.widget.options.remoteParams)
          Object.assign(newParams, uriParams)
        }
      }
      this.remote[this.widget.options.remoteFunc](uri, newParams).then(response => {
        var data = response
        if (data) {
          if (this.widget.options.remoteData) {
            data = eval(this.widget.options.remoteData)
          }
          const res = data.map(item => {
            return {
              value: item[this.widget.options.props.value],
              label: item[this.widget.options.props.label]
            }
          })
          this.widget.options.remoteOptions.push(...res)
        }
        this.searchLoading = false
      })
    },
    remoteMethod(query) {
      if (this.widget.options.remoteSearch) {
        if (query !== '') {
          this.text = query
          this.widget.options.pageIndex = 0
          this.widget.options.remoteOptions = []
          this.searchLoading = true
          setTimeout(() => {
            this.loadMore()
          }, 200)
        } else {
          this.text = null
          this.widget.options.pageIndex = 1
          this.widget.options.remoteOptions = []
          this.searchLoading = true
          this.getList()
        }
      }
    },
    formatTooltip(val) {
      return val + this.widget.options.unit
    }
  }
}
</script>
<style lang="scss">
.input_text_left input {
  text-align: left;
}
.input_text_right input {
  text-align: right;
}
.input_text_center input {
  text-align: center;
}
</style>
