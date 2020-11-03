<template>
  <div v-if="show">
    <van-tabs
      v-model="tabActive"
      :ref="element.model"
      :class="{
        [element.options.customClass]: element.options.customClass?true: false
      }"
      :id="tabId + '-' + element.model"
      swipeable
    >
      <van-tab
        v-for="item in element.tabs"
        :key="item.name"
        :title="item.label"
        :name="item.name"
      >
        <template v-for="tab in item.list">
          <generate-col-item
            v-if="tab.type == 'grid'"
            :key="tab.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="tab"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="tabId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-for="blank in blanks" v-slot:[blank.name]="scope">
              <slot :name="blank.name" :model="scope.model" />
            </template>
          </generate-col-item>

          <generate-report
            v-else-if="tab.type == 'report'"
            :key="tab.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="tab"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="tabId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-for="blank in blanks" v-slot:[blank.name]="scope">
              <slot :name="blank.name" :model="scope.model"></slot>
            </template>
          </generate-report>

          <generate-tab-item
            v-else-if="tab.type == 'tabs'"
            :key="tab.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="tab"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="tabId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-for="blank in blanks" v-slot:[blank.name]="scope">
              <slot :name="blank.name" :model="scope.model" />
            </template>
          </generate-tab-item>

          <generate-form-item
            v-else
            :key="tab.key"
            :models.sync="dataModels"
            :rules="rules"
            :widget="tab"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="tabId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-for="blank in blanks" v-slot:[blank.name]="scope">
              <slot :name="blank.name" :model="scope.model" />
            </template>
          </generate-form-item>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'GenerateTabItem',
  components: {
    GenerateFormItem: () => import('./GenerateFormItem.vue'),
    GenerateColItem: () => import('./GenerateColItem.vue'),
    GenerateReport: () => import('./GenerateReport.vue')
  },
  props: ['element', 'model', 'rules', 'remote', 'blanks', 'display', 'edit', 'formId', 'designFields', 'helpers', 'formValue'],
  data() {
    return {
      dataModels: this.model,
      tabActive: this.element.tabs.length ? this.element.tabs[0].name : '',
      tabId: this.formId ? this.formId : '',
      show: this.display[this.element.model],
      activeNames: []
    }
  },
  watch: {
    model: {
      deep: true,
      handler(val) {
        this.dataModels = this.model
      }
    },
    dataModels: {
      deep: true,
      handler(val) {
        this.$emit('update:model', val)
      }
    },
    'element.tabs': {
      handler(val) {
        val.forEach((item, index) => {
          this.activeNames.push(index)
        })
      },
      immediate: true
    }
  },
  mounted() {
    this.helpers.itemNameModels[this.element.model] = this.element.name
    Object.assign(this.helpers.itemRefs, this.$refs)
    this.helpers.itemInstances[this.element.model] = this
  },
  destroyed() {
  },
  methods: {
    onInputChange(value, field) {
      this.$emit('input-change', value, field)
    },
    changeShowType() {
      this.showType = this.showType === 'tabs' ? 'tile' : 'tabs'
    }
  }
}
</script>
<style lang="scss" scoped>
  .tile-box {
    border: none;

    .el-collapse-item__header {
      font-weight: bold;
    }

    .el-collapse-item__wrap {
      border-bottom: none;
    }

    .el-collapse-item__content {
      padding-bottom: 5px;
    }
  }
</style>
