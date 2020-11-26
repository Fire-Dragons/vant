// Utils
import fecha from './dateFormate';
import { createNamespace } from '../utils';
import { pickerProps } from '../picker/shared';
import { FieldMixin } from '../mixins/field';

// Components
import Picker from '../picker';
import Field from '../field';
import Popup from '../popup';

const [createComponent, bem] = createNamespace('year-picker');

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
  mixins: [FieldMixin],

  inject: {
    vanForm: {
      default: null,
    },
  },

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
      default: 'year'
    },
    value: [Number, String],
    minYear: {
      type: Number,
      default: new Date().getFullYear() - 10
    },
    maxYear: {
      type: Number,
      default: new Date().getFullYear() + 10
    },
    yearList: Array,
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
      // readonly: true,
      showPicker: false,
      showValue: null,
      dataModel: this.value,
      defaultIndex: 0
    }
  },

  computed: {
    displayColumns() {
      let list = []
      for(let i = this.minYear; i <= this.maxYear; i++) {
        list.push(i)
      }
      list = this.yearList ? this.yearList : list
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
        this.dataModel = new Date(values, 0, 1).valueOf()
      } else {
        this.dataModel = fecha.format(new Date(Date.parse(values)), this.formate || 'yyyy-MM-dd')
      }
      this.showValue = values
      this.showPicker = false
    },

    onCancel() {
      this.showPicker = false
    }
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
              ref="year"
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