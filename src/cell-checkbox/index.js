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
    options: {
      type: Array,
      default: () => { return [] }
    },
    rules: Array,
    safeAreaInsetBottom: Boolean,
  },

  data() {
    return {
      readonly: true,
      showPicker: false,
      showValue: null,
      mutilSelect: [],
      value: []
    };
  },

  watch: {
    value(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
  },

  methods: {
    handleCheck(item, index) {
      this.$refs.selectMutil[index].toggle()
    },

    onClick(event) {
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
      this.value = values
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
      return this.options.map((item, columnIndex) => (
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
