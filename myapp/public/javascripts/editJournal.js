window.onload = function(){
  var E = window.wangEditor;
  var editor = new E('#editor');
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
  editor.txt.html(articleData[0].details);
  
  document.getElementById('btn').addEventListener('click', function () {
    var data={
      title:document.getElementById('articleTitle').value,
      id:articleData[0].id,
      intro:document.getElementById('articleAbstract').value,
      details:editor.txt.html()
    }
    if(!data.title){
      alert('请输入标题');
      return
    }
    if(!data.intro){
      alert('请输入简介');
      return
    }
    if(!data.details){
      alert('请输入文章内容');
      return
    }
    axios.post('/api/saveJournal',{
      data:data
    })
    .then(function (res) {
      if(res.data.success){
        window.location.href="/admin/index";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, false)

}
