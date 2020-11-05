<template>
  <demo-block :title="t('eventUsage')">
    <van-cell-group>
      <van-field
        v-model="value"
        clearable
        :label="t('label')"
        :placeholder="t('placeholder')"
        @input="input"
        @blur="blur"
        @focus="focus"
        @change="change"
        @clear="clear"
      />
    </van-cell-group>
  </demo-block>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      label: '文本',
      placeholder: '请输入文本',
    },
    'en-US': {
      label: 'Label',
      placeholder: 'Text',
    },
  },

  data() {
    return {
      value: '',
    };
  },
  methods: {
    blur(e) {
      console.info('blur', e);
    },
    focus(e) {
      console.info('focus', e);
    },
    change(value) {
      console.info('change', value);
    },
    input(value) {
      console.info('input', value);
    },
    clear(e) {
      console.info('clear', e);
    },
  },
};
</script>
