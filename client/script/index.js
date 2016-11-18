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

  showAllData()

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
        // window.location = 'index.html'
      }
    }
  })
}

function showAllData(){
  $.ajax({
    url: 'http://localhost:3000/api/descriptions',
    success : function(all_data){
      console.log(all_data);
      var data_HTML = ''
      for (var i = 0; i < all_data.length; i++) {
        data_HTML += `
        <div class="content-section-a">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-lg-offset-1 col-sm-push-6 col-sm-6">
                    <hr class="section-heading-spacer">
                    <div class="clearfix"></div>
                    <h2 class="section-heading">${all_data[i].title}</h2>
                    <p class="lead">${all_data[i].content}</p>
                    <p class="lead">I'm looking for : ${all_data[i].looking_for}</p>
                    <p class="lead">Username: ${all_data[i].username}</p>

                </div>
                <div class="col-lg-5 col-sm-pull-6 col-sm-6">
                    <img class="img-responsive" src="http://localhost:3000/photos/${all_data[i].photos}">
                </div>
            </div>
        </div>
        </div>
        `
      }

      $('#content').append(data_HTML)
    }
  })
}
