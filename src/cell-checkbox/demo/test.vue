<template>
  <div>
    <van-form @submit="onSubmit" @failed="onFailed" :rules="rules">
      <van-cell>
        <van-field
          label="测试复选框"
          name="checkbox"
          :required="true"
        >
          <template #input>
            <van-cell-checkbox
              ref="checkbox"
              v-model="checkbox"
              placeholder="测试选择"
              :options="options"
              is-link
              @click="click"
              @change="change"
            />
          </template>
        </van-field>
      </van-cell>
      <div style="margin: 16px 16px 0;">
        <van-button round block type="info" native-type="submit">
          {{ t('submit') }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

  export default {
    name: 'test',

    i18n: {
      'zh-CN': {
        submit: '提交',
        username: '用户名',
        password: '密码',
        requireUsername: '请填写用户名',
        requirePassword: '请填写密码',
      },
      'en-US': {
        submit: 'Submit',
        username: 'Username',
        password: 'Password',
        requireUsername: 'Username is required',
        requirePassword: 'Password is required',
      },
    },

    components: {
    },

    mounted() {
    },

    data() {
      return {
        readonly: true,
        showPicker: false,
        value: null,
        showValue: null,
        checkbox: null,
        rules: {
          checkbox: [{ required: true, message: '请选择' }]
        },
        options: [
          {
            label: '选项1',
            value: 1
          },
          {
            label: '选项2',
            value: 2
          },
          {
            label: '选项3',
            value: 3
          },
          {
            label: '选项4',
            value: 4
          },
          {
            label: '选项5',
            value: 5
          }
        ]
      }
    },

    methods: {
      click(event) {
        console.info('click', event)
      },
      change(event) {
        console.info('change', event)
        console.info(this.checkbox)
      },
      onSubmit(values) {
        console.log('submit', values);
      },
      onFailed(errorInfo) {
        console.log('failed', errorInfo);
      },
    }
  };
</script>

<style scoped>

</style>
