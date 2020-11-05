// Utils
import { createNamespace } from '../utils';
import { padZero } from '../utils/format/string';

// Components
import Field from '../field';
import Calendar from '../calendar';

const [createComponent, bem, t] = createNamespace('date-range-picker');


export default createComponent({
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    value: [Number, String],
    required: {
      type: Boolean,
      default: false
    },
    name: String,
    title: String,
    disablePicker: Boolean,
    placeholder: String
  },

  data() {
    return {
      code: this.value,
      showPopup: false
    }
  },

  methods: {
    formatDate(date) {
      const _month = padZero(date.getMonth() + 1)
      const _date = padZero(date.getDate())
      return `${date.getFullYear()}-${_month}-${_date}`
    },

    onConfirm(date) {
      const [start, end] = date;
      this.showPopup = false
      this.code = `${this.formatDate(start)}至${this.formatDate(end)}`
      this.defaultValue = []
      this.defaultValue.push(this.formatDate(start), this.formatDate(end))
    }
  },

  render() {
    const { code, disablePicker } = this
    const on = {
      confirm: this.onConfirm
    };

    return (
      <div class={bem()}>
        <div class={bem('fields')}>
          <Field
            readonly
            clickable={!disablePicker}
            label={t('label')}
            placeholder={this.placeholder || t('placeholder')}
            rightIcon={!disablePicker ? 'arrow' : null}
            value={code}
            name={this.name}
            required={this.required}
            onClick={() => {
              this.$emit('click-month');
              this.showPopup = !disablePicker;
            }}
          />
        </div>
        <Calendar
          vModel={this.showPopup}
          type="range"
          {...{ on }}
        />
      </div>
    )
  }
})
