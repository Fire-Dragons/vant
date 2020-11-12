// Utils
import { createNamespace, isObject } from '../utils';
import { FieldMixin } from '../mixins/field';

// Components
import Cell from '../cell';
import Field from '../field';
import Popup from '../popup';
import CheckBoxGroup from '../checkbox-group'
import CheckBox from '../checkbox'
import Icon from '../icon';
import List from '../list';

const [createComponent, bem, t] = createNamespace('cell-select');

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
    multiple: {
      type: Boolean,
      default: false
    },
    error: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true,
    },
    offset: {
      type: [Number, String],
      default: 300,
    },
    direction: {
      type: String,
      default: 'down',
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showPicker: false,
      showValue: null,
      mutilSelect: [],
      value: null,
      selectVal: this.value
    };
  },

  watch: {
    value(val, oldValue) {
      if (!this.multiple) {
        this.selectVal = val
      }
      this.$emit('input', val)
      if (!this.multiple && val !== oldValue) {
        this.$emit('change', val)
      } else {
        this.$emit('change', val)
      }
    },
  },

  methods: {
    handleCheck(item, index) {
      if (this.multiple) {
        this.$refs.selectMutil[index].toggle()
      } else {
        this.mutilSelect = [item]
        this.selectVal = item.value
      }
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
      if (!this.multiple) {
        this.value = values.join()
      } else {
        this.value = values
      }
      this.showValue = showValues.join()
      this.showPicker = false
    },

    CancelClick() {
      this.showPicker = false
    },

    loadMore() {
      this.$emit('load');
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
      if (this.multiple) {
        const shape = "square"
        const size = "16px"
        return (<CheckBox ref="selectMutil" refInFor={true} name={item} shape={shape} iconSize={size} />)
      } else if (this.selectVal === item.value) {
        const color = "#ff5514"
        const size = "16"
        const name = "success"
        return (<Icon name={name} color={color} size={size} />)
      }
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

    genBody() {
      return (
        <List
          loading={this.loading}
          finished={this.finished}
          error={this.error}
          offset={this.offset}
          loadingText={this.loadingText}
          errorText={this.errorText}
          immediateCheck={this.immediateCheck}
          direction={this.direction}
          finishedText={this.finishedText}
          onLoad={this.loadMore}
        >
          {this.genCell()}
        </List>
      )
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
                  vModel={this.mutilSelect}
                >
                  {this.genBody()}
                </CheckBoxGroup>
              </div>
          </Popup>
      </div>
    );
  }
})
