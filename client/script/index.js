const Auth = {
  getToken: () => {
    return localStorage.getItem('token')
  },
  getUser: () => {
    let token = Auth.getToken()
    if (!token) return {}
    else {
      return jwt_decode(token)
    }
  }
}

$(document).ready(function(){
  // AUTH
  if (localStorage.getItem('token')) window.location = 'home.html'
  //login
  $('#btn-login').on('click', function(e){
    e.preventDefault()
    processLogin()
  })

  //register
  $('#btn-register').on('click', function(e){
    processRegister()
    e.preventDefault()
  })
})

function processRegister(){
  var new_user = {
    username: $('#register-form #username').val(),
    password: $('#register-form #password').val(),
    email: $('#register-form #email').val()
  }
  // $.post({
  //   url: 'http://localhost:3000/api/users',
  //   data: new_user,
  //   success: function(new_user){
  //     // console.log(new_user);
  //     localStorage.setItem('token', new_user.token)
  //     window.location = 'home.html'
  //
  //     $('#register-form #username').val('')
  //     $('#register-form #password').val('')
  //     $('#register-form #email').val('')
  //     $('#register-form #photo').val('')
  //   }
  // })
  $('#register-form').ajaxSubmit({
    error : function(res){
      console.log(`Error: ${res.status}`)
    },
    success : function(new_user){
      console.log(new_user);
      localStorage.setItem('token', new_user.token)
      window.location = 'home.html'
      // $("#show a").attr("href", `http://localhost:3000/photos/${res}`)
      // $("#show img").attr("src", `http://localhost:3000/photos/${res}`).attr("alt", "file uploaded").css("width", "250px")
    }
  })
  // e.preventDefault()
}

function processLogin(){
  var data_login = {
    username: $('#login-form #username').val(),
    password: $('#login-form #password').val()
  }
  $.post({
    url: "http://localhost:3000/api/users/login",
    data: data_login,
    success: function(login_user){
      localStorage.setItem('token', login_user.token)

      if(Auth.getUser().username){
        window.location = 'home.html'
      }else{
        alert('input is wrong')
        localStorage.removeItem('token')
        window.location = 'index.html'
      }
    }
  })
}
