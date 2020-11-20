let btn = document.querySelector("#btn");
btn.onclick=function(){
    let username = document.getElementById("username").value;
    let password = document.querySelector("#password").value;
    axios({
        method:"POST",
        url:"http://localhost:6060/api/blogLogin",
        data:{
            "loginId":username,
            "loginPwd":password
        }
    }).then(res=>{
       if(res.data.data){
        window.location.href='http://localhost:6060/admin.html'
       }else{
        alert("信息错误")
       }
    }).catch(() =>{
        alert("信息错误")
    })
}