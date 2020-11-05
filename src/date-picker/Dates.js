// Utils
import { createNamespace } from '../utils';
import { padZero } from '../utils/format/string';

// Components
import Field from '../field';
import Calendar from '../calendar';

const [createComponent, bem, t] = createNamespace('dates-picker');


export default createComponent({
  props: {
    type: {
      type: String,
      default: 'dates'
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
      const _result = []
      date.forEach(item => {
        _result.push(this.formatDate(item))
      })
      this.code = _result.join(',')
      this.showPopup = false
      // this.code = `${this.formatDate(start)}至${this.formatDate(end)}`
      // this.defaultValue = []
      // this.defaultValue.push(this.formatDate(start), this.formatDate(end))
    }
  },

  render() {
    const on = {
      confirm: this.onConfirm
    };

    return (
      <div class={bem()}>
        <Calendar
          vModel={this.showPopup}
          type="multiple"
          {...{ on }}
        />
      </div>
    )
  }
})
