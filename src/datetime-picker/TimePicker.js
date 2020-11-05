import { createNamespace } from '../utils';
import { padZero } from '../utils/format/string';
import { range } from '../utils/format/number';
import { sharedProps, TimePickerMixin } from './shared';

const [createComponent] = createNamespace('time-picker');

export default createComponent({
  mixins: [TimePickerMixin],

  props: {
    ...sharedProps,
    minHour: {
      type: [Number, String],
      default: 0,
    },
    maxHour: {
      type: [Number, String],
      default: 23,
    },
    minMinute: {
      type: [Number, String],
      default: 0,
    },
    maxMinute: {
      type: [Number, String],
      default: 59,
    },
    minSecond: {
      type: [Number, String],
      default: 0,
    },
    maxSecond: {
      type: [Number, String],
      default: 59,
    },
    formate: {
      type: String,
      default: 'HH:mm:ss'
    }
  },

  computed: {
    ranges() {
      return [
        {
          type: 'hour',
          range: [+this.minHour, +this.maxHour],
        },
        {
          type: 'minute',
          range: [+this.minMinute, +this.maxMinute],
        },
        {
          type: 'second',
          range: [+this.minSecond, +this.maxSecond]
        }
      ];
    },
  },

  watch: {
    filter: 'updateInnerValue',
    minHour: 'updateInnerValue',
    maxHour: 'updateInnerValue',
    minMinute: 'updateInnerValue',
    maxMinute: 'updateInnerValue',
    minSecond: 'updateInnerValue',
    maxSecond: 'updateInnerValue',

    value(val) {
      val = this.formatValue(val);

      if (val !== this.innerValue) {
        this.innerValue = val;
        this.updateColumnValue();
      }
    },
  },

  methods: {
    formatValue(value) {
      let _result = '';
      if (this.formate === 'HH:mm') {
        if (!value) {
          value = `${padZero(this.minHour)}:${padZero(this.minMinute)}`;
        }
  
        let [hour, minute] = value.split(':');
        hour = padZero(range(hour, this.minHour, this.maxHour));
        minute = padZero(range(minute, this.minMinute, this.maxMinute));
  
        _result = `${hour}:${minute}`;
        // return `${hour}:${minute}`;
      } else if (this.formate === 'HH:mm:ss') {
        if (!value) {
          value = `${padZero(this.minHour)}:${padZero(this.minMinute)}:${padZero(this.minSecond)}`;
        }
        let [hour, minute, second] = value.split(':')
        hour = padZero(range(hour, this.minHour, this.maxHour));
        minute = padZero(range(minute, this.minMinute, this.maxMinute));
        second = padZero(range(second, this.minSecond, this.maxSecond));
        _result = `${hour}:${minute}:${second}`;
      } else {
        if (!value) {
          value = `${padZero(this.minMinute)}:${padZero(this.minSecond)}`;
        }
        let [minute, second] = value.split(':')
        minute = padZero(range(minute, this.minMinute, this.maxMinute));
        second = padZero(range(second, this.minSecond, this.maxSecond));
        _result = `${minute}:${second}`;
      }
      
      return _result
    },

    updateInnerValue() {
      const [hourIndex, minuteIndex, secondIndex] = this.getPicker().getIndexes();
      const [hourColumn, minuteColumn, secondColumn] = this.originColumns;

      const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      const second = secondColumn.values[secondIndex] || secondColumn.values[0];

      if (this.formate === 'HH:mm') {
        this.innerValue = this.formatValue(`${hour}:${minute}`);
      } else if (this.formate === 'HH:mm:ss') {
        this.innerValue = this.formatValue(`${hour}:${minute}:${second}`);
      } else {
        this.innerValue = this.formatValue(`${minute}:${second}`);
      }
      this.updateColumnValue();
    },

    onChange(picker) {
      this.updateInnerValue();

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$emit('change', picker);
        });
      });
    },

    updateColumnValue() {
      const { formatter } = this;
      const pair = this.innerValue.split(':');
      const values = [formatter('hour', pair[0]), formatter('minute', pair[1]), formatter('second', pair[2])];

      this.$nextTick(() => {
        this.getPicker().setValues(values);
      });
    },
  },
});
