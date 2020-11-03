<template>
  <div>
    <van-row
      v-if="show"
      v-for="(item, index) in element.columns"
      :key="index"
      :class="{
        [element.options.customClass]: element.options.customClass
          ? true
          : false,
      }"
      :ref="element.model"
      :justify="element.options.justify"
      :align="element.options.align"
      :id="colId + '-' + element.model"
      :type="element.options.flex ? 'flex' : ''"
    >
      <van-col span="24">
        <template v-for="col in item.list">
          <generate-col-item
            v-if="col.type == 'grid'"
            :key="col.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="col"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="colId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-for="blank in blanks" v-slot:[blank.name]="scope">
              <slot :name="blank.name" :model="scope.model" />
            </template>
          </generate-col-item>

          <generate-tab-item
            v-else-if="col.type == 'tabs'"
            :key="col.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="col"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="colId"
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
            v-else-if="col.type == 'report'"
            :key="col.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="col"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="colId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-slot:[blank.name]="scope" v-for="blank in blanks">
              <slot :name="blank.name" :model="scope.model" />
            </template>
          </generate-report>

          <generate-form-item
            v-else
            :key="col.key"
            :models.sync="dataModels"
            :rules="rules"
            :widget="col"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="colId"
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
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'GenerateColItem',
  components: {
    GenerateFormItem: () => import('./GenerateFormItem'),
    GenerateTabItem: () => import('./GenerateTabItem'),
    GenerateReport: () => import('./GenerateReport'),
  },
  props: [
    'element',
    'model',
    'rules',
    'remote',
    'blanks',
    'display',
    'edit',
    'formId',
    'designFields',
    'helpers',
    'formValue',
  ],
  data() {
    return {
      dataModels: this.model,
      show: this.display[this.element.model],
      colId: this.formId ? this.formId : ''
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
    }
  },
  mounted() {
    Object.assign(this.helpers.itemRefs, this.$refs)
    this.helpers.itemNameModels[this.element.model] = this.element.name
    this.helpers.itemInstances[this.element.model] = this
  },
  destroyed() {},
  methods: {
    onInputChange(value, field) {
      this.$emit('input-change', value, field)
    }
  }
}
</script>
