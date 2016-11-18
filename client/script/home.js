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

function processEdit(id){
  var new_desc = {
    title: $('#edit-form #title').val(),
    content: $('#edit-form #content').val(),
    looking_for: $('#edit-form #looking_for :selected').val()
  }

  console.log(new_desc);
  $.ajax({
    url: 'http://localhost:3000/api/descriptions/'+id,
    method: 'PUT',
    data: new_desc,
    success: function(new_data){
      console.log(new_data);
      var data_HTML = `
      <div class="content-section-a" id="${new_data._id}">
      <div class="container">
          <div class="row">
              <div class="col-lg-5 col-lg-offset-1 col-sm-push-6 col-sm-6">
                  <button type="button" class="btn btn-default btn-sm pull-right"  data-toggle="modal" data-target="#modal_delete">
                    <span class="glyphicon glyphicon-remove"></span> Remove
                  </button>
                  <button type="button" class="btn btn-default btn-sm pull-right" data-toggle="modal" data-target="#modal_edit">
                    <span class="glyphicon glyphicon-pencil"></span> Edit
                  </button>

                  <hr class="section-heading-spacer">
                  <div class="clearfix"></div>
                  <h2 class="section-heading">${new_data.title}</h2>
                  <p class="lead">${new_data.content}</p>
                  <p class="lead">I'm looking for : ${new_data.looking_for}</p>
                  <p class="lead">Username: ${new_data.username}</p>

              </div>
              <div class="col-lg-5 col-sm-pull-6 col-sm-6">
                  <img class="img-responsive" src="http://localhost:3000/photos/${new_data.photos}">
              </div>

              <!-- Modal Edit -->
              <div id="modal_edit" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Edit</h4>
                    </div>
                    <div class="modal-body">
                      <form role="form" id="edit-form" autocomplete="off">
                          <div class="form-group">
                            <label for="title">I'm here to</label>
                              <select type="text" name="title" id="title" class="form-control">
                                <option value="I Wants to join startup as a Co-Founder">Join startup as a Co-Founder</option>
                                <option value="I have an idea and I'm looking for a Co-Founder">Have an idea and I'm looking for a Co-Founder</option>
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="content">Describe about me</label>
                              <textarea name="content" id="content" class="form-control" stye="resize:none;" placeholder="Description">${new_data.content}</textarea>
                          </div>
                          <div class="form-group">
                            <label for="looking_for">I'm here looking for</label>
                              <select name="looking_for" id="looking_for" class="form-control"">
                                <option value="CEO">CEO</option>
                                <option value="CTO">CTO</option>
                                <option value="Sales/Marketing">Sales/Marketing</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Coder">Coder</option>
                                <option value="Designer">Designer</option>
                              </select>
                          </div>
                          <input type="submit" id="btn-edit" class="btn btn-custom btn-lg btn-block" value="Edit" data-dismiss="modal" onclick="processEdit('${new_data._id}')">
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal Edit -->

              <!-- Modal Delete -->
              <div id="modal_delete" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Edit</h4>
                    </div>
                    <div class="modal-body">
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" onclick="processDelete('${new_data._id}')" data-dismiss="modal">Yes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal Delete -->
          </div>
      </div>
      </div>

      `
      $(`#${new_data._id}`).replaceWith(data_HTML)
      $('.modal-backdrop.fade.in').remove()
    }
  })

}

function processDelete(id){
  $.ajax({
    url: 'http://localhost:3000/api/descriptions/'+id,
    method: "DELETE",
    success: function(deleted_data){
      $(`#${deleted_data._id}`).remove()
      $('.modal-backdrop.fade.in').hide()

    }
  })
}

function showAllData(){
  $.ajax({
    url: 'http://localhost:3000/api/descriptions',
    success : function(all_data){
      console.log(all_data);

      $('#modal_edit').remove()
      $('#modal_delete').remove()
      var data_HTML = ''
      for (var i = 0; i < all_data.length; i++) {
        data_HTML += `
        <div class="content-section-a" id="${all_data[i]._id}">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-lg-offset-1 col-sm-push-6 col-sm-6">
                    <button type="button" class="btn btn-default btn-sm pull-right"  data-toggle="modal" data-target="#modal_delete">
                      <span class="glyphicon glyphicon-remove"></span> Remove
                    </button>
                    <button type="button" class="btn btn-default btn-sm pull-right" data-toggle="modal" data-target="#modal_edit">
                      <span class="glyphicon glyphicon-pencil"></span> Edit
                    </button>

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

                <!-- Modal Edit -->
                <div id="modal_edit" class="modal fade" role="dialog">
                  <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit</h4>
                      </div>
                      <div class="modal-body">
                        <form role="form" id="edit-form" autocomplete="off">
                            <div class="form-group">
                              <label for="title">I'm here to</label>
                                <select type="text" name="title" id="title" class="form-control" value="${all_data[i].title}">
                                  <option value="I Wants to join startup as a Co-Founder">Join startup as a Co-Founder</option>
                                  <option value="I have an idea and I'm looking for a Co-Founder">Have an idea and I'm looking for a Co-Founder</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="content">Describe about me</label>
                                <textarea name="content" id="content" class="form-control" stye="resize:none;" placeholder="Description">${all_data[i].content}</textarea>
                            </div>
                            <div class="form-group">
                              <label for="looking_for">I'm here looking for</label>
                                <select name="looking_for" id="looking_for" class="form-control"  value="${all_data[i].title}">
                                  <option value="CEO">CEO</option>
                                  <option value="CTO">CTO</option>
                                  <option value="Sales/Marketing">Sales/Marketing</option>
                                  <option value="Full Stack Developer">Full Stack Developer</option>
                                  <option value="Coder">Coder</option>
                                  <option value="Designer">Designer</option>
                                </select>
                            </div>
                            <input type="submit" id="btn-edit" class="btn btn-custom btn-lg btn-block" value="Edit" data-dismiss="modal" onclick="processEdit('${all_data[i]._id}')">
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal Edit -->

                <!-- Modal Delete -->
                <div id="modal_delete" class="modal fade" role="dialog">
                  <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit</h4>
                      </div>
                      <div class="modal-body">
                        <p>Are you sure want to delete?</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-danger" onclick="processDelete('${all_data[i]._id}')">Yes</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal Delete -->
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
    looking_for: $('#description-form #looking_for :selected').val(),
    username: Auth.getUser().username,
    photos: Auth.getUser().photo
  }
  console.log(new_desc);
  $.post({
    url: 'http://localhost:3000/api/descriptions',
    data: new_desc,
    success: function(new_data){
      console.log(new_data);
      var data_HTML = `
      <div class="content-section-a" id="${new_data._id}">
      <div class="container">
          <div class="row">
              <div class="col-lg-5 col-lg-offset-1 col-sm-push-6 col-sm-6">
                  <button type="button" class="btn btn-default btn-sm pull-right"  data-toggle="modal" data-target="#modal_delete">
                    <span class="glyphicon glyphicon-remove"></span> Remove
                  </button>
                  <button type="button" class="btn btn-default btn-sm pull-right" data-toggle="modal" data-target="#modal_edit">
                    <span class="glyphicon glyphicon-pencil"></span> Edit
                  </button>

                  <hr class="section-heading-spacer">
                  <div class="clearfix"></div>
                  <h2 class="section-heading">${new_data.title}</h2>
                  <p class="lead">${new_data.content}</p>
                  <p class="lead">I'm looking for : ${new_data.looking_for}</p>
                  <p class="lead">Username: ${new_data.username}</p>

              </div>
              <div class="col-lg-5 col-sm-pull-6 col-sm-6">
                  <img class="img-responsive" src="http://localhost:3000/photos/${new_data.photos}">
              </div>

              <!-- Modal Edit -->
              <div id="modal_edit" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Edit</h4>
                    </div>
                    <div class="modal-body">
                      <form role="form" id="edit-form" autocomplete="off">
                          <div class="form-group">
                            <label for="title">I'm here to</label>
                              <select type="text" name="title" id="title" class="form-control" value="${new_data.title}">
                                <option value="I Wants to join startup as a Co-Founder">Join startup as a Co-Founder</option>
                                <option value="I have an idea and I'm looking for a Co-Founder">Have an idea and I'm looking for a Co-Founder</option>
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="content">Describe about me</label>
                              <textarea name="content" id="content" class="form-control" stye="resize:none;" placeholder="Description">${new_data.content}</textarea>
                          </div>
                          <div class="form-group">
                            <label for="looking_for">I'm here looking for</label>
                              <select name="looking_for" id="looking_for" class="form-control"  value="${new_data.looking_for}">
                                <option value="CEO">CEO</option>
                                <option value="CTO">CTO</option>
                                <option value="Sales/Marketing">Sales/Marketing</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Coder">Coder</option>
                                <option value="Designer">Designer</option>
                              </select>
                          </div>
                          <input type="submit" id="btn-edit" class="btn btn-custom btn-lg btn-block" value="Edit" data-dismiss="modal" onclick="processEdit('${new_data._id}')">
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal Edit -->

              <!-- Modal Delete -->
              <div id="modal_delete" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Edit</h4>
                    </div>
                    <div class="modal-body">
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" onclick="processDelete('${new_data._id}')">Yes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal Delete -->
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
