(function($){
  $(function(){

    $('.sidenav').sidenav();

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var instance = M.Carousel.init({
      fullWidth: true,
      indicators: true
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space