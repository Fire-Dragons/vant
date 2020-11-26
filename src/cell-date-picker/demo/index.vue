<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <!-- <van-date-picker
        title="年份选择"
        type="year"
      /> -->
      <van-form @submit="onSubmit" @failed="onFailed" :rules="rules">
        <van-cell>
          <van-field
            label="test"
            name="year"
            :required="true"
          >
            <template #input>
              <van-cell-date-picker
                v-model="year"
                is-link
                type="year"
                placeholder="测试选择"
                title="年份选择"
                @change="change"
              />
            </template>
          </van-field>
        </van-cell>
        <van-cell>
          <van-field
            label="月份"
            name="month"
          >
            <template #input>
              <van-cell-date-picker
                v-model="month"
                is-link
                type="month"
                placeholder="测试选择"
                title="月份选择"
                formate="timestamp"
                @change="change"
              />
            </template>
          </van-field>
        </van-cell>
        <div style="margin: 16px 16px 0;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </demo-block>
    <!-- <demo-block :title="t('monthType')">
      <van-date-picker
        title="月份选择"
        type='month'
      />
    </demo-block> -->
    <!-- <demo-block :title="t('daterangeType')">
      <van-date-picker
        v-model="currentDateTimerRange"
        title="时间范围"
        type='daterange'
      />
    </demo-block>
    <demo-block :title="t('datesType')">
      <van-date-picker
        v-model="currentDates"
        title="多个日期"
        type='dates'
      />
    </demo-block> -->
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      day: '日',
      year: '年',
      month: '月',
      monthType: '选择月',
      daterangeType: '选择日期范围',
      datesType: '选择多个日期'
    },
    'en-US': {
      day: ' Day',
      year: ' Year',
      month: ' Month',
      monthType: 'Choose Month',
      daterangeType: 'Choose Date Range'
    },
  },

  data() {
    return {
      currentYear: true,
      minYear: 2015,
      maxYear: 2025,
      rules: {},
      year: null,
      month: 1593532800000
    }
  },

  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    onFailed() {},
    change(value) {
      console.log('23', value)
    }
  }
}
</script>
