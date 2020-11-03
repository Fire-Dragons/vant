this.helpers.refs:获取字段绑定的控件
this.helpers.instances:获取字段绑定的this对象
this.helpers.itemRefs:获取字段整行绑定的控件(即el-form-item)
this.helpers.itemInstances:获取字段整行绑定的this对象(即el-form-item)
this.helpers.generate.formValue
## 表单显示:
	this.helpers.itemInstances.xx.show = true
## 表单隐藏:
	this.helpers.itemInstances.xx.show = false
## 取值:
	this.helpers.itemInstances.xx.dataModel
	this.helpers.itemRefs.xx.fieldValue
	this.helpers.refs.xx.value
	this.helpers.instances.xx.value
	this.helpers.instances.xx.dataModel
## 赋值:
	this.helpers.itemInstances.xx.dataModel = xx
	this.helpers.instance(xx).dataModel = xx
## 必填:
	移除rules中对应的规则
	this.helpers.generate.rules.xx = []
	添加规则
	this.helpers.generate.rules.xx = [{‘required’:true,’message’:’必须填写’}]
	移除*号
	this.helpers.itemRefs.xx.$el.classList.remove("is-required")
	添加*号
	this.helpers.itemRefs.xx.$el.classList.add("is-required")
	或者设置校验规则后隐藏，再显示出来则校验规则生效
## 调用事件:
	this.helpers.refs.xx.$listeners.event_name(args)
	this.helpers.instances.xx.events.event_name(args)