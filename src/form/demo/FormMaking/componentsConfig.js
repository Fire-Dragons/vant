export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: null,
      required: false,
      requiredMessage: '',
      dataType: '',
      dataTypeCheck: false,
      dataTypeMessage: '',
      pattern: '',
      patternCheck: false,
      patternMessage: '',
      placeholder: '',
      customClass: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      showPassword: false,
      unit: '',
      textPosition: 'left',
      uppercase: false,
      events: {
        blur: {
          args: ['number'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        focus: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        change: {
          args: ['value'],
          tips: 'value: string | number',
          func_body: '',
          func_name: ''
        }
      },
      conversion: ''
    },
    name_model: { 'label': name, 'prop': null }

  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: null,
      required: false,
      requiredMessage: '',
      disabled: false,
      pattern: '',
      patternMessage: '',
      placeholder: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      events: {
        blur: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        focus: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        change: {
          args: ['value'],
          tips: 'value: string | number',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    options: {
      width: '',
      required: false,
      requiredMessage: '',
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      unit: '',
      events: {
        blur: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        focus: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        change: {
          args: ['currentValue', 'oldValue'],
          tips: 'currentValue, oldValue',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: null,
      showLabel: true,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      requiredMessage: '',
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 选中的 Radio label 值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: true,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      requiredMessage: '',
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 更新后的值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    options: {
      defaultValue: null,
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      requiredMessage: '',
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 组件绑定值。格式与绑定值一致，可受 value-format 控制',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    options: {
      defaultValue: new Date(),
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      requiredMessage: '',
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      event: {},
      change: null,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 组件绑定值。格式与绑定值一致，可受 value-format 控制',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'icon-pingfen1',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      requiredMessage: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      showScore: false,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 改变后的分值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'icon-color',
    options: {
      defaultValue: null,
      disabled: false,
      showAlpha: false,
      required: false,
      requiredMessage: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 当前值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: null,
      defaultLabel: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      requiredMessage: '',
      showLabel: true,
      width: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        }, {
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      pagination: false,
      pageIndex: 1,
      pageSize: 10,
      pageCount: 1,
      remoteSearch: false,
      events: {
        blur: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        focus: {
          args: ['event'],
          tips: 'event: Event',
          func_body: '',
          func_name: ''
        },
        change: {
          args: ['value'],
          tips: 'value: 目前的选中值',
          func_body: '',
          func_name: ''
        },
        clear: {
          args: [],
          tips: '',
          func_body: '',
          func_name: ''
        }
      },
      remoteParams: ''
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      requiredMessage: '',
      disabled: false,
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 改变后的分值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      requiredMessage: '',
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      unit: '',
      events: {
        change: {
          args: ['value'],
          tips: 'value: 改变后的值',
          func_body: '',
          func_name: ''
        },
        input: {
          args: ['value'],
          tips: 'value: 改变后的值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'text',
    name: '文字',
    icon: 'icon-wenzishezhi-',
    options: {
      defaultValue: '这是一段文本',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true

    },
    name_model: { 'label': name, 'prop': null }
  },
  // {
  //   type: 'money',
  //   name: '货币',
  //   icon: 'icon-qian fm-icon',
  //   options: {
  //     width: '100%',
  //     defaultValue: '',
  //     required: false,
  //     pattern: '',
  //     placeholder: '',
  //     customClass: '',
  //     disabled: false,
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true,
  //     unit: ''
  //   },
  //   name_model: { 'label': name, 'prop': null }
  // },
  {
    type: 'carousel',
    name: '走马灯',
    icon: 'icon-input',
    options: {
      // width: '100%',
      height: '',
      defaultValue: null,
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      autoplay: true,
      trigger: 'hover',
      arrow: 'hover',
      direction: 'horizontal',
      interval: '3000',
      list: []
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'html',
    name: 'HTML',
    icon: 'icon-html',
    options: {
      defaultValue: '<b style="color: red;">\n\tThis is a HTML5\n</b>',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true
    }
  },
  {
    type: 'select2',
    name: '表格选择器',
    icon: 'icon-select',
    options: {
      defaultValue: null,
      labelWidth: 100,
      hidden: false,
      dataBind: true,
      multiple: false,
      customClass: '',
      proj_code: null,
      object_code: null,
      page_code: null,
      option: {
        value: '',
        label: ''
      },
      required: false,
      events: {
        change: {
          args: ['value'],
          tips: 'value: 目前的选中值',
          func_body: '',
          func_name: ''
        }
      }
    },
    name_model: { 'label': name, 'prop': null }
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    name: '自定义区域',
    icon: 'icon-zidingyishuju',
    options: {
      defaultType: 'String',
      customClass: '',
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isQuote: false
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'component',
    name: '自定义组件',
    icon: 'icon-component',
    options: {
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      template: '<p>自定义内容</p>',
      required: false,
      isQuote: false,
      name: null
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'fileupload',
    name: '文件',
    icon: 'icon-wenjianshangchuan',
    options: {
      defaultValue: null,
      width: '',
      tip: '',
      action: '/rpcgateway/AttachmentService/save_attachment',
      customClass: '',
      disabled: false,
      limit: 9999,
      fileList: [],
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      multiple: false
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'imgupload',
    name: '图片',
    icon: 'icon-tupian',
    options: {
      defaultValue: null, // 修改默认值类型
      size: {
        width: 100,
        height: 100
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'http://pfp81ptt6.bkt.clouddn.com/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: true, // 修改为true
      min: 0,
      isEdit: true, // 修改为true
      action: '/rpcgateway/AttachmentService/save_attachment', // 修改上传地址
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      limit: false // 新加，是否多选
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'editor',
    name: '编辑器',
    icon: 'icon-fuwenbenkuang',
    options: {
      defaultValue: null,
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike',
          { 'color': [] },
          { 'background': [] },
          { 'align': [] },
          { 'list': 'ordered' },
          { 'list': 'bullet' },
          { 'indent': '-1' },
          { 'indent': '+1' }
        ],
        [{ 'font': [] }, { 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['link', 'image', 'blockquote', 'code-block'],
        [{ 'direction': 'rtl' }],
        ['clean']
      ],
      disabled: false
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'cascader',
    name: '级联选择器',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      emitPath: false,
      required: false,
      remoteParams: '',
      filterable: true,
      lazy: false,
      primary: null // 动态数据主键
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'table',
    name: '子表单',
    icon: 'icon-table',
    options: {
      defaultValue: [],
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false
    },
    tableColumns: [],
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'innerobject',
    name: '内嵌子对象',
    icon: 'icon-table',
    options: {
      defaultValue: [],
      labelWidth: 100,
      hidden: false,
      dataBind: true,
      disabled: false,
      customClass: '',
      proj_code: null,
      object_code: null,
      page_code: null,
      fields: null
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'outerobject',
    name: '外置子对象',
    icon: 'icon-table',
    options: {
      defaultValue: [],
      labelWidth: 100,
      hidden: false,
      dataBind: true,
      disabled: false,
      customClass: '',
      proj_code: null,
      object_code: null,
      page_code: null,
      fields: null
    },
    name_model: { 'label': name, 'prop': null }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'icon-RectangleCopy',
    columns: [
      {
        span: 12,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        list: []
      },
      {
        span: 12,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      customClass: '',
      hidden: false,
      flex: true,
      responsive: false
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'report',
    name: '表格布局',
    icon: 'icon-table1',
    options: {
      customClass: '',
      hidden: false,
      borderWidth: 1,
      borderColor: '#999',
    },
    rows: [
      {
        columns: [
          {
            type: 'td',
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: '',
            },
            list: []
          }
        ]
      }
    ],
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'tabs',
    name: '标签页',
    icon: 'icon-tabs',
    tabs: [
      {
        label: '标签1',
        name: 'tab_1',
        list: []
      }
    ],
    options: {
      type: '',
      tabPosition: 'top',
      customClass: '',
      hidden: false
    },
    name_model: { 'label': name, 'prop': null }
  },
  {
    type: 'divider',
    name: '分割线',
    icon: 'icon-fengexian',
    options: {
      hidden: false,
      contentPosition: 'left'
    },
    name_model: { 'label': name, 'prop': null }
  }
]
