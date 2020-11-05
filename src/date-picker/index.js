import { createNamespace } from '../utils';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';

const [createComponent, bem] = createNamespace('date-picker');

export default createComponent({
  props: {
    ...YearPicker.props,
    ...MonthPicker.props
  },

  methods: {
    // @exposed-api
    getPicker() {
      return this.$refs.root.getPicker();
    },
  },

  render() {
    const Component = this.type === 'month' ? MonthPicker : YearPicker
    // let Component = YearPicker
    // switch(this.type) {
    //   case 'year':
    //     Component = YearPicker;
    //     break;
    //   case 'month':
    //     Component = MonthPicker;
    //     break;
    //   case 'daterange':
    //     Component = DateRangePicker;
    //     break;
    //   case 'dates':
    //     Component = Dates
    //     break;
    // }

    return (
      <Component
        ref="root"
        class={bem()}
        {...{
          props: this.$props,
          on: this.$listeners,
        }}
      />
    );
  },
});
