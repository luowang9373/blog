var E = window.wangEditor;
var editor = new E( document.getElementById('editor') );
// 自定义菜单配置
editor.customConfig.menus = [
  'head',  // 标题
  'bold',  // 粗体
  'fontSize',  // 字号
  'fontName',  // 字体
  'italic',  // 斜体
  'underline',  // 下划线
  'strikeThrough',  // 删除线
  'foreColor',  // 文字颜色
  'backColor',  // 背景颜色
  'link',  // 插入链接
  'list',  // 列表
  'justify',  // 对齐方式
  'quote',  // 引用
  'emoticon',  // 表情
  'image',  // 插入图片
  'table',  // 表格
  'video',  // 插入视频
  'code',  // 插入代码
  'undo',  // 撤销
  'redo'  // 重复
]
// 关闭粘贴样式的过滤
editor.customConfig.pasteFilterStyle = false
// 忽略粘贴内容中的图片
editor.customConfig.pasteIgnoreImg = true
// 自定义处理粘贴的文本内容
editor.customConfig.pasteTextHandle = function (content) {
    // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
    return content
}
// 自定义配置颜色（字体颜色、背景色）
editor.customConfig.colors = [
    '#000000'
]
editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
editor.create();
document.getElementById('btn1').addEventListener('click', function () {
    // 读取 html
    alert(editor.txt.html())
}, false)

//document.getElementById('btn2').addEventListener('click', function () {
//  // 读取 text
//  alert(editor.txt.text())
//}, false)