# YearPicker 年份选择

### 介绍

年份选择组件，用于仅需要选择年份。

### 引入

```js
import Vue from 'vue';
import { CellDatePicker } from 'vant';

Vue.use(CellDatePicker);
```

## 代码演示

### 基础用法

```html
<van-cell-date-picker
  title="年份选择"
/>
```

```js
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 显示类型, 可选值为`year` `month` | _string_ | `year` |
| title | 顶部栏标题 | _string_ | `''` |
| confirm-button-text | 确认按钮文字 | _string_ | `确认` |
| cancel-button-text | 取消按钮文字 | _string_ | `取消` |
| loading | 是否显示加载状态 | _boolean_ | `false` |
| item-height `v2.8.6` | 选项高度，支持 `px` `vw` `rem` 单位，默认 `px` | _number \| string_ | `44` |
| visible-item-count | 可见的选项个数 | _number \| string_ | `6` |
| swipe-duration | 快速滑动时惯性滚动的时长，单位`ms` | _number \| string_ | `1000` |

### YearPicker Props

当日期选择器类型为 year 时，支持以下 props:

| 参数     | 说明                       | 类型   | 默认值 |
| -------- | -------------------------- | ------ | ------ |
| year-list | 年份数组 | _Array_ | 当前年份十年前至十年后 |
| min-year | 可选的最小年份 | _number_ | 十年前 |
| max-year | 可选的最大年份 | _number_ | 十年后 |


### Events

| 事件名  | 说明                     | 回调参数              |
| ------- | ------------------------ | --------------------- |
| change  | 当值变化时触发的事件     | Picker 实例，选中值，选中值对应的索引 |
| confirm | 点击完成按钮时触发的事件 | 选中值，选中值对应的索引 |
| cancel  | 点击取消按钮时触发的事件 | -                     |
