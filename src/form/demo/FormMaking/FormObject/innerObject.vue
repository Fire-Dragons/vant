<template>
  <div class="sub-object">
    <div class="action-btn">
      <el-button v-if="can_create && !is_view" type="primary" plain @click="create">
        添加
      </el-button>
      <div class="right-btn">
        <el-input id="search" v-model="text" prefix-icon="el-icon-search" placeholder="请输入内容" class="search-input" />
      </div>
    </div>
    <el-table :data="innerItems.slice((pagination.page-1)*page_size, pagination.page*page_size)" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="#" fixed width="65">
        <template slot-scope="scope">
          <div class="scope-index">
            <span>{{ scope.$index + 1 }}</span>
          </div>
          <!-- <div v-if="showRemoveBtn" class="scope-action">
            <el-button type="text" icon="el-icon-edit" size="mini" circle @click="handleUpdate(scope.$index, scope.row)" style="margin-left: -4px" />
            <el-button type="text" icon="el-icon-delete" size="mini" circle @click="handleRemove(scope.$index)" style="margin-left: 0" />
          </div> -->
        </template>
      </el-table-column>
      <el-table-column v-if="headers.length==0" />
      <template v-else>
        <el-table-column
          v-for="(item, index) in headers"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="item.data_format && ['image','file', 'html'].indexOf(item.data_format) != -1">
              <span class="dlink" v-html="scope.row[scope.column.property]" />
            </div>
            <div v-else-if="scope.column.property in design_select">
              {{ scope.row[scope.column.property] | formatterFun(design_select[scope.column.property].values, design_select[scope.column.property].labels) }}
            </div>
            <div v-else>
              {{ scope.row[scope.column.property] }}
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        fixed="right"
        align="right"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="mini" circle @click="handleUpdate(scope.$index, scope.row)" />
          <el-button type="text" icon="el-icon-delete" size="mini" circle @click="handleRemove(scope.$index)" style="margin-left: 0" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="innerItems.length > 0"
      :page-size="page_size"
      :layout="layout"
      :total="innerItems.length"
      :current-page="pagination.page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <cus-dialog
      ref="addInnerObj"
      :visible="innerObjVisible"
      :action="false"
      width="70%"
      form
      title="添加子对象"
    >
      <fm-generate-form ref="innerObjForm" :data="innerObjData" :remote="remoteFuncs" :value="editData" />
      <div style="text-align:center;">
        <el-button @click="innerObjVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleAddInnerObj">
          确 定
        </el-button>
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
  props: ['value', 'models', 'remote', 'blanks', 'disabled', 'widget', 'helpers'],
  filters: {
    formatterFun: function(value, values, labels) {
      if (!value) return value
      const index = values.indexOf(value)
      if (index !== -1) {
        return labels[index]
      }
    }
  },
  data() {
    const that = this
    return {
      objectData: this.value,
      dataModels: this.models,
      showRemoveBtn: true,
      headers: [],
      proj_code: this.widget.options.proj_code,
      object_code: this.widget.options.object_code,
      page_code: this.widget.options.page_code,
      can_create: false,
      is_view: false,
      innerObjVisible: false,
      innerObjData: {},
      editData: {},
      remoteFuncs: {
        remote_http_get(uri, body) {
          if (uri) {
            return that.$Utils.request({
              url: uri,
              method: 'get',
              params: body
            })
          } else {
            return new Promise((resolve, reject) => {
              resolve()
            })
          }
        },
        remote_http_post(uri, body) {
          if (uri) {
            return that.$Utils.request({
              url: uri,
              method: 'post',
              data: body
            })
          } else {
            return new Promise((resolve, reject) => {
              resolve()
            })
          }
        }
      },
      isUpdate: false,
      updateIndex: 0,
      design_select: {},
      text: null,
      pagination: {
        total: 10,
        page: 1
      },
      page_size: 10,
      layout: 'sizes, prev, pager, next'
    }
  },
  computed: {
    innerItems() {
      const search = this.text
      if (search) {
        return this.objectData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) !== -1
          })
        })
      }
      return this.objectData
    }
  },
  watch: {
    value(val) {
      this.objectData = val
    },
    objectData(val) {
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
    this.get_object_info()
    this.get_design_select()
  },
  methods: {
    fetchData() {
      this.$Apis.object.get_headers_by_code(this.proj_code, this.object_code, this.page_code, false).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.headers = response.payload
          this.headers.forEach(element => {
            this.$set(element, 'columns', {})
            this.innerObjData.list.forEach(item => {
              if (element.prop === item.model) {
                element.columns = item
              }
            })
          })
        }
      })
    },
    get_object_info() {
      this.$Apis.object.object_info(this.proj_code, this.object_code).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.is_view = response.payload.is_view
          this.innerObjData = JSON.parse(response.payload.design_form)
          this.fetchData()
          if (!this.page_code) {
            this.can_create = response.payload.can_create
          } else {
            this.get_page_info()
          }
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    get_page_info() {
      this.$Apis.object.page_info_by_code(this.proj_code, this.object_code, this.page_code).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.can_create = response.payload.can_create
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    get_design_select() {
      this.$Apis.object.get_design_select_by_code(this.proj_code, this.object_code, this.page_code).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.design_select = response.payload
        }
      })
    },
    create() {
      this.innerObjVisible = !this.innerObjVisible
      this.editData = {}
    },
    handleAddInnerObj() {
      this.$refs.innerObjForm.getData().then(data => {
        if (this.isUpdate) {
          this.objectData[this.updateIndex] = data
        } else {
          this.objectData.push(data)
        }
        this.innerObjVisible = !this.innerObjVisible
      }).catch(e => {
        // 数据校验失败
      })
    },
    handleUpdate(index, row) {
      this.isUpdate = true
      this.updateIndex = index
      this.editData = row
      this.innerObjVisible = !this.innerObjVisible
    },
    handleRemove(index) {
      this.objectData.splice(index, 1)
    },
    handleSizeChange(val) {
      this.page_size = val
      this.pagination.page = 1
    },
    handleCurrentChange(val) {
      this.pagination.page = val
    }
  }
}
</script>
<style lang="scss" scoped>
.sub-object {
  & /deep/ .el-form-item {
    margin-bottom: 22px !important;
  }
  & /deep/ .el-table__empty-block {
    min-height: 0px;
    .el-table__empty-text {
      display: none;
    }
  }
  .scope-action {
    display: none;
  }
  .scope-index {
    display: block;
  }
  .hover-row {
    .scope-action {
      display: flex;
      .is-disabled {
        cursor: no-drop;
        i {
          cursor: no-drop;
        }
      }
    }
    // .scope-index {
    //   display: none;
    // }
    .is-block {
      display: block;
    }
  }
  .el-button--mini.is-circle {
    width: 25px;
    height: 25px;
    padding: 0;
    i {
      color: #c5c5c5;
      &:hover {
        color: #f56c6c;
      }
    }
    i.el-icon-delete {
      color: #f56c6c;
    }
  }
  .action-btn {
    .el-button.is-plain:hover,
    .el-button.is-plain:focus {
      border-color: #409eff;
      color: #fff;
    }
  }
  & /deep/ .el-table thead tr th {
    background: #f5f7fa;
    color: #909399;
  }
}
</style>
