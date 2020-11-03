<template>
  <div>
    <van-row v-for="(row, rowIndex) in element.rows" :key="rowIndex">
      <van-col
        v-for="(column, i) in row.columns"
        :key="rowIndex + '-' + i"
        v-if="!column.options.invisible"
        span="24"
      >
        <template v-for="columnElement in column.list">
          <generate-col-item
            v-if="columnElement.type == 'grid'"
            :key="columnElement.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="columnElement"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="columnId"
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
            v-else-if="columnElement.type == 'report'"
            :key="columnElement.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="columnElement"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="columnId"
            :design-fields="designFields"
            :helpers="helpers"
            :form-value="formValue"
            @input-change="onInputChange"
          >
            <template v-for="blank in blanks" v-slot:[blank.name]="scope">
              <slot :name="blank.name" :model="scope.model" />
            </template>
          </generate-report>

          <generate-tab-item
            v-else-if="columnElement.type == 'tabs'"
            :key="columnElement.key"
            :model.sync="dataModels"
            :rules="rules"
            :element="columnElement"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="columnId"
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
            :key="columnElement.key"
            :models.sync="dataModels"
            :rules="rules"
            :widget="columnElement"
            :remote="remote"
            :blanks="blanks"
            :display="display"
            :edit="edit"
            :form-id="columnId"
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
export default {
  name: 'GenerateReport',
  components: {
    GenerateFormItem: () => import('./GenerateFormItem.vue'),
    GenerateColItem: () => import('./GenerateColItem.vue'),
    GenerateTabItem: () => import('./GenerateTabItem.vue')
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
    'formValue'
  ],
  data() {
    return {
      dataModels: this.model,
      columnId: this.formId ? this.formId : '',
      show: this.display[this.element.model]
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
    this.helpers.itemNameModels[this.element.model] = this.element.name
    Object.assign(this.helpers.itemRefs, this.$refs)
    this.helpers.itemInstances[this.element.model] = this
  },
  methods: {
    onInputChange(value, field) {
      this.$emit('input-change', value, field)
    }
  }
}
</script>
