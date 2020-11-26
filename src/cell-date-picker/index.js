import { createNamespace } from '../utils';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';

const [createComponent, bem] = createNamespace('cell-date-picker');

export default createComponent({
  props: {
    ...YearPicker.props,
    ...MonthPicker.props
  },

  render() {
    const Component = this.type === 'month' ? MonthPicker : YearPicker

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
