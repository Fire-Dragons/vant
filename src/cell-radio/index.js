// Utils
import { createNamespace, isObject } from '../utils';
import { FieldMixin } from '../mixins/field';

// Components
import Cell from '../cell';
import Field from '../field';
import Popup from '../popup';
import Icon from '../icon';

const [createComponent, bem, t] = createNamespace('cell-radio');

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
    safeAreaInsetBottom: Boolean
  },

  data() {
    return {
      readonly: true,
      showPicker: false,
      value: null,
      showValue: null
    };
  },

  watch: {
    value(val, oldValue) {
      this.$emit('input', val)
      if (val !== oldValue) {
        this.$emit('change', val)
      }
    },
  },

  methods: {
    handleCheck(item, index) {
      this.value = item.value
      this.showValue = item.label
      this.showPicker = false
    },

    onClick(event) {
      this.$emit('click', event)
      this.showPicker = true
    },

    genTitle(item) {
      let { label } = item
      if (!this.showLabel && item.value) {
        label = item.value
      }
      return (<span>{label}</span>)
    },

    genRightIcon(item) {
      const color = "#ff5514"
      const size = "16"
      const name = "success"
      if (this.value === item.value) {
        return (<Icon name={name} color={color} size={size} />)
      }
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
    const style = "max-height: 260px; margin-top: 30px; overflow-y: auto;"
    const closeIcon = "close"
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
            closeIcon={closeIcon}
            position={position}
            safeAreaInsetBottom={this.safeAreaInsetBottom}
            closeable
            >
              <div style={style}>
                {this.genCell()}
              </div>
          </Popup>
      </div>
    );
  }
})
