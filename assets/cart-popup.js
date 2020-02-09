$(document).ready(function () {
  $('.cart-popup-outer')
    .mouseover(function() {
      // load cart data
      $.ajax({
        type: "GET",
        url: "/cart.js",
        dataType: "json",
        success: function (data) {
          if (typeof data === "object") {
            // populate cart if success
            populateCartPopup(data);
          }
        },
        error: function (data) {
          // console.log(data)
        }
      });      
      // display popup
      var $this = $(this);      
      $this.closest('.cart-overlay').toggle();
      $this.closest('.cart-popup').toggle();
    })
    .mouseout(function() {
      var $this = $(this);
      $this.closest('.cart-overlay').toggle();
      $this.closest('.cart-popup').toggle();
    });

// Remove item from popup
  $(document).on('click', '.cart-popup .remove-cart-btn', function(evt) {
    evt.preventDefault();

    var $this = $(this);
    var line = parseInt($this.data('line'));

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

        // update count of the items in popup header.
        console.log(String(cart.item_count));
        $this.closest('span.items-count').innerHTML = cart.item_count;

        if (cart.item_count == 0) {
          $('.cart-popup .cart-popup-footer').hide();
          $('.cart-popup .empty-cart-msg').show();
        }

        $('.cart-popup .cart-popup-item').each(function(i, item) {
          $(item).find('.remove-cart-btn').data('line', i + 1).attr('href', `href="/cart/change?line=${i + 1}&amp;quantity=0"`);
        });

        $('.cart-popup').find('.subtotal strong:last-child').text(Shopify.formatMoney(cart.total_price));
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error, status = " + textStatus + ", " + "error thrown: " + errorThrown);
      }
    });
  });
});

// populate items in popup cart
function populateCartPopup(cart) {
  // console.log(cart);

  $cart = $('.cart-popup');
  $cartItems = $cart.find('.cart-popup-inner');

  if (cart.item_count != 0) {
    $cart.find('.empty-cart-msg').hide();
  }

  if (!$cartItems.length) {
    $cart.find('.cart-bg-inner').append(`<h2>You have <span class="items-count">${cart.item_count}</span> item(s) in your cart</h2>`);
    $cart.find('.cart-bg-inner').prepend('<div class="cart-popup-inner"></div>');
    $cartItems = $cart.find('.cart-popup-inner');
  }

  // remove all items from cart slider
  $cartItems.empty();

  cart.items.forEach(function(item, i) {
    $cartItems.append(`<div class="cart-popup-item">
          <div class="cart-photo">
              <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cart-desc">
              <h4><a href="${item.url}" class="product-name" data-variant="${item.id}">${item.product_title}</a></h4>
              <div class="selected-item">
                <label>${item.variant_title}</label>
                <input class="qty form-control" type="number" name="updates[]" id="updates_${item.key}" value="${item.quantity}" min="0" aria-label="Item quantity">
              </div>
          </div>
          <div class="cart-item-right">
              <div class="cart-amount">${Shopify.formatMoney(item.price)}</div>
              <div class="remove-cart"><a class="remove-cart remove-cart-btn" href="/cart/change?line=${i + 1}&amp;quantity=0" data-line="${i + 1}">Remove</a></div>
          </div>
        </div>`
    );
  });

  // update cart total

  $cart.find('.subtotal strong:last-child').text(Shopify.formatMoney(cart.total_price));
  $('.cart-popup .cart-popup-footer').show();
}