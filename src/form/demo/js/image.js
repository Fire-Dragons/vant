/** 图片压缩，默认同比例压缩
* @module image.js
* 图片对象
* 回调函数有一个参数，base64的字符串数据
*/
export function compress(fileObj, callback) {
  try {
    const image = new Image()
    image.src = URL.createObjectURL(fileObj)
    image.onload = function() {
      const that = this
      // 默认按比例压缩
      let w = that.width
      let h = that.height
      const scale = w / h
      w = fileObj.width || w
      h = fileObj.height || (w / scale)
      let quality = 0.7 // 默认图片质量为0.7
      // 生成canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      const anw = document.createAttribute('width')
      anw.nodeValue = w
      const anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      // 图像质量
      if (fileObj.quality && fileObj.quality <= 1 && fileObj.quality > 0) {
        quality = fileObj.quality
      }
      // quality值越小，所绘制出的图像越模糊
      const data = canvas.toDataURL('image/jpeg', quality)
      // 压缩完成执行回调
      // const newFile = convertBase64UrlToBlob(data)
      // getBase64(newFile).then(response => {
      //   callback(response.result)
      // })
      callback(data)
    }
  } catch (e) {
    console.log('压缩失败!')
  }
}
export function convertBase64UrlToBlob(urlData) {
  const parts = urlData.split(';base64,')
  let contentType = parts[0].split(':')[1]
  var raw = window.atob(parts[1])
  if (!contentType) {
    contentType = 'image/png'
  }
  const rawLength = raw.length
  const ab = new ArrayBuffer(rawLength)
  const uInt8Array = new Uint8Array(ab)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}
export function getBase64(file) {
  // 把图片转成base64编码
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      // 图片转base64完成后返回reader对象
      resolve(reader)
    }
    reader.onerror = reject
  })
}
