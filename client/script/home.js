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
  if (!localStorage.getItem('token')) window.location = 'index.html'

  $('#welcome').text(`Welcome, ${Auth.getUser().username}`)
  $('#img_profile').attr("src", `http://localhost:3000/photos/${Auth.getUser().photo}`)

  //process new data description
  $('#btn-add').on('click', function(e){
    e.preventDefault()
    processNewDescription()
  })

  showAllData()

  //process logout
  $('#logout').on('click', function(e){
    e.preventDefault()
    processLogout()
  })
})

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
                <button type="button" class="btn btn-default btn-sm pull-right">
                  <span class="glyphicon glyphicon-remove"></span> Remove
                </button>
                <button type="button" class="btn btn-default btn-sm pull-right">
                  <span class="glyphicon glyphicon-pencil"></span> Edit
                </button>
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

function processNewDescription(){
  console.log(Auth.getUser());
  var new_desc = {
    title: $('#description-form #title').val(),
    content: $('#description-form #content').val(),
    looking_for: $('#description-form #looking_for').val(),
    username: Auth.getUser().username,
    photos: Auth.getUser().photo
  }

  $.post({
    url: 'http://localhost:3000/api/descriptions',
    data: new_desc,
    success: function(new_data){
      console.log(new_data);
      var data_HTML = `
      <div class="content-section-a">
        <div class="container">
            <div class="row">
                <button type="button" class="btn btn-default btn-sm pull-right">
                  <span class="glyphicon glyphicon-remove"></span> Remove
                </button>
                <button type="button" class="btn btn-default btn-sm pull-right">
                  <span class="glyphicon glyphicon-pencil"></span> Edit
                </button>
                <div class="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                    <hr class="section-heading-spacer">
                    <div class="clearfix"></div>
                    <h2 class="section-heading">${new_data.title}</h2>
                    <p class="lead">${new_data.content}</p>
                    <p class="lead">I'm looking for : ${new_data.looking_for}</p>
                    <p class="lead">Username: ${new_data.username}</p>
                </div>
                <div class="col-lg-5 col-sm-pull-6  col-sm-6">
                    <img class="img-responsive" src="http://localhost:3000/photos/${new_data.photos}">
                </div>
            </div>
        </div>
      </div>
      `

      $('#content').prepend(data_HTML)

      $('#description-form #title').val('')
      $('#description-form #content').val('')
      $('#description-form #looking_for').val('')
    }
  })
}

function processLogout(){
  localStorage.removeItem('token')
  window.location = 'index.html'
}
