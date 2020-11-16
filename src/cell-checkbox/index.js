// Utils
import { createNamespace, isObject } from '../utils';
import { FieldMixin } from '../mixins/field';

// Components
import Cell from '../cell';
import Field from '../field';
import Popup from '../popup';
import CheckBoxGroup from '../checkbox-group'
import CheckBox from '../checkbox'

const [createComponent, bem, t] = createNamespace('cell-checkbox');

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
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
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
    columns: {
      type: Array,
      default: () => { return [] }
    },
    rules: Array,
    safeAreaInsetBottom: Boolean,
    value: [String, Number, Array]
  },

  data() {
    return {
      showPicker: false,
      showValue: null,
      mutilSelect: [],
      newValue: this.value
    };
  },

  computed: {
    initData() {
      const { value, columns, showValue } = this
      return {
        value,
        columns,
        showValue
      }
    }
  },

  watch: {
    newValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    columns: {
      deep: true,
      handler(val) {
      }
    },
    initData: {
      deep: true,
      handler(val) {
        if (val.value && val.columns.length > 0 && !val.showValue) {
          this.initSelectDatas()
        }
      }
    }
  },

  methods: {
    initSelectDatas() {
      const showValues = []
      const count = this.value.length
      let valueCount = 1
      for (var i=0; i < this.columns.length; i++) {
        const item = this.columns[i]
        if (this.value.include(item.value)) {
          showValues.push(item.label || item.value)
          this.$refs.selectMutil[i].toggle(true)
          valueCount += 1
          if (valueCount >= count) {
            break
          }
        }
      }
      this.showValue = showValues.join()
    },
    handleCheck(item, index) {
      this.$refs.selectMutil[index].toggle()
    },

    onClick(event) {
      if (this.disabled || this.readonly) {
        return
      }
      this.$emit('click', event)
      this.showPicker = true
    },

    checkOption() {
      const showValues = []
      const values = []
      this.mutilSelect.forEach(item => {
        values.push(item.value)
        showValues.push(item.label)
      })
      this.newValue = values
      this.showValue = showValues.join()
      this.showPicker = false
    },

    CancelClick() {
      this.showPicker = false
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

    genTitle(item) {
      let { label } = item
      if (!this.showLabel && item.value) {
        label = item.value
      }
      return (<span>{label}</span>)
    },

    genRightIcon(item) {
      const shape = "square"
      const size = "16px"
      return (<CheckBox ref="selectMutil" refInFor={true} name={item} shape={shape} iconSize={size} />)
    },

    genCell() {
      return this.columns.map((item, columnIndex) => (
          <Cell
            title={item.label}
            name={item}
            clickable
            scopedSlots={{
              'right-icon': () => this.genRightIcon(item),
            }}
            onClick={() => {
              this.handleCheck(item, columnIndex)
            }}
          />
        ))
    },
  },

  render(h) {
    const style = "max-height: 260px; overflow-y: auto;"
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
            safeAreaInsetBottom={this.safeAreaInsetBottom}
            >
              {this.genToolbar()}
              <div style={style}>
                <CheckBoxGroup
                  ref='boxgroup'
                  vModel={this.mutilSelect}
                  >
                    {this.genCell()}
                </CheckBoxGroup>
              </div>
          </Popup>
      </div>
    );
  }
})
