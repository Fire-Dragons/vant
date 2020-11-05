<template>
  <div :class="{'is-disabled': !pntid}" class="outer-object">
    <div class="action-btn">
      <el-button v-if="can_create && !disabled" id="create" type="primary" plain @click="create">
        新建
      </el-button>
      <el-button id="refresh" type="primary" plain @click="refresh">
        刷新
      </el-button>
      <template v-for="(item, index) in newOtherMethods">
        <el-button :key="index">
          <span v-if="item.operate_type===1" id="plcl" @click="clickType1(item)">{{ item.operate_name }}</span>
          <span v-if="item.operate_type===2" id="plxg" @click="clickType2(item)">{{ item.operate_name }}</span>
          <span v-if="item.operate_type===6" id="plPost" @click="clickType6(item)">{{ item.operate_name }}</span>
          <span v-if="item.operate_type===7" id="plGet" @click="clickType7(item)">{{ item.operate_name }}</span>
          <span v-if="item.operate_type===8" id="clsCreate" @click="clickType8(item)">{{ item.operate_name }}</span>
        </el-button>
      </template>
      <div class="right-btn">
        <el-button type="text" @click="query" style="margin-right: 10px">
          查询
        </el-button>
        <el-input id="search" v-model="text" prefix-icon="el-icon-search" placeholder="请输入内容" class="search-input" @keyup.enter.native="schfilter" />
      </div>
    </div>
    <el-table v-loading="loading" :data="items" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        v-if="isMultiple"
        type="selection"
        width="55"
      />
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
          <div v-else-if="convert && scope.column.property in design_select">
            {{ scope.row[scope.column.property] | formatterFun(design_select[scope.column.property].values, design_select[scope.column.property].labels) }}
          </div>
          <div v-else>
            {{ scope.row[scope.column.property] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="right"
        width="150"
      >
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.buttons" :key="item.action">
            <template v-if="index < 3">
              <span @click="item.isMtd ? mtdCall(item.fun, item, scope.row) : fnCall(item.fun, scope.row)">
                <i v-if="item.icon" :class="item.icon" />
                <span v-else>{{ item.name }}</span>
              </span>
            </template>
          </div>
          <el-dropdown v-if="scope.row.buttons.length > 3">
            <span class="el-dropdown-link">
              <i class="el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in scope.row.buttons.slice(3)" :key="index">
                <span @click="item.isMtd ? mtdCall(item.fun, item, scope.row) : fnCall(item.fun, scope.row)">
                  <span v-if="item.icon"><i :class="item.icon" /> {{ item.name }}</span>
                  <span v-else>{{ item.name }}</span>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPage"
      :page-size="page_size"
      :layout="layout"
      :total="pagination.total"
      :current-page="pagination.page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="dialogTitle" :close-on-click-modal="false">
      <method-batch-edit
        v-if="batchVisible"
        :batch-data="batchData"
        :ids="ids"
        :is-all="isAll"
        :object_id="object_id"
        :mtd_id="mtd_id"
        @show="isShow"
        @refresh="refresh"
      />
    </el-dialog>
    <el-dialog v-if="dialogSearch" :visible.sync="dialogSearch" title="查询" :close-on-click-modal="false">
      <set-query :proj_code="proj_code" :object_code="object_code" :page_code="page_code" :is-bycode="true" @show="isQueryShow" @getQueryData="getQueryData" />
    </el-dialog>
    <el-dialog v-if="dialogCreate" :visible.sync="dialogCreate" :title="objTitle" :close-on-click-modal="false" append-to-body>
      <object-create
        v-if="isCreate"
        :object_id="object_id"
        :pntfk="pntfk"
        :pntid="pntid"
        @show="isCreateShow"
        @refresh="refresh" />
      <object-update
        v-else
        :object_id="object_id"
        :objid="objid"
        :mtd_id="mtd_id"
        :edit="isEdit"
        @show="isCreateShow"
        @refresh="refresh" />
    </el-dialog>
    <el-dialog v-if="dialogMtd" :visible.sync="dialogMtd" :title="mtdTitle" :close-on-click-modal="false" append-to-body>
      <iframe :src="mtd_get_url" width="100%" height="500px" frameborder="0" />
    </el-dialog>
  </div>
</template>
<script>
import path from 'path'
import objectCreate from './objCreate'
import objectUpdate from './objUpdate'
const Base64 = require('js-base64').Base64

export default {
  components: {
    objectCreate,
    objectUpdate
  },
  props: ['value', 'models', 'remote', 'blanks', 'disabled', 'widget', 'helpers', 'designFields', 'formValue'],
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
    return {
      loading: false,
      items: [],
      headers: [],
      headers_all: [],
      update_headers: [],
      selectionData: [],
      object_id: null,
      page_id: null,
      proj_code: this.widget.options.proj_code,
      object_code: this.widget.options.object_code,
      page_code: this.widget.options.page_code,
      pntfk: this.widget.name_model.format,
      pnt_clsname: this.widget.name_model.cls_name,
      pntid: null,
      text: null,
      pagination: {
        total: 10,
        page: 1
      },
      page_size: 10,
      layout: 'sizes, prev, pager, next',
      showPage: false,
      filters: [],
      convert: true,
      design_select: {},
      methodsItems: [],
      single_methods: [],
      other_methods: [],
      newOtherMethods: [],
      newSingleMethods: [],
      is_view: false,
      can_create: false,
      can_view: false,
      can_update: false,
      can_delete: false,
      design_form: null,
      cellBtn: [],
      delete_applycondition: '',
      isMultiple: false,
      dialogSearch: false,
      dialogVisible: false,
      dialogTitle: '',
      batchVisible: false,
      batchData: [],
      isAll: false,
      ids: [],
      mtdFilters: [],
      enable_record: false,
      dialogCreate: false,
      objTitle: '',
      isCreate: false,
      mtd_id: null,
      objid: null,
      isEdit: false,
      params: {},
      dialogMtd: false,
      mtdTitle: '',
      mtd_get_url: null
    }
  },
  computed: {
    allBtns() {
      const { items, cellBtn, newSingleMethods, delete_applycondition } = this
      items.forEach(row => {
        this.$set(row, 'buttons', [])
        row.buttons.push(...cellBtn, ...newSingleMethods)
        row.buttons.forEach((i, index) => {
          if (i.isMtd && eval(i.apply_condition) === false) {
            row.buttons.splice(index, 1)
          }
        })
        if (delete_applycondition && !eval(delete_applycondition)) {
          row.buttons = row.buttons.filter(i => {
            return i.action !== 'remove'
          })
        }
      })
      return items
    }
  },
  watch: {
    allBtns: {
      handler(val) {}
    }
  },
  created() {
    this.designFields.some(item => {
      if (item.is_primary) {
        const prop = item.prop
        if (prop in this.formValue && !!(this.formValue[prop])) {
          this.pntid = this.formValue[prop]
          return true
        }
      }
    })
    this.get_object_info()
    if (this.convert) {
      this.get_design_select()
    }
  },
  methods: {
    fnCall(fun, row) {
      this[fun](row)
    },
    mtdCall(fun, item, row) {
      this[fun](item, row)
    },
    fetchData() {
      this.loading = true
      this.$Apis.object.get_headers_by_code(this.proj_code, this.object_code, this.page_code, false).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.headers = response.payload
          if (!this.pntid) {
            this.loading = false
            return
          }
          this.$Apis.object.data_list_by_code(this.proj_code, this.object_code, this.page_code, this.text, this.pagination.page, this.page_size, true, this.filters, this.convert, this.pntfk, this.pntid, this.pnt_clsname).then(response => {
            if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
              this.items = response.payload.items
              this.pagination = response.payload.pagination
              if (this.pagination.total > 0) {
                this.showPage = true
              } else {
                this.showPage = false
              }
              this.loading = false
            } else {
              this.$alert(response.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      })
    },
    get_all_headers() {
      this.$Apis.object.get_headers(this.object_id, true).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.headers_all = response.payload
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
    get_object_info() {
      this.$Apis.object.object_info(this.proj_code, this.object_code).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.object_id = response.payload.object_id
          this.is_view = response.payload.is_view
          // this.innerObjData = JSON.parse(response.payload.design_form)
          this.delete_applycondition = response.payload.delete_applycondition
          this.single_methods = response.payload.single_methods
          this.other_methods = response.payload.other_methods
          this.enable_record = response.payload.enable_record
          this.get_all_headers()
          this.get_method()
          if (!this.page_code) {
            this.can_create = response.payload.can_create
            this.can_view = response.payload.can_view
            this.can_update = response.payload.can_update
            this.can_delete = response.payload.can_delete
            if (this.can_view && !this.is_view) {
              this.cellBtn.push({
                name: '查看',
                action: 'view',
                icon: 'el-icon-view',
                fun: 'info'
              })
            }
            if (this.can_update && !this.is_view) {
              this.cellBtn.push({
                name: '更新',
                action: 'update',
                icon: 'el-icon-edit',
                fun: 'update'
              })
            }
            if (this.can_delete && !this.is_view) {
              this.cellBtn.push({
                name: '删除',
                action: 'remove',
                icon: 'el-icon-delete',
                fun: 'remove'
              })
            }
            this.fetchData()
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
          this.page_id = response.payload.page_id
          this.fetchData()
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    get_method() {
      this.$Apis.object.method_list_by_id(this.object_id).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.loading = false
          this.methodsItems = response.payload.items
          this.get_new_other()
          this.get_new_single()
          if (JSON.stringify(this.newOtherMethods) !== '[]') {
            this.isMultiple = true
          } else {
            this.isMultiple = false
          }
        }
      })
    },
    get_new_other() {
      if (this.other_methods !== null) {
        this.other_methods.forEach(element => {
          this.methodsItems.forEach(item => {
            if (element === item.mtd_id) {
              this.newOtherMethods.push(item)
            }
          })
        })
      }
    },
    get_new_single() {
      if (this.single_methods !== null) {
        this.single_methods.forEach(element => {
          this.methodsItems.forEach(item => {
            if (element === item.mtd_id) {
              this.$set(item, 'name', item.operate_name)
              this.$set(item, 'fun', 'clickType' + item.operate_type)
              this.$set(item, 'isMtd', true)
              this.newSingleMethods.push(item)
            }
          })
        })
      }
    },
    create() {
      // this.$router.push({ name: 'data_create', query: { object_id: this.object_id, pntfk: this.pntfk, pntid: this.pntid }})
      this.dialogCreate = !this.dialogCreate
      this.isCreate = true
      this.objTitle = '新建'
    },
    isCreateShow() {
      this.dialogCreate = !this.dialogCreate
    },
    operateData() {
      this.loading = true
      this.$Apis.object.data_list_by_code(this.proj_code, this.object_code, this.page_code, this.text, this.pagination.page, this.page_size, true, this.filters, this.convert, this.pntfk, this.pntid, this.pnt_clsname).then(response => {
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.items = response.payload.items
          this.pagination = response.payload.pagination
          if (this.pagination.total > 0) {
            this.showPage = true
          } else {
            this.showPage = false
          }
          this.loading = false
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    schfilter() {
      this.pagination.page = 1
      this.operateData()
    },
    handleSizeChange(val) {
      this.page_size = val
      this.operateData()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.operateData()
    },
    handleSelectionChange(val) {
      this.selectionData = val
      this.mtdFilters = []
      this.ids = []
      const selectionLength = val.length
      // 判断是否选中当前页所有行
      if (selectionLength === this.page_size || selectionLength === this.pagination.total) {
        this.isAll = true
      } else {
        this.isAll = false
        val.forEach((item, index) => {
          var filter = []
          this.headers_all.some(element => {
            element['value'] = item[element['prop']]
            if (element['is_primary']) {
              if (element['value']) {
                filter.push(element['prop'] + '=="' + element['value'] + '"')
                this.mtdFilters.push(element['prop'] + '=="' + element['value'] + '"')
                this.ids.push(element['value'])
                return true
              }
            }
          })
        })
      }
    },
    refresh() {
      this.fetchData()
    },
    update(row) {
      let ids = []
      this.update_headers = []
      this.headers_all.forEach(element => {
        if (!element['is_property'] && !element['is_object']) {
          this.update_headers.push(element)
        }
      })
      this.update_headers.some(element => {
        element['value'] = row[element['prop']]
        if (element['is_primary']) {
          if (element['value']) {
            ids.push(element['value'])
            return true
          }
        }
      })
      ids = ids.join(',')
      this.objid = ids
      this.dialogCreate = !this.dialogCreate
      this.isCreate = false
      this.objTitle = '更新'
      this.isEdit = true
    },
    info(row) {
      this.update_headers = []
      let ids = []
      this.headers_all.forEach(element => {
        if (!element['is_property'] && !element['is_object']) {
          this.update_headers.push(element)
        }
      })
      this.update_headers.some(element => {
        element['value'] = row[element['prop']]
        if (element['is_primary']) {
          if (element['value']) {
            ids.push(element['value'])
            return true
          }
        }
      })
      ids = ids.join(',')
      this.objid = ids
      this.dialogCreate = !this.dialogCreate
      this.isCreate = false
      this.objTitle = '查看'
      this.isEdit = false
    },
    remove(row) {
      let ids = []
      this.headers_all.some(element => {
        element['value'] = row[element['prop']]
        if (element['is_primary']) {
          if (element['value']) {
            ids.push(element['value'])
            return true
          }
        }
      })
      ids = ids.join(',')
      this.$confirm('是否删除该信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'confirm-button',
        cancelButtonClass: 'cancel-button'
      }).then(() => {
        if (!ids) {
          this.$alert('该业务类下字段没有设置主键，不允许删除', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        this.$Apis.object.data_delete(this.object_id, ids).then(response => {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.refresh([])
            }
          })
        })
      }).catch(() => {
      })
    },
    query() {
      this.dialogSearch = !this.dialogSearch
    },
    isQueryShow() {
      this.dialogSearch = !this.dialogSearch
    },
    getQueryData(params) {
      const queryparam = []
      params.forEach(item => {
        queryparam.push(Object.values(item).join(''))
      })
      this.$Apis.object.data_list_by_code(this.proj_code, this.object_code, this.page_code, this.text, this.pagination.page, this.page_size, false, this.filters, true, this.pntfk, this.pntid, this.pnt_clsname).then(response => {
        this.loading = true
        if (response.code === this.$Utils.Constlib.ERROR_CODE_OK) {
          this.items = response.payload.items
          this.loading = false
          this.isQueryShow()
        } else {
          this.$alert(response.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    isShow() {
      this.dialogVisible = !this.dialogVisible
    },
    clickType1(item) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      if (JSON.stringify(this.selectionData) === '[]') {
        this.$alert('请选择要操作的条目！', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      // 满足适用条件时执行
      if (item.apply_condition) {
        const arr = this.selectionData.filter(row => {
          return eval(item.apply_condition)
        })
        if (arr.length !== this.selectionData.length) {
          this.$alert('选择的条目中有不能执行的，请去掉再操作！', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }

      const classColumn = {}
      let ids = null
      this.headers_all.forEach(element => {
        if (item.edit_prop.includes(element.prop)) {
          classColumn[element['prop']] = item.editval
        }
      })
      if (this.isAll) {
        ids = {}
      } else {
        ids = this.ids.join(',')
      }
      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          // 修改批量设置的值
          this.$Apis.object.data_update(this.object_id, ids, classColumn, item.mtd_id)
          this.refresh()
        }).catch(() => {})
      } else {
        this.$Apis.object.data_update(this.object_id, ids, classColumn, item.mtd_id)
        this.refresh()
      }
    },
    clickType2(item) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      if (JSON.stringify(this.selectionData) === '[]') {
        this.$alert('请选择要操作的条目！', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      // 满足适用条件时执行
      if (item.apply_condition) {
        const arr = this.selectionData.filter(row => {
          return eval(item.apply_condition)
        })
        if (arr.length !== this.selectionData.length) {
          this.$alert('选择的条目中有不能执行的，请去掉再操作！', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }
      this.mtd_id = item.mtd_id
      this.batchData = JSON.parse(JSON.stringify(this.headers_all))
      this.batchData.forEach(element => {
        if (item.view_prop.includes(element.prop)) {
          element['isview'] = true
        }
        if (item.edit_prop.includes(element.prop)) {
          element['isedit'] = true
        }
      })
      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          this.dialogVisible = !this.dialogVisible
          this.batchVisible = true
          this.dialogTitle = '批量修改'
        }).catch(() => {})
      } else {
        this.dialogVisible = !this.dialogVisible
        this.batchVisible = true
        this.dialogTitle = '批量修改'
      }
    },
    clickType3(item, row) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      this.update_headers = []
      let ids = []
      this.headers_all.forEach(element => {
        if (!element['is_property'] && !element['is_object']) {
          this.update_headers.push(element)
        }
      })
      this.update_headers.some(element => {
        element['value'] = row[element['prop']]
        if (element['is_primary']) {
          if (element['value']) {
            ids.push(element['value'])
            return true
          }
        }
      })
      ids = ids.join(',')
      this.objid = ids
      this.mtd_id = item.mtd_id
      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          this.dialogCreate = !this.dialogCreate
          this.isCreate = false
          this.objTitle = '更新'
          this.isEdit = true
          // this.$router.push({ name: 'data_update', query: { object_id: this.object_id, mtd_id: item.mtd_id, objid: ids, record: this.enable_record }})
        }).catch(() => {})
      } else {
        this.dialogCreate = !this.dialogCreate
        this.isCreate = false
        this.objTitle = '更新'
        this.isEdit = true
        // this.$router.push({ name: 'data_update', query: { object_id: this.object_id, mtd_id: item.mtd_id, objid: ids, record: this.enable_record }})
      }
    },
    clickType4(item, row) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      const url = item.uri
      if (!url) {
        this.$alert('没有URL地址', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      const update_headers = []
      let ids = []
      this.headers_all.forEach(element => {
        if (!element['is_property'] && !element['is_object']) {
          update_headers.push(element)
        }
      })
      update_headers.some(element => {
        element['value'] = row[element['prop']]
        if (element['is_primary']) {
          if (element['value']) {
            ids.push(element['value'])
            return true
          }
        }
      })
      ids = ids.join(',')
      this.params = { object_id: this.object_id, page_id: this.page_id, mtd_id: item.mtd_id, id: ids }

      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          this.$Utils.request({
            url: url,
            method: 'post',
            data: {
              param: Base64.encode(JSON.stringify(this.params))
            }
          }).then((response) => {
            this.$alert(response.payload, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.refresh()
              }
            })
          })
        }).catch(() => {})
      } else {
        this.$Utils.request({
          url: url,
          method: 'post',
          data: {
            param: Base64.encode(JSON.stringify(this.params))
          }
        }).then((response) => {
          this.$alert(response.payload, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.refresh()
            }
          })
        })
      }
    },
    clickType5(item, row) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      const url = item.uri
      if (!url) {
        this.$alert('没有URL地址', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      let newUrl = null
      if (this.$Utils.validate.isExternal(url)) {
        newUrl = url
      } else {
        const update_headers = []
        let ids = []
        this.headers_all.forEach(element => {
          if (!element['is_property'] && !element['is_object']) {
            update_headers.push(element)
          }
        })
        update_headers.some(element => {
          element['value'] = row[element['prop']]
          if (element['is_primary']) {
            if (element['value']) {
              ids.push(element['value'])
              return true
            }
          }
        })
        ids = ids.join(',')
        this.params = { object_id: this.object_id, page_id: this.page_id, mtd_id: item.mtd_id, id: ids }
        var _result = []
        for (var key in this.params) {
          var value = this.params[key]
          if (Array.isArray(value)) {
            value.forEach(function(_value) {
              _result.push(key + '=' + _value)
            })
          } else if (value === null) {
            _result.push(key + '=')
          } else {
            _result.push(key + '=' + value)
          }
        }

        const params = url.split('?')[1] || ''
        if (params) {
          newUrl = url + '&param=' + Base64.encode(_result.join('&'))
        } else {
          newUrl = url + '?param=' + Base64.encode(_result.join('&'))
        }
      }

      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          if (item.uriopentype === '0') {
            window.open(newUrl, '_blank')
          } else {
            this.$Utils.util.routerGo(newUrl)
          }
        }).catch(() => {})
      } else {
        if (item.uriopentype === '0') {
          window.open(newUrl, '_blank')
        } else {
          this.dialogMtd = !this.dialogMtd
          this.mtdTitle = item.operate_name
          this.mtd_get_url = newUrl
        }
      }
    },
    clickType6(item) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      const url = item.uri
      if (JSON.stringify(this.selectionData) === '[]') {
        this.$alert('请选择要操作的条目！', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      if (!url) {
        this.$alert('没有URL地址', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      // 满足适用条件时执行
      if (item.apply_condition) {
        const arr = this.selectionData.filter(row => {
          return eval(item.apply_condition)
        })
        if (arr.length !== this.selectionData.length) {
          this.$alert('选择的条目中有不能执行的，请去掉再操作！', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }

      let ids = []
      this.selectionData.forEach((item, index) => {
        this.headers_all.some(element => {
          element['value'] = item[element['prop']]
          if (element['is_primary']) {
            if (element['value']) {
              ids.push(element['value'])
              return true
            }
          }
        })
      })
      ids = ids.join(',')
      this.params = { object_id: this.object_id, page_id: this.page_id, ids: ids, mtd_id: item.mtd_id }


      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          this.$Utils.request({
            url: url,
            method: 'post',
            data: {
              param: Base64.encode(JSON.stringify(this.params))
            }
          }).then((response) => {
            this.$alert(response.payload, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.refresh()
              }
            })
          })
        }).catch(() => {})
      } else {
        this.$Utils.request({
          url: url,
          method: 'post',
          data: {
            param: Base64.encode(JSON.stringify(this.params))
          }
        }).then((response) => {
          this.$alert(response.payload, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.refresh()
            }
          })
        })
      }
    },
    clickType7(item) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      const url = item.uri
      if (JSON.stringify(this.selectionData) === '[]') {
        this.$alert('请选择要操作的条目！', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      if (!url) {
        this.$alert('没有URL地址', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      // 满足适用条件时执行
      if (item.apply_condition) {
        const arr = this.selectionData.filter(row => {
          return eval(item.apply_condition)
        })
        if (arr.length !== this.selectionData.length) {
          this.$alert('选择的条目中有不能执行的，请去掉再操作！', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }
      let newUrl = null
      if (this.$Utils.validate.isExternal(url)) {
        newUrl = url
      } else {
        const ids = []
        this.selectionData.forEach((item, index) => {
          this.headers_all.some(element => {
            element['value'] = item[element['prop']]
            if (element['is_primary']) {
              if (element['value']) {
                ids.push(element['value'])
                return true
              }
            }
          })
        })
        this.params = { object_id: this.object_id, page_id: this.page_id, ids: ids, mtd_id: item.mtd_id }

        var _result = []
        for (var key in this.params) {
          var value = this.params[key]
          if (Array.isArray(value)) {
            value.forEach(function(_value) {
              _result.push(key + '=' + _value)
            })
          } else if (value === null) {
            _result.push(key + '=')
          } else {
            _result.push(key + '=' + value)
          }
        }

        const params = url.split('?')[1] || ''
        if (params) {
          newUrl = url + '&param=' + Base64.encode(_result.join('&'))
        } else {
          newUrl = url + '?param=' + Base64.encode(_result.join('&'))
        }
      }

      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          if (item.uriopentype === '0') {
            window.open(newUrl, '_blank')
          } else {
            this.$Utils.util.routerGo(newUrl)
          }
        }).catch(() => {})
      } else {
        if (item.uriopentype === '0') {
          window.open(newUrl, '_blank')
        } else {
          // this.$Utils.util.routerGo(newUrl)
          this.dialogMtd = !this.dialogMtd
          this.mtdTitle = item.operate_name
          this.mtd_get_url = newUrl
        }
      }
    },
    clickType8(item) {
      // 如果有注入JavaScript代码，先注入JS代码
      if (item.append_script) {
        this.add_script(item.append_script)
      }
      const url = item.uri
      if (!url) {
        this.$alert('没有URL地址', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      let newUrl = null
      this.params = { r_pntfk: this.pntfk, r_pntid: this.pntid, r_pnt_clsname: this.pnt_clsname }

      if (this.$Utils.validate.isExternal(url)) {
        newUrl = url
      } else {
        var _result = []
        for (var key in this.params) {
          var value = this.params[key]
          if (Array.isArray(value)) {
            value.forEach(function(_value) {
              _result.push(key + '=' + _value)
            })
          } else if (value === null) {
            _result.push(key + '=')
          } else {
            _result.push(key + '=' + value)
          }
        }

        const params = url.split('?')[1] || ''
        if (params) {
          newUrl = url + '&param=' + Base64.encode(_result.join('&'))
        } else {
          newUrl = url + '?param=' + Base64.encode(_result.join('&'))
        }
      }

      if (item.confirm_msg) {
        this.$confirm(item.confirm_msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          cancelButtonClass: 'cancel-button'
        }).then(() => {
          if (item.uriopentype === '0') {
            this.$Utils.request({
              url: url,
              method: 'post',
              data: {
                param: Base64.encode(JSON.stringify(this.params))
              }
            }).then((response) => {
              this.$alert(response.payload, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.refresh()
                }
              })
            })
          } else if(item.uriopentype === '1') {
            window.open(newUrl, '_blank')
          } else {
            this.$Utils.util.routerGo(newUrl)
          }
        }).catch(() => {})
      } else {
        if (item.uriopentype === '0') {
          this.$Utils.request({
            url: url,
            method: 'post',
            data: {
              param: Base64.encode(JSON.stringify(this.params))
            }
          }).then((response) => {
            this.$alert(response.payload, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.refresh()
              }
            })
          })
        } else if(item.uriopentype === '1') {
          window.open(newUrl, '_blank')
        } else {
          this.$Utils.util.routerGo(newUrl)
        }
      }
    },
    add_script(code) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = code
      document.head.appendChild(script)
    }
  }
}
</script>
<style lang="scss" scoped>
.outer-object {
  &.is-disabled::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    cursor: no-drop;
    background: rgba(255,255,255,.5);
    z-index: 100;
  }
  & /deep/ .el-form-item {
    margin-bottom: 22px;
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
