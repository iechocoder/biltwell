$(document).ready(function () {

  $('.template-product form[action="/cart/add"]').on('submit', function (evt) {
    evt.preventDefault();

    var $form = $(this);
    var variant = parseInt($form.find('input[name="id"]').val());
    var quantity = parseInt($form.find('#quantity').val());

    console.log(variant, quantity);

    if (variant = '') {
      console.log('!variant.length')
      return false;
    }

    // if (!quantity || (typeof variant != 'number') || (typeof quantity != 'number')) {
    //   alert('Please provide a valid variant ID and quantity.');
    //   return false;
    // }

    jQuery.post(
      '/cart/add.js',
      $('form[action="/cart/add"].primary-product-form').serialize(),
      function (data) {
        console.log(data);
      }
    ).done(function(data){
      console.log('done', data);
    });

    // $('.cart-sidebar').addClass('active');
    // close cart side bar
    // $(".back-sidebar").on('click', function () {
    //     $(".cart-sidebar").removeClass('active');
    //     return false;
    // });
  });

  // $('.product__add-to-cart').on('click', function (e) {
  //     e.preventDefault();
  //     $('.cart-sidebar').addClass('active');
  // });

  // $('.nav-link').on('click', function () {
  //     $(".cart-sidebar").addClass('active');
  //     return false;
  // });

  // // close cart side bar
  // $(".back-sidebar").on('click', function () {
  //     $(".cart-sidebar").removeClass('active');
  //     return false;
  // });
});