<template>
  <div>
    <van-input
      :id="id"
      :ref="widget.model"
      v-model="dataModel"
      clickable
      readonly
      is-link
      @click="handleSelect2()"
    >
      <template>
        <span v-if="select2Items.length < 1" style="color: #cbc9cf">请选择</span>
        <div v-else class="select2-box">
          <ul>
            <li v-for="(item, index) in select2Items" :key="item.value">
              {{ item.label }}
              <van-icon name="clear" class="remove-btn" @click="removeSelect2(item, index)" />
            </li>
          </ul>
        </div>
      </template>
    </van-input>
    <van-popup v-model="dialogVisible" :overlay="false" position="right" :style="{ height: '100%', width: '100%' }">
      <fm-select
        :select-multiple="multiple"
        :proj_code="proj_code"
        :object_code="object_code"
        :page_code="page_code"
        :option="option"
        :headers="headers"
        :items="items"
        :pagination="pagination"
        :select2-items="select2Items"
        :title="dialogTitle"
        @getChoose="getChoose"
        @isShow="isShow"
      />
    </van-popup>
  </div>
</template>
<script>
import fmSelect from './fmSelect'
export default {
  components: {
    fmSelect
  },
  props: ['value', 'multiple', 'proj_code', 'object_code', 'page_code', 'option', 'widget', 'disabled', 'id'],
  data() {
    return {
      dataModel: this.value,
      dialogVisible: false,
      dialogTitle: '',
      select2Items: [],
      headers: [],
      items: [],
      pageSize: 10,
      text: null,
      pagination: {
        total: 10,
        page: 1
      },
      page_size: 10
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          if (Array.isArray(val)) {
            this.select2Items = []
            val.forEach(element => {
              this.items.forEach(item => {
                if (element === item[this.option.value]) {
                  this.select2Items.push({
                    label: item[this.option.label],
                    value: item[this.option.value]
                  })
                }
              })
            })
          } else {
            this.items.forEach(item => {
              if (val === item[this.option.value]) {
                this.select2Items = [{
                  label: item[this.option.label],
                  value: item[this.option.value]
                }]
              }
            })
          }
          this.$nextTick(() => {
            this.$emit('change', val)
          })
        } else {
          this.select2Items = []
        }
      }
    }
  },
  created() {
    this.$Apis.object.get_headers_by_code(this.proj_code, this.object_code, this.page_code, false).then(response => {
      if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
        this.headers = response.payload
        this.$Apis.object.data_list_by_code(this.proj_code, this.object_code, this.page_code, this.text, this.pagination.page, this.page_size, true, this.filters, true).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.items = response.payload.items
            this.pagination = response.payload.pagination
            if (this.value) {
              if (Array.isArray(this.value)) {
                this.select2Items = []
                this.value.forEach(element => {
                  this.items.forEach(item => {
                    if (element === item[this.option.value]) {
                      this.select2Items.push({
                        label: item[this.option.label],
                        value: item[this.option.value]
                      })
                    }
                  })
                })
              } else {
                this.items.forEach(item => {
                  if (this.value === item[this.option.value]) {
                    this.select2Items = [{
                      label: item[this.option.label],
                      value: item[this.option.value]
                    }]
                  }
                })
              }
            }
          } else {
            this.$dialog.alert({
              message: response.message
            })
          }
        })
      }
    })
  },
  methods: {
    handleSelect2() {
      this.dialogVisible = !this.dialogVisible
      this.dialogTitle = '选择：' + this.widget.name
    },
    getChoose(events) {
      if (this.widget.type === 'select2') {
        this.select2Items = events
        let value = null
        if (this.widget.options.multiple) {
          value = []
          this.select2Items.forEach(item => {
            value.push(item.value)
          })
        } else {
          if (this.select2Items.length < 1) {
            value = ''
          } else {
            value = this.select2Items[0].value
          }
        }
        this.$emit('input', value)
      }
      this.isShow()
    },
    isShow() {
      this.dialogVisible = !this.dialogVisible
    },
    removeSelect2(item, index) {
      this.select2Items.splice(index, 1)
      let value = this.value
      if (Array.isArray(value)) {
        value.forEach((val, index) => {
          if (val === item.value) {
            value.splice(index, 1)
          }
        })
      } else {
        value = ''
      }
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.select2-box {
  display: flex;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 30px;
      position: relative;
      .remove-btn {
        position: absolute;
        right: -15px;
        top: 0;
        padding: 0;
        color: rgb(38, 126, 241);
        &.is-disabled:hover {
          color: #C0C4CC;
        }
      }
    }
  }
}
</style>
