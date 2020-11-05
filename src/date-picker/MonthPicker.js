// Utils
import { createNamespace } from '../utils';
import { pickerProps } from '../picker/shared';
import { padZero } from '../utils/format/string';

// Components
import Picker from '../picker';

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
    type: {
      type: String,
      default: 'month'
    },
    title: String,
    defaultIndex: Number
  },

  data() {
    return {}
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
          ref="month"
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
