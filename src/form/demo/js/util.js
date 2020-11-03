// 跨应用路由跳转
export const routerGo = (href = '/', title = null, stateObj = {}) => {
  window.history.pushState(stateObj, title, href)
}

export const loadJs = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
  })
}

export const loadCss = (url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    link.onload = () => {
      resolve()
    }
  })
}

export const generateUUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}

export const loadJs_ = (code) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    try {
      script.appendChild(document.createTextNode(code))
    } catch (ex) {
      script.text = code
    }
    script.type = 'text/javascript'
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
  })
}

export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export const generateKeyToTD = (rows) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].columns.length; j++) {
      rows[i].columns[j].key = Math.random().toString(36).slice(-8)
    }
  }

  return rows
}

export default {
  loadJs_,
  loadJs,
  loadCss,
  routerGo,
  generateUUID,
  formatDate,
  generateKeyToTD
}
