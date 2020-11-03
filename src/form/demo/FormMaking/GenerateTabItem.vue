<template>
  <div v-if="show">
    <div @click="changeShowType" style="color:#409eff; cursor: pointer;">
      {{ showType==='tabs' ? '平铺显示' : '标签显示' }}
    </div>
    <el-tabs
      v-if="showType==='tabs'"
      v-model="tabActive"
      :ref="element.model"
      :type="element.options.type"
      :tab-position="element.options.tabPosition"
      :class="{
        [element.options.customClass]: element.options.customClass?true: false
      }"
      :id="tabId + '-' + element.model"
      style="margin-bottom: 18px;"
    >
      <el-tab-pane
        v-for="item in element.tabs"
        :key="item.name"
        :label="item.label"
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
      </el-tab-pane>
    </el-tabs>
    <div v-else>
      <el-collapse v-model="activeNames" class="tile-box">
        <el-collapse-item v-for="(item, index) in element.tabs" :key="index" :name="index" class="list">
          <template slot="title">
            {{ item.label }}
          </template>
          <div>
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
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'
import Vue from 'vue'

export default {
  name: 'GenerateTabItem',
  components: {
    GenerateFormItem,
    GenerateColItem: () => import('./GenerateColItem.vue'),
    GenerateReport: () => import('./GenerateReport')
  },
  props: ['element', 'model', 'rules', 'remote', 'blanks', 'display', 'edit', 'formId', 'designFields', 'helpers', 'formValue'],
  data() {
    return {
      dataModels: this.model,
      tabActive: this.element.tabs.length ? this.element.tabs[0].name : '',
      tabId: this.formId ? this.formId : '',
      showType: 'tabs',
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

    & /deep/ .el-collapse-item__header {
      font-weight: bold;
    }

    & /deep/ .el-collapse-item__wrap {
      border-bottom: none;
    }

    & /deep/ .el-collapse-item__content {
      padding-bottom: 5px;
    }
  }
</style>
