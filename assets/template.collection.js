$(function() {
  $(window).scroll(function () {
    var floatView = $('#wrap-in').height();
    var floatWrapperView = $('#float-conttainer-wrap').height();

    var bannerView = $('#banner-wrap').outerHeight();
    var headerView = $('.header').outerHeight();

    var HeaderHeight =  headerView + bannerView;

    var footerView = $('.footer').outerHeight();
    var docView = $(document).height();
    var windowView = $(window).height();
    
    if ($(this).scrollTop()>=HeaderHeight){
      $('#wrap-in').css('position', 'absolute').animate({ top: $(window).scrollTop()-HeaderHeight+'px'}, 0);
      $('.main-sidebar').addClass('fixed');
      
      if($(this).scrollTop()-HeaderHeight>floatWrapperView-floatView){
        $('#wrap-in').css({ 'top': floatWrapperView-floatView+'px' });
      }
    }
    else {
      $('#wrap-in').css('position', 'static');
      $('.main-sidebar').removeClass('fixed');
    }
  });

  // 
  $("#wrap-in > ul > li.has-children > a").click(function (){
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
    }
    else{
      $("#wrap-in > ul > li.has-children").removeClass('active');
      $(this).parent().addClass('active');
    }
    return false;
  })

  // second level
  $(".has-sub-children > a").click(function (){
    if ($(this).parent().hasClass('sub-active')) {
      $(this).parent().removeClass('sub-active');
    }
    else{
      $(this).parents('.sub-menu').find('li').removeClass('sub-active');
      $(this).parent().addClass('sub-active');
    }
    return false;
  })

});