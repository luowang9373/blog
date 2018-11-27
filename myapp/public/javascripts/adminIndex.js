window.onload=function(){
  document.getElementById('exit').onclick=function(){
    var r=confirm("退出登录？")
    if (r==true){
      axios.post('/api/exit')
      .then(function (res) {
        if(res.data.exit){
          window.location.href="/login";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  document.getElementById('addTitle').onclick=function(){
    window.location.href="/admin/editJournal";
  }
}
function amendArticle(e){
  var id = e.getAttribute('data-id');
  window.location.href="/admin/editJournal?id="+id;
}
function deleteArticle(e){
  console.log(e.getAttribute('data-id'))
}