<template>
  <div class="form-table">
    <!--  :class="{'is-disabled': disabled}" -->
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        label="#"
        fixed
        width="65"
      >
        <template slot-scope="scope">
          <div :class="{'is-block': !showRemoveBtn}" class="scope-index">
            <span>{{ scope.$index + 1 }}</span>
          </div>
          <div v-if="showRemoveBtn" class="scope-action">
            <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)" style="margin: 0" />
            <i class="el-icon-delete" @click="handleRemove(scope.$index)" />
            <!-- <el-button type="danger" icon="el-icon-minus" size="mini" circle @click="handleRemove(scope.$index)" style="margin-left: 0" /> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="columns.length==0" />
      <template v-else>
        <el-table-column
          v-for="column in columns"
          :key="column.key"
          :label="column.name"
          :width="column.options.width"
          :label-class-name="column.options.required ? 'required' : ''"
        >
          <template slot-scope="scope">
            {{ scope.row[column.model] }}
            <!-- <el-form-item :prop="widget.model + '.'+ scope.$index + '.' + column.model" :rules="column.rules">
              <GenerateElementItem :id="widget.model+'-'+column.model" v-model="scope.row[column.model]" :edit="!disabled" :blanks="blanks" :is-table="true" :widget="column" :models.sync="tableData[scope.$index]" :remote="remote" :helpers="helpers">
                <template v-for="blank in blanks" v-slot:[blank.name]="blankScope">
                  <slot :name="blank.name" :model="scope.row" />
                </template>
              </GenerateElementItem>
            </el-form-item> -->
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-button v-if="showAddBtn" icon="el-icon-plus" type="text" @click="handleAddRow">
      添加
    </el-button>
    <cus-dialog
      ref="addSubForm"
      :visible="subformVisible"
      :action="false"
      width="70%"
      form
      title="添加子表单"
    >
      <el-form ref="subform" :model="subformData" label-width="100px">
        <div v-for="column in columns" :key="column.key">
          <el-form-item :prop="column.model" :rules="column.rules" :label="column.name" style="margin-bottom: 22px;">
            <GenerateElementItem :id="widget.model+'-'+column.model" v-model="subformData[column.model]" :edit="!disabled" :blanks="blanks" :is-table="true" :widget="column" :models.sync="subformData" :remote="remote" :helpers="helpers">
              <template v-for="blank in blanks" v-slot:[blank.name]="blankScope">
                <slot :name="blank.name" :model="subformData" />
              </template>
            </GenerateElementItem>
          </el-form-item>
        </div>
      </el-form>
      <div style="text-align:center;">
        <el-button @click="subformVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddSubform">确 定</el-button>
      </div>
    </cus-dialog>
  </div>
</template>

<script>
import cusDialog from '../CusDialog'

export default {
  components: {
    GenerateElementItem: () => import('../GenerateElementItem.vue'),
    cusDialog
  },
  props: ['columns', 'value', 'models', 'remote', 'blanks', 'disabled', 'widget', 'helpers'],
  data() {
    return {
      tableData: this.value,
      dataModels: this.models,
      count: 0,
      showAddBtn: true,
      showRemoveBtn: true,
      isedit: false,
      subformVisible: false,
      subformData: {},
      isUpdate: false,
      updateIndex: 0
    }
  },
  watch: {
    value(val) {
      this.tableData = val
    },
    tableData(val) {
      this.$emit('input', val)
    },
    dataModels: {
      deep: true,
      handler(val) {
        this.$emit('update:models', val)
      }
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModels = val
      }
    }
  },
  created() {
    if (this.widget.uselist === undefined) {
      this.widget.uselist = this.widget.name_model.uselist
    }
    if (!this.widget.uselist) {
      if (this.widget.model in this.models && this.models[this.widget.model].length >= 1) {
        this.showAddBtn = false
      } else {
        this.showAddBtn = true
      }
    }
  },
  methods: {
    handleAddRow() {
      const item = {}
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].type === 'blank') {
          item[this.columns[i].model] = this.columns[i].options.defaultType === 'String' ? '' : (this.columns[i].options.defaultType === 'Object' ? {} : [])
        } else {
          item[this.columns[i].model] = this.columns[i].options.defaultValue
        }
      }

      // this.tableData.push(item)
      this.subformData = item
      this.subformVisible = !this.subformVisible
    },

    handleRemove(index) {
      this.tableData.splice(index, 1)
      this.showAddBtn = true
    },
    handleUpdate(index, row) {
      this.isUpdate = true
      this.updateIndex = index
      this.subformData = row
      this.subformVisible = !this.subformVisible
    },
    handleAddSubform() {
      this.$refs['subform'].validate((valid) => {
        if (valid) {
          const item = this.$refs['subform'].model
          this.count += 1
          if (!this.widget.uselist && this.count >= 1) {
            this.showAddBtn = false
          } else {
            this.showAddBtn = true
          }
          if (this.isUpdate) {
            this.tableData[this.updateIndex] = item
          } else {
            this.tableData.push(item)
          }

          this.subformVisible = !this.subformVisible
          this.isUpdate = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.form-table {
  position: relative;

  &.is-disabled {
    background-color: #f5f7fa;
    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      cursor: no-drop;
    }
  }

  .el-table__empty-block {
    display: none;
  }

  .scope-action {
    display: none;
  }

  .scope-index {
    display: block;
  }

  .hover-row {
    .scope-action {
      display: block;
      // .el-button {
      //   padding: 3px;
      // }
    }

    .scope-index {
      display: none;
    }
    .is-block {
      display: block;
    }
  }
  .el-button--mini.is-circle {
    width: 25px;
    height: 25px;
    padding: 0;
    i {
      color: #fff;
    }
  }
  .el-table th.required>div::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
    background: transparent;
    vertical-align: top;
  }
}
</style>

