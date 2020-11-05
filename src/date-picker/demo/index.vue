<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <van-date-picker
        title="年份选择"
        type="year"
      />
    </demo-block>
    <demo-block :title="t('monthType')">
      <van-date-picker
        title="月份选择"
        type='month'
      />
    </demo-block>
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
      currentMonth: new Date().getMonth() + 1,
      currentDateTimerRange: null,
      currentDates: null
    }
  }
}
</script>
