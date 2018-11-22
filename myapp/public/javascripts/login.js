axios.post('/api/login', {
    userName: 'luowang',
    passWord: 'qw!@AS713928'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });