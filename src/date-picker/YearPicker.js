// Utils
import { createNamespace } from '../utils';
import { pickerProps } from '../picker/shared';

// Components
import Picker from '../picker';

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
  props: {
    ...pickerProps,
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
    defaultIndex: Number
  },

  data() {
    return {}
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

  methods: {
    onChange(picker, values, index) {
      this.$emit('change', picker, values, index)
    },

    onConfirm(values, index) {
      this.$emit('confirm', values, index)
    },

    onCancel() {
      this.$emit('cancel')
    },

    // @exposed-api
    // setYear(code) {
    //   this.code = code || '';
    // },
  },

  render() {
    const on = {
      change: this.onChange,
      confirm: this.onConfirm,
      cancel: this.onCancel
    };

    return (
      <div class={bem()}>
        <Picker
          ref="year"
          showToolbar
          defaultIndex={this.defaultIndex}
          title={this.title}
          columns={this.displayColumns}
          loading={this.loading}
          readonly={this.readonly}
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
      </div>
    )
  }
})