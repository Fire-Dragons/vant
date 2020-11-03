<template>
  <div class="app-container">
    <div class="header">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template slot="right">
          <span @click="submit">确定</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="list-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-if="selectMultiple">
          <van-checkbox-group v-model="mutilSelect">
            <div v-for="(item, index) in items" :key="index" class="list-item">
              <van-checkbox ref="selectMutil" :name="item" icon-size="16px" class="mutil-btn" />
              <div class="list">
                <div v-for="(sub, i) in headers" :key="i" class="item">
                  <label>{{ sub.label }}:</label>
                  <div>{{ item[sub.prop] }}</div>
                </div>
              </div>
            </div>
          </van-checkbox-group>
        </template>
        <div v-else v-for="(item, index) in items" :key="index" :class="{isActive: singleSelect==item[option.value]}" class="list-item" @click="choose(item, index)">
          <div class="list">
            <div v-for="(sub, i) in headers" :key="i" class="item">
              <label>{{ sub.label }}:</label>
              <div>{{ item[sub.prop] }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    selectMultiple: {
      type: Boolean,
      default: false
    },
    proj_code: {
      type: String,
      default: null
    },
    object_code: {
      type: String,
      default: null
    },
    page_code: {
      type: String,
      default: null
    },
    option: {
      type: Object,
      default: () => {}
    },
    select2Items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      filters: [],
      text: null,
      page_size: 10,
      pageCount: this.pagination.pages,
      pageIndex: 1,
      chooseItems: this.select2Items,
      singleSelect: null,
      mutilSelect: this.select2Items
    }
  },
  watch: {
    select2Items: {
      handler(val) {
        this.chooseItems = val
      }
    }
  },
  created() {
    if (!this.selectMultiple && this.select2Items.length > 0) {
      this.singleSelect = this.select2Items[0].value
    }
  },
  methods: {
    onLoad() {
      if (this.pagination.page < this.pageCount) {
        this.pageIndex++
        this.$Apis.object.data_list_by_code(this.proj_code, this.object_code, this.page_code, this.text, this.pageIndex, this.page_size, true, this.filters, true).then(response => {
          if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
            this.items = [...this.items, ...response.payload.items]
          }
        })
        this.loading = false
      }
      if (this.pageIndex === this.pageCount) {
        this.finished = true
      }
    },
    onClickLeft() {
      this.$emit('isShow')
    },
    choose(item, index) {
      this.singleSelect = item[this.option.value]
      this.chooseItems = [
        {
          label: item[this.option.label],
          value: item[this.option.value]
        }
      ]
    },
    submit() {
      if (this.selectMultiple) {
        this.chooseItems = []
        this.mutilSelect.forEach(item => {
          this.chooseItems.push({
            label: item[this.option.label],
            value: item[this.option.value]
          })
        })
      }
      this.$emit('getChoose', this.chooseItems)
    },
    close() {
      this.$emit('isShow')
    }
  }
}
</script>
<style lang="scss" scoped>
.list-box {
  max-height: calc(100vh - 46px);
  overflow-y: auto;
}
</style>
