window.onload=function(){
  document.getElementById('loginBtn').onclick=function(){
    var userName = document.getElementById('userNameInput').value;
    var passWord = document.getElementById('passWordInput').value;
    axios.post('/api/login', {
      userName: userName,
      passWord: passWord
    })
    .then(function (res) {
      if(res.data.login){
        window.location.href="/admin/index";
      }else{
        alert('用户名或密码错误');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
