<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="表单宽度">
        <el-input v-model="data.width" clearable />
      </el-form-item>
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition" size="mini">
          <el-radio-button label="left">
            左对齐
          </el-radio-button>
          <el-radio-button label="right">
            右对齐
          </el-radio-button>
          <el-radio-button label="top">
            顶部对齐
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="表单标签宽度">
        <!-- <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10" size="small" /> -->
        <el-checkbox v-model="data.isLabelWidth" style="margin-right: 5px;">
          自定义
        </el-checkbox>
        <el-input-number v-model="data.labelWidth" :disabled="!data.isLabelWidth" :min="0" :max="200" :step="10" size="small" />
      </el-form-item>

      <el-form-item label="表单是否只读">
        <el-switch v-model="data.readOnly" />
      </el-form-item>

      <el-form-item
        v-for="(item,event_name) in data.events"
        :key="event_name"
        :label="event_name+'事件'"
      >
        <el-input v-model="data.events[event_name].func_name" style="width:80%" />
        <i class="el-icon-edit event-icon" @click="set_script(event_name)" />
        <i class="el-icon-delete event-icon" @click="remove_script(event_name)" />
        <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="title" :close-on-click-modal="false" append-to-body>
          <pythonCodemirror :prop_code="prop_code" :param-code="param_code" placeholder="函数主体部分" code-mode="javascript" @get_code="get_code($event)" />
          <div v-if="variable" class="tips">
            参数: {{ variable }}
          </div>
        </el-dialog>
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size" size="small">
          <el-radio-button label="medium">
            medium
          </el-radio-button>
          <el-radio-button label="small">
            small
          </el-radio-button>
          <el-radio-button label="mini">
            mini
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="自定义Class">
        <el-input v-model="data.customClass" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import pythonCodemirror from '../pythonCodemirror'
export default {
  components: {
    pythonCodemirror
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      title: '',
      param_code: '',
      prop_code: '',
      variable: ''
    }
  },
  watch: {
    'data.labelPosition': function(val) {
      if (val === 'top') {
        this.data.layout = 'vertical'
        this.data.labelCol = 0
      } else {
        this.data.layout = 'horizontal'
        this.data.labelCol = 3
      }
    }
  },
  methods: {
    set_script(event_name) {
      this.dialogVisible = !this.dialogVisible
      var func_name = this.data.events[event_name].func_name
      if (!func_name) {
        const key = new Date().getTime() + ''
        func_name = 'func_' + key
        this.data.events[event_name].func_name = func_name
      }
      this.title = event_name + '事件'
      this.param_code = event_name
      this.prop_code = this.data.events[event_name].func_body
      this.variable = this.data.events[event_name].tips
    },
    get_code(value) {
      for (var event_name in value) {
        this.data.events[event_name].func_body = value[event_name]
      }
    },
    remove_script(event_name) {
      this.data.events[event_name].func_name = ''
      this.data.events[event_name].func_body = ''
    }
  }
}
</script>
<style scoped lang="scss">
.event-icon {
  margin-left: 8px;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    color: rgb(38, 126, 241);
  }
}
</style>
