<template>
  <table class="fm-report-table__table" :style="{
    'border-top-width': element.options.borderWidth + 'px',
    'border-top-color': element.options.borderColor,
    'border-left-width': element.options.borderWidth + 'px',
    'border-left-color': element.options.borderColor,
  }"
    v-if="show"
  >
    <tr :key="rowIndex" v-for="(row, rowIndex) in element.rows">
      <td :style="{
            'border-right-width': element.options.borderWidth + 'px',
            'border-right-color': element.options.borderColor,
            'border-bottom-width': element.options.borderWidth + 'px',
            'border-bottom-color': element.options.borderColor,
            'width': column.options.width,
            'height': column.options.height
          }"
          v-for="(column, i) in row.columns" :key="rowIndex + '-' + i"
          v-if="!column.options.invisible"
          :colspan="column.options.colspan"
          :rowspan="column.options.rowspan"
          class="fm-report-table__td"
          valign="top"
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
              <slot :name="blank.name" :model="scope.model"></slot>
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
              <slot :name="blank.name" :model="scope.model"></slot>
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
              <slot :name="blank.name" :model="scope.model"></slot>
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
              <slot :name="blank.name" :model="scope.model"></slot>
            </template>
          </generate-form-item>
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'

export default {
  name: 'generate-report',
  components: {
    GenerateFormItem,
    GenerateColItem : () => import('./GenerateColItem.vue'),
    GenerateTabItem: () => import('./GenerateTabItem.vue')
  },
  props: ['element', 'model', 'rules', 'remote', 'blanks', 'display', 'edit', 'formId', 'designFields', 'helpers', 'formValue'],
  data () {
    return {
      dataModels: this.model,
      columnId: this.formId ? this.formId : '',
      show: this.display[this.element.model]
    }
  },
  methods: {
    onInputChange (value, field) {
      this.$emit('input-change', value, field)
    }
  },
  watch: {
    model: {
      deep: true,
      handler (val) {
        this.dataModels = this.model
      }
    },
    dataModels: {
      deep: true,
      handler (val) {
        this.$emit('update:model', val)
      }
    }
  },
  mounted() {
    this.helpers.itemNameModels[this.element.model] = this.element.name
    Object.assign(this.helpers.itemRefs, this.$refs)
    this.helpers.itemInstances[this.element.model] = this
  }
}
</script>
