// Utils
import { createNamespace, isObject } from '../utils';
import { FieldMixin } from '../mixins/field';

// Components
import Cell from '../cell';
import Field from '../field';
import Popup from '../popup';
import Icon from '../icon';
import CellGroup from '../cell-group';
import Loading from '../loading';

const [createComponent, bem, t] = createNamespace('cell-cascader');

function noop() {}

export default createComponent({

  mixins: [FieldMixin],

  inject: {
    vanForm: {
      default: null,
    },
  },

  props: {
    showLabel: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 顶级数据
    columns: {
      type: Array,
      default: () => { return [] }
    },
    rules: Array,
    safeAreaInsetBottom: Boolean,
    props: {
      type: Object,
      default: () => {
        return {
          lazy: false,
          lazyLoad: noop,
          value: 'value',
          label: 'label',
          children: 'children'
        }
      }
    },
    // 保存值为数组时
    emitPath: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      readonly: true,
      showPicker: false,
      value: null,
      showValue: null,
      selectDatas: [],
      lastSelectValue: null,
      options: [],
      level: 1,
      cache: {},
      loading: false
    };
  },

  computed: {
    childrenKey() {
      return this.props.children || 'children'
    },
    valueKey() {
      return this.props.value || 'value'
    },
    labelKey() {
      return this.props.label || 'label'
    },
  },

  watch: {
    value(val, oldValue) {
    },
    columns: {
      deep: true,
      handler(val) {
        this.options = val
      }
    },
  },

  created() {

  },

  methods: {
    getDatas(node, levelNotChange) {
      this.loading = true
      const resolve = dataList => {
        this.cache[this.level] = this.options
        if (dataList && Array.isArray(dataList) && dataList.length > 0) {
          this.options = dataList
          if (!levelNotChange) {
            this.level += 1
          }
        }
        this.loading = false
      };
      let { level } = this
      if (!levelNotChange) {
        level += 1
      }
      if (level in this.cache) {
        const dataList = this.cache[level]
        Object.keys(this.cache).forEach(element => {
          if (element > this.level) {
            delete this.cache[element]
          }
        })
        resolve(dataList)
      } else if (this.props.lazy) {
          this.props.lazyLoad(node, resolve);
      } else {
        const dataList = node[this.childrenKey]
        resolve(dataList)
      }
    },

    handleCheck(item, index) {
      const count = this.selectDatas.length
      if (count !== this.level) {
        const value = {}
        value[this.labelKey] = item[this.labelKey]
        value[this.valueKey] = item[this.valueKey]
        this.selectDatas.push(value)
      } else {
        this.selectDatas[this.selectDatas.length - 1][this.labelKey] = item[this.labelKey]
        this.selectDatas[this.selectDatas.length - 1][this.valueKey] = item[this.valueKey]
      }
      this.lastSelectValue = item[this.valueKey]
      this.getDatas(item)
    },

    changeCheck(item, index) {
      this.lastSelectValue = item.value
      const _index = index + 1
      const _num = this.selectDatas.length - 1
      this.selectDatas.splice(_index, _num)
      if (index === _num && this.level === this.selectDatas.length) {
        return
      }
      if (index === 0) {
        this.options = this.columns
        this.level = 1
      } else {
        const _item = this.selectDatas[index - 1]
        this.level = this.selectDatas.length
        this.getDatas(_item, true)
      }
    },

    onClick(event) {
      this.$emit('click', event)
      if (this.level in this.cache) {
        this.options = this.cache[this.level]
      }
      this.showPicker = true
    },

    checkOption() {
      const _data = this.selectDatas.map(item => {
        return item[this.labelKey]
      })
      const _model = this.selectDatas.map(item => {
        return item[this.valueKey]
      })
      this.showValue = _data.join('/')
      if (this.emitPath) { // 保存值为数组时
        this.value = _model
      } else {
        this.value = _model[_model.length - 1]
      }
      this.CancelClick()
    },

    CancelClick() {
      this.showPicker = false
      this.selectDatas = []
      this.lastSelectValue = null
      this.level = 1
      this.options = []
    },

    genLoading() {
      if (this.loading) {
        const color = "#1989fa"
        return (
          <div class="cell-overlay">
            <Loading color={color} />
          </div>

      )
      }
    },

    genTitle(item) {
      let label = item[this.labelKey]
      if (!this.showLabel && item[this.valueKey]) {
        label = item[this.valueKey]
      }
      return (<span>{label}</span>)
    },

    genRightIcon(item) {
      const color = "#ff5514"
      const size = "16"
      const name = "success"
      if (this.lastSelectValue === item.value) {
        return (<Icon name={name} color={color} size={size} />)
      }
    },

    genConfirm() {
      return (
        <button
          type="button"
          class={bem('confirm')}
          onClick={this.checkOption}>
          确认
        </button>
    )
    },

    genCancel() {
      return (
        <button
          type="button"
          class={bem('cancel')}
          onClick={this.CancelClick}
        >
          取消
        </button>
    )
    },

    genToolbar() {
      return (
        <div
          class={bem('toolbar')}
        >
          {this.genCancel()}
          {this.genConfirm()}
      </div>
      )
    },

    genTopClick() {
      return this.selectDatas.map((item, columnIndex) => (
        <span
          onClick={() => {
            this.changeCheck(item, columnIndex)
          }}
        >{ item[this.labelKey] }</span>
      ))
    },

    genCell() {
      const style = "align-items: center;"
      return this.options.map((item, columnIndex) => (
          <Cell
            style={style}
            scopedSlots={{
              'title': () => this.genTitle(item),
              'right-icon': () => this.genRightIcon(item),
            }}
            onClick={() => {
              this.handleCheck(item, columnIndex)
            }}
          />
        ))
    },
  },

  render() {
    const style = "max-height: 260px; overflow-y: auto; position: relative;"
    const popStyle = "{maxHeight: '60%'}"
    const position = "bottom"
    return (
      <div>
        <Field
          ref="input"
          vModel={this.showValue}
          disabled={this.disabled}
          clickable={this.clickable}
          border={this.border}
          readonly={this.readonly}
          isLink={this.isLink}
          placeholder={this.placeholder}
          onClick={this.onClick}
        />
          <Popup
            vModel={this.showPicker}
            position={position}
            style={popStyle}
            safeAreaInsetBottom={this.safeAreaInsetBottom}
            >
              {this.genToolbar()}
              <div class={bem('check')}>
                {this.genTopClick()}
              </div>
              <div style={style}>
                <CellGroup>
                  {this.genCell()}
                </CellGroup>
                {this.genLoading()}
              </div>
          </Popup>
      </div>
    );
  }
})
