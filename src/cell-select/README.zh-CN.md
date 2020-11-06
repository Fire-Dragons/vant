# cell-select 下拉框

## API

### cell-select Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否处于加载状态，加载过程中不触发`load`事件 | _boolean_ | `false` |
| multiple | 是否多选 | _boolean_ | `false` |
| columns | 对象数组 | _Column[]_ | `[]` |
| finished | 是否已加载完成，加载完成后不再触发`load`事件 | _boolean_ | `false` |
| error | 是否加载失败，加载失败后点击错误提示可以重新<br>触发`load`事件，必须使用`sync`修饰符 | _boolean_ | `false` |
| offset | 滚动条与底部距离小于 offset 时触发`load`事件 | _number \| string_ | `300` |
| loading-text | 加载过程中的提示文案 | _string_ | `加载中...` |
| finished-text | 加载完成后的提示文案 | _string_ | - |
| error-text | 加载失败后的提示文案 | _string_ | - |
| immediate-check | 是否在初始化时立即执行滚动位置检查 | _boolean_ | `true` |
| direction | 滚动触发加载的方向，可选值为`up` | _string_ | `down` |
| placeholder | 输入框占位提示文字 | _string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| rules `v2.5.0` | 表单校验规则，详见 [Form 组件](#/zh-CN/form#rule-shu-ju-jie-gou) | _Rule[]_ | - |
| safe-area-inset-bottom | 是否开启[底部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_ | `false` |


### cell-select Events

| 事件名 | 说明                     | 回调参数           |
| ------ | ------------------------ | ------------------ |
| load   | 滚动条与底部距离小于 offset 时触发 | -        |
| change | 当绑定值变化时触发的事件 | _value_ |
