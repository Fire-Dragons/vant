// Utils
import fecha from './dateFormate';
import { createNamespace } from '../utils';
import { pickerProps } from '../picker/shared';
import { padZero } from '../utils/format/string';

// Components
import Picker from '../picker';
import Field from '../field';
import Popup from '../popup';

const [createComponent, bem] = createNamespace('month-picker');

function pickSlots(instance, keys) {
  const { $slots, $scopedSlots } = instance;
  const scopedSlots = {};

  keys.forEach((key) => {
    if ($scopedSlots[key]) {
      scopedSlots[key] = $scopedSlots[key];
    } else if ($slots[key]) {
      scopedSlots[key] = () => $slots[key];
    }
  });

  return scopedSlots;
}

export default createComponent({
  props: {
    ...pickerProps,
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
    type: {
      type: String,
      default: 'month'
    },
    value: [Number, String],
    title: String,
    loading: Boolean,
    itemHeight: [Number, String],
    swipeDuration: [Number, String],
    visibleItemCount: [Number, String],
    cancelButtonText: String,
    confirmButtonText: String,
    formate: String,
    rules: Array,
    safeAreaInsetBottom: Boolean
  },

  data() {
    return {
      showPicker: false,
      showValue: null,
      dataModel: this.value,
      defaultIndex: 0
    }
  },

  computed: {
    displayColumns() {
      const list = []
      for(let i = 1; i <= 12; i++) {
        list.push(padZero(i))
      }
      return list
    }
  },

  watch: {
    value(val, oldValue) {
      this.dataModel = val
      this.$emit('input', val)
      if (val !== oldValue) {
        this.$emit('change', val)
      }
    },

    dataModel(val) {
      this.$emit('input', val)
    }
  },

  created() {
    if (this.value && this.formate && this.formate === 'timestamp') {
      this.showValue = fecha.format(new Date(Number(this.value)), 'yyyy-MM-dd')
    } else {
      this.showValue = this.value
    }
    this.displayColumns.forEach((item, index) => {
      if (this.showValue && (item === this.showValue || this.showValue.toString().indexOf(item) !== -1)) {
        this.defaultIndex = index
      }
    })
  },

  methods: {
    onClick() {
      this.showPicker = true
    },

    onConfirm(values, index) {
      if (this.formate && this.formate === 'timestamp') {
        this.dataModel = new Date(new Date().getFullYear(), values-1, 1).getTime()
      } else {
        const _values = `${new Date().getFullYear()}-${values}-01`
        this.dataModel = fecha.format(new Date(_values), this.formate || 'yyyy-MM-dd')
      }
      this.showValue = values
      this.showPicker = false
    },

    onCancel() {
      this.showPicker = false
    },
  },

  render() {
    const on = {
      confirm: this.onConfirm,
      cancel: this.onCancel
    };
    const position = "bottom"
    const getContainer = "body"

    return (
      <div class={bem()}>
        <Field
          ref="input"
          vModel={this.showValue}
          clickable={this.clickable}
          border={this.border}
          readonly
          isLink={this.isLink}
          placeholder={this.placeholder}
          onClick={this.onClick}
        />
        <Popup
          vModel={this.showPicker}
          position={position}
          getContainer={getContainer}
          safeAreaInsetBottom={this.safeAreaInsetBottom}
          >
            <Picker
              ref="month"
              showToolbar
              defaultIndex={this.defaultIndex}
              title={this.title}
              columns={this.displayColumns}
              loading={this.loading}
              itemHeight={this.itemHeight}
              swipeDuration={this.swipeDuration}
              visibleItemCount={this.visibleItemCount}
              cancelButtonText={this.cancelButtonText}
              confirmButtonText={this.confirmButtonText}
              scopedSlots={pickSlots(this, [
                'title',
                'columns-top',
                'columns-bottom',
              ])}
              {...{ on }}
            />
        </Popup>
      </div>
    )
  }
})
