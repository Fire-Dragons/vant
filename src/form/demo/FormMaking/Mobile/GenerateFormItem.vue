<template>
  <van-cell>
    <van-field
      v-show="widget.type != 'divider' && show"
      :name="widget.model"
      :label="widget.name"
      :ref="widget.model"
      :id="id + '-item'"
      :class="{
        [widget.options.customClass]: widget.options.customClass?true: false,
        'no-label-form-item': widget.options.isLabelWidth && widget.options.labelWidth == 0
      }"
      :required="widget.options.required"
      @click-left-icon="clickLeftIcon"
      :left-icon="widget.options.fieldTips ? 'question-o' : ''"
    >
      <template #input>
        <generate-element-item
          :id="id"
          v-model="dataModel"
          :blanks="blanks"
          :is-table="false"
          :widget="widget"
          :models.sync="dataModels"
          :remote="remote"
          :edit="edit"
          :key="widget.key"
          :rules="rules"
          :design-fields="designFields"
          :form-value="formValue"
          :helpers="helpers"
        >
          <template v-for="blank in blanks" v-slot:[blank.name]="scope">
            <slot :name="blank.name" :model="scope.model" />
          </template>
        </generate-element-item>
      </template>
<!--      <template #CellLabel>-->
<!--        <div class="tips" :style="{color: widget.options.textColor}">-->
<!--          {{ widget.options.fieldTips }}-->
<!--        </div>-->
<!--      </template>-->
    </van-field>
    <van-divider
      v-if="widget.type == 'divider' && show"
      :content-position="widget.options.contentPosition"
    >
      {{ widget.name }}
    </van-divider>
  </van-cell>
</template>

<script>
import GenerateElementItem from './GenerateElementItem'
import Vue from 'vue'
import Dialog from '@/dialog';
import Notify from '@/notify';

export default {
  components: {
    GenerateElementItem
  },
  props: ['widget', 'models', 'rules', 'remote', 'blanks', 'display', 'edit', 'formId', 'designFields', 'helpers', 'formValue'],
  data() {
    return {
      dataModel: this.models[this.widget.model],
      dataModels: this.models,
      show: this.display[this.widget.model],
      id: this.formId ? this.formId + '-' + this.widget.model : this.widget.model,
      textPosition: 'input_text_' + this.widget.options.textPosition
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model]
        this.dataModels = val
      }
    },
    show: {
      deep: true,
      handler(val) {
        this.display[this.widget.model] = val
      }
    }
  },
  mounted() {
    this.helpers.itemNameModels[this.widget.model] = this.widget.name
    Object.assign(this.helpers.itemRefs, this.$refs)
    this.helpers.itemInstances[this.widget.model] = this
  },
  destroyed() {
  },
  // created() {
  //   console.log('66', this.models)
  // },
  methods: {
    clickLeftIcon(e) {
      Dialog.alert({
        title: '提示',
        message: this.widget.options.fieldTips
      })
    },
  }
}
</script>
