wow = new WOW(
        {
          animateClass: 'animated',
          offset:       100,
          callback:     function(box) {
          }
        }
      );

// wow.init();

$(window).load(function(){

  $(".navbar-toggler").click(function(){
    $(".navbar-toggler").toggleClass("active");
  });

  // restoring clicking
  $('.nav-link, .sub-menu a').click(function(e){
    var new_link = $(this).attr('href');
    var current_width = window.innerWidth;
    /* if it's desktop let the click go through */
    if (new_link !== '#' && current_width > 991){
      window.location.href = new_link;
    }
  })

  $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        directionNav:false,
        asNavFor: '#slider'
      });

  $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel",
        start: function(slider){
          $('body').removeClass('loading');
        }
   });

  // best seller slider on home page
  if ($(window).width() > 1270) {
    $('.bestseller-flexslider').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: 210,
      itemMargin: 5,
      minItems: 2,
      maxItems: 5,
      controlNav: false
    });
  }

  $( document ).ready(function(){
    $('body').addClass('flex-load');
  });

  if ($(window).width() < 1025) {
    $('.bestseller-flexslider').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: 210,
      itemMargin: 5,
      minItems: 2,
      maxItems: 3,
      controlNav: false
    });
  }
  if ($(window).width() < 767) {
    $('.bestseller-flexslider').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: 100,
      itemMargin: 5,
      minItems: 1,
      maxItems: 1,
      controlNav: false,
      move: 1
    });
  }

  $(window).on('resize', function(){
    var win = $(this);
    if (win.width() <= 375) {

      $('.bestseller-flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 100,
        itemMargin: 5,
        minItems: 1,
        maxItems: 1,
        controlNav: false,
        move: 1
      });

    }
});

  // mobile grand child menu
  $('.main-header .navbar-nav li .sub-menu > li > a').click(function() {
    if ($(this).hasClass('active')){
      $(this).removeClass('active');
      $(this).next('.grandchild').hide();
    }else {
      $(this).addClass('active');
      $(this).next('.grandchild').show();
    }
    return false
  });


  // product detail page size chart popup table switch
  $(".chart-links .inches").click(function (){
    $(".centimeter").removeClass('active');
    $(this).addClass('active');
    $(".inchestable").show();
    $(".centitable").hide();
    return false;
  })
  $(".chart-links .centimeter").click(function (){
    $(".inches").removeClass('active');
    $(this).addClass('active');
    $(".centitable").show();
    $(".inchestable").hide();
    return false;
  })

    //Allow only numbers to be typed into qty field.

  $("#quantity").on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
     if ((event.which < 48 || event.which > 57)) {
         event.preventDefault();
     }
 });


  //Ellipsis for description text

  $('.ellipsis-text').each((i,o) => {
    let txt = $(o).text();
    if (txt.length > 134)
         $(o).text(txt.substring(0,134)+'...');
  });



});



$( document ).ready(function(){




$(".radio-custom").change(function () {
    var opt2 = $(this).attr('id');
    $('.onscroll .list-tag').removeClass('active');
    $('.list-tag').removeClass('active');

    $('.list-tag:has(input:radio:checked)').each(function(b){
      $(this).addClass('active');

      var idOpt2 = ".onscroll #" + opt2;
      setTimeout(function(){
        $('.onscroll .list-tag').removeClass('active');
        $(idOpt2).parent().addClass('active');
      }, 100);

    });
    $('.list-tag:has(input:radio:not(:checked))').each(function(c){
      $(this).removeClass('active');
    });

  });

    // ajaxMailChimpForm($('.get-stuff-form form'), $('.get-stuff-form .optin-result-success'), $('.get-stuff-form .optin-result-status'));

    $( "ul.colors-list li" ).hover(
      function() {
        $(this).addClass('active');
        $( '#prcolors' ).append( $( '<span>'+ $(this).attr("value")  +'</span>') );
      }, function() {
        $(this).removeClass('active');
        $( '#prcolors').find( "span:last" ).remove();
      }
    );

    $( "ul.colors-list li.fade" ).hover(function() {
      $( this ).fadeOut( 100 );
      $( this ).fadeIn( 500 );
    });

  //appends an "active" class to .popup and .popup-content when the "Open" button is clicked
  $(".open").on("click", function(){
    $(".size-chart, .chart-inner").addClass("active");
  });
  $(".open-shipping").on("click", function(){
    $(".shipping-chart").addClass("active");
  });
  //removes the "active" class to .popup and .popup-content when the "Close" button is clicked
  $(".close, .size-chart, .shipping-chart").on("click", function(){
    $(".size-chart, .chart-inner, .shipping-chart").removeClass("active");
  });


   $('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.product-quantity input');
    $('.product-quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
    // Product Quanity Function end

  // Smooth Scroll
    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });





});




function ajaxMailChimpForm($form, $successElement, $statusElement) {

    // Hijack the submission. We'll submit the form manually.
    $form.submit(function (e) {
        e.preventDefault();
        var $submitBtn = $form.find('button');

        if ($submitBtn.hasClass('is-processing')) {
            return false;
        }

        $statusElement.css({
            'visibility': 'hidden'
        });

        // Show loader
        $submitBtn.addClass('is-processing');

        if (!isValidEmail($form)) {
            var error = $('.message-email-invalid').first().text();
            $statusElement.html(error);
            $statusElement.css({
                // 'color': '#ff0000',
                'visibility': 'visible'
            });
            $submitBtn.removeClass('is-processing');
        } else {
            submitSubscribeForm($form, $successElement, $statusElement);
        }
    });
}

// Validate the email address in the form
function isValidEmail($form) {
    var email = $form.find("input[type='email']").val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function submitSubscribeForm($form, $successElement, $statusElement) {
    $submitBtn = $form.find('button');

    $.ajax({
        type: "GET",
        url: $form.attr("action"),
        data: $form.serialize(),
        cache: false,
        dataType: "jsonp",
        jsonp: "c", // trigger MailChimp to return a JSONP response
        contentType: "application/json; charset=utf-8",

        error: function (error) {
            // According to jquery docs, this is never called for cross-domain JSONP requests
        },

        success: function (data) {

            if (data.result != "success") {

                var message = data.msg || $('.message-technical-error').first().text();

                if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
                    message = $('.message-already-subscribed').first().text();
                }

                $successElement.hide();
                $statusElement.html(message).css({
                    'visibility': 'visible',
                    'display': 'block'
                });

                $submitBtn.removeClass('is-processing');
            } else {
                $statusElement.hide();
                $successElement.text($('.message-successful-subscription').first().text());

                $submitBtn.removeClass('is-processing');
                $successElement.css({
                    'visibility': 'visible'
                }).fadeIn();

                window.localStorage.setItem('popupShown', 'true');
            }
        }
    });
}
function showpassword() {
  var x = document.getElementById("CreatePassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function showpasswordConfirmation() {
  var x = document.getElementById("CreatePasswordConfirmation");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function redirect_to_page(url){
  location.href=url;
}

$('body').on('click', '.product-description.has-more', function(){
  var currentEl = $(this);
  if (!currentEl) return false;
  if (currentEl.hasClass('expanded')){
    // if already expanded, collapse it
    currentEl.css('height', '');
    currentEl.removeClass('expanded');
  } else {
    // if not expanded, expand it to its entire height
    currentEl.addClass('expanded');
    var domElement = currentEl[0]; // get vanilla javascript object
    if (domElement){
      var fullHeight = domElement.scrollHeight;
      currentEl.css('height', fullHeight+'px');
    }
  }
})

$('#shopify-section-register-template form#create_customer').on('submit', function(e){
  var $passwordInput = $('#CreatePassword');
  var $passwordConfirmationInput = $('#CreatePasswordConfirmation');
  var password = $passwordInput.val();
  var passwordConfirmation = $passwordConfirmationInput.val();
  if (password !== passwordConfirmation){
    $('.account__errors--password').fadeIn('fast');
    e.preventDefault();
    e.stopPropagation();
    return false;
  } else {
    $('.account__errors--password').fadeOut('fast');
  }
});

$(document).ready(function(){
  $('.chocolat').Chocolat({
    imageSize: 'contain'
  });

  var colorSwatches = $('[data-swatch]');
  $.each(colorSwatches, function(index, element) {
    var handle = $(element).data('handle');
    if (window.ColorSwatches && window.ColorSwatches[handle]){
      var image_url = window.ColorSwatches[handle];
      $(element).attr('src', image_url);
    }
  });

  var videoElements = $('[data-video]');
  $.each(videoElements, function(index, element) {
    var iframe_video = $(element);
    var full_url = $(iframe_video).data('video');
    var video_id = youtubeIDparser(full_url);
    if (!video_id) return false;

    var embed_url = 'https://www.youtube.com/embed/' + video_id +'?modestbranding=1&controls=0&rel=0&feature=player_detailpage&VQ=HD1080';
    iframe_video.attr('src', embed_url);
  });
});

function youtubeIDparser(url){
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return false;
  }
}

$('.play-video').click(function() {
  var iframe_container = $('.video-main');
  if($(this).hasClass('is-active')){
    $(this).removeClass('is-active');
    iframe_container.fadeOut();
    $(this).text('Play video');
  } else {
    $(this).addClass('is-active');
    $(this).text('Close video');
    iframe_container.fadeIn();
  }
});
$('.chart-video').click(function(e) {
  e.preventDefault();
  var iframe_container = $('.video-chart');
  $(this).slideUp('fast');
  iframe_container.slideDown('fast');
  return false;
});

/* hide any image in article pages that is not loading */
$(window).load(function() {
  $(".template-article img").each(function(){
     var image = $(this);
     if(image.context.naturalWidth == 0 || image.readyState == 'uninitialized'){
        $(image).unbind("error").hide();
     }
  });
});

var storeLocatorTitle = $('#store-locator-title');
if (storeLocatorTitle && storeLocatorTitle.length > 0){
  storeLocatorTitle.prepend('<img src="//cdn.shopify.com/s/files/1/2593/6580/t/13/assets/flag-black.svg" class="icon-header">');
}