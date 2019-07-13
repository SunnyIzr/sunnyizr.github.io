var EmailSignUps = {
  submitEmail: function(email){
    $.ajax({
      url: apiUrl + '/email_submissions',
      method: 'post',
      data: {
        email_submission: {
          email: email
        }
      }
    }).done(function(res){
      console.log('success')
    }).error(function(e){
      console.log('error')
    })
  }
}