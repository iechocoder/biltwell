$(document).ready(function () {

  $('.nav-link--cart').on('click', function (evt) {
    evt.preventDefault();
    $('.cart-overlay, .cart-popup').toggle();
  });

  $('.cart-overlay').on('click', function () {
    $('.cart-overlay, .cart-popup').hide();
  });

  // Remove item from popup
  $(document).on('click', '.cart-popup .remove-cart-btn', function (evt) {
    evt.preventDefault();

    var $this = $(this);
    var line = parseInt($this.data('line'));

    // remove line-item from car-slider/sidebar as well
    // $('.cart-sidebar .remove-cart-btn[data-line="' + line + '"]').click();

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data: {
        line: line,
        quantity: 0
      },
      dataType: 'json',
      success: function (cart) {
        var $popup = $this.closest('.cart-popup');
        $this.closest('.cart-popup-item').remove();

        populateCartSlider(cart, false);

        // update count of the items in popup header.
        // console.log(String(cart.item_count));
        $popup.find('span.items-count').text(cart.item_count);

        if (cart.item_count == 0) {
          $('.cart-popup .cart-popup-footer').hide();
          $('.cart-popup .empty-cart-msg').show();
        } else {
          $('.cart-popup .cart-popup-item').each(function (i, item) {
            $(item).find('.remove-cart-btn').data('line', i + 1).attr('href', `href="/cart/change?line=${i + 1}&amp;quantity=0"`);
            $('.cart-popup').find('.subtotal strong:last-child').text(Shopify.formatMoney(cart.total_price));
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error, status = " + textStatus + ", " + "error thrown: " + errorThrown);
      }
    });
  });

  $('.template-product form[action="/cart/add"]').on('submit', function (evt) {
    evt.preventDefault();

    var $form = $(this);
    var variant = parseInt($form.find('input[name="id"]').val());
    var quantity = parseInt($form.find('#quantity').val());

    if (variant = '') {
      console.log('!variant.length')
      return false;
    }

    // if (!quantity || (typeof variant != 'number') || (typeof quantity != 'number')) {
    //   alert('Please provide a valid variant ID and quantity.');
    //   return false;
    // }

    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: $form.serialize(),
      dataType: 'json',
      success: function (data) {
        $.ajax({
          type: "GET",
          url: "/cart.js",
          dataType: "json",
          success: function (data) {
            if (typeof data === "object") {
              populateCartSlider(data);
              populateCartPopup(data);
            }
          },
          error: function (data) {
            console.log(data)
          }
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error, status = " + textStatus + ", " + "error thrown: " + errorThrown);
      }
    });
  });

  // $('.product__add-to-cart').on('click', function (e) {
  //     e.preventDefault();
  //     $('.cart-sidebar').addClass('active');
  // });

  // // close cart side bar
  $(".back-sidebar").on('click', function () {
    $(".cart-sidebar").removeClass('active');
    return false;
  });

  $(document).on('click', '.cart-mobile', function(){
    $('.cart-sidebar').addClass('active');
  });

  $(document).on('click', '.cart-sidebar .remove-cart-btn', function (evt) {
    evt.preventDefault();

    var $this = $(this);
    var line = parseInt($this.data('line'));

    // remove line-item from car-popup as well
    // $('.cart-popup .remove-cart-btn[data-line="' + line + '"]').click();

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data: {
        line: line,
        quantity: 0
      },
      dataType: 'json',
      success: function (cart) {
        $this.closest('.cart-popup-item').remove();

        populateCartPopup(cart);

        if (cart.item_count == 0) {
          $('.cart-sidebar .cart-popup-footer').hide();
          $('.cart-sidebar .empty-cart-msg').show();
        }

        $('.cart-sidebar .cart-popup-item').each(function (i, item) {
          $(item).find('.remove-cart-btn').data('line', i + 1).attr('href', `href="/cart/change?line=${i + 1}&amp;quantity=0"`);
        });

        $('.cart-sidebar').find('.subtotal strong:last-child').text(Shopify.formatMoney(cart.total_price));
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error, status = " + textStatus + ", " + "error thrown: " + errorThrown);
      }
    });
  });
});

function populateCartSlider(cart, reveal = true) {
  $cart = $('.cart-sidebar');
  $cartItems = $cart.find('.cart-popup-items');

  if (cart.item_count != 0) {
    $cart.find('.empty-cart-msg').hide();
  } else {
    $cartItems.empty();
    $('.cart-popup .cart-popup-footer').hide();
    $('.cart-popup .empty-cart-msg').show();

    return false;
  }

  if (!$cartItems.length) {
    $cart.find('.cart-sidebar-inner').prepend('<div class="cart-popup-items"></div>');
    $cartItems = $cart.find('.cart-popup-items');
  }

  // remove all items from cart slider
  $cartItems.empty();

  cart.items.forEach(function (item, i) {
    $cartItems.append(`<div class="cart-popup-item">
          <div class="cart-photo">
              <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cart-desc">
              <h4><a href="${item.url}" class="product-name" data-variant="${item.id}">${item.product_title}</a></h4>
              <div class="selected-item">
                <label>${item.variant_title || ''}</label>
                <input class="qty form-control" type="number" name="updates[]" id="updates_${item.key}" value="${item.quantity}" min="0" aria-label="Item quantity">
              </div>
          </div>
          <div class="cart-item-right">
              <div class="cart-amount">${Shopify.formatMoney(item.price)}</div>
              <div class="remove-cart"><a class="remove-cart remove-cart-btn" href="/cart/change?line=${i + 1}&amp;quantity=0" data-line="${i + 1}">Remove</a></div>
          </div>
        </div>`);
  });

  // update cart total
  $cart.find('.subtotal strong:last-child').text(Shopify.formatMoney(cart.total_price));
  $('.cart-sidebar .cart-popup-footer').show();

  if (reveal) {
    // finally reveal the cart slider
    $('.cart-sidebar').addClass('active');
  }
}

// populate items in popup cart
function populateCartPopup(cart) {
  // console.log(cart);
  $cart = $('.cart-popup');
  $cartItems = $cart.find('.cart-popup-inner');

  if (cart.item_count != 0) {
    $cart.find('.empty-cart-msg').hide();
  } else {
    $cartItems.empty();
    $('.cart-popup .cart-popup-footer').hide();
    $('.cart-popup .empty-cart-msg').show();

    return false;
  }

  if (!$cartItems.length) {
    $cart.find('.cart-bg-inner').append(`<h2>You have <span class="items-count">${cart.item_count}</span> item(s) in your cart</h2>`);
    $cart.find('.cart-bg-inner').prepend('<div class="cart-popup-inner"></div>');
    $cartItems = $cart.find('.cart-popup-inner');
  }

  $cart.find('.items-count').text(cart.item_count);

  // remove all items from cart slider
  $cartItems.empty();

  cart.items.forEach(function (item, i) {
    $cartItems.append(`<div class="cart-popup-item">
      <div class="cart-photo">
          <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-desc">
          <h4><a href="${item.url}" class="product-name" data-variant="${item.id}">${item.product_title}</a></h4>
          <div class="selected-item">
            <label>${item.variant_title || ''}</label>
            <input class="qty form-control" type="number" name="updates[]" id="updates_${item.key}" value="${item.quantity}" min="0" aria-label="Item quantity">
          </div>
      </div>
      <div class="cart-item-right">
          <div class="cart-amount">${Shopify.formatMoney(item.price)}</div>
          <div class="remove-cart"><a class="remove-cart remove-cart-btn" href="/cart/change?line=${i + 1}&amp;quantity=0" data-line="${i + 1}">Remove</a></div>
      </div>
    </div>`);
  });

  // update cart total
  $cart.find('.subtotal strong:last-child').text(Shopify.formatMoney(cart.total_price));
  $('.cart-popup .cart-popup-footer').show();
}