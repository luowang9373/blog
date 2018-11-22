async function a(){
  var n = null;
  await b();
  //await setTimeout(function(){n=2},1000)
  console.log(n)
  function b(){
    setTimeout(function(){n=1},2000)
  }
  return n;
}
a().then((res)=>{
  console.log(res)
})
