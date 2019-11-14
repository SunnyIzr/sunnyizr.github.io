var AboutPage = {
  init: function(){
    if( ( $('.aboutPage').length > 0 ) ){
      this.launchQAPopUp()
      this.closeQAPopUp()
    }
  },
  launchQAPopUp: function(){
    $('.team').click(function() {
      $('.nav-bar, .aboutPage').addClass('active');
      $('.bio-section.' + this.dataset.member).addClass('active');
      $('.about-us-section.active').removeClass('active');
    });
  },
  closeQAPopUp: function(){
    $('.back-btn').click(function() {
      $('.bio-section.active, .nav-bar.active, .aboutPage.active').removeClass('active');
      $('.about-us-section').addClass('active');
    });
  }
}