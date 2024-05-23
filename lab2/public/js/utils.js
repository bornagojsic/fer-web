const changeCurrentCategory = (element) => {
  const categoryName = element.dataset.categoryName;
  console.log('Category changed to:', categoryName);

  fetch('/change-category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category: categoryName })
  })
    .then(response => response.json())
    .then(data => {
      redirect('/');
    });
};

const addProduct = (element) => {
  const productName = element.dataset.productName;
  console.log('Product added:', productName);

  fetch('/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productName })
  })
    .then(response => response.json())
    .then(data => {
      if (data.cart.length === 0) {
        return;
      }

      const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
      brojProizvodaUKosarici.innerHTML = data.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
      brojProizvodaUKosarici.classList.remove('hidden');

      const productCountP = element.getElementsByClassName('product-count')[0];
      productCountP.classList.remove('hidden');
      if (productCountP.innerHTML == 0) {
        productCountP.innerHTML = 1;
        return;
      }
      productCountP.innerHTML = parseInt(productCountP.innerHTML) + 1;
    });
};

const addToCart = (element) => {
  const productName = element.dataset.productName;
  console.log('Product added:', productName);

  fetch('/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productName })
  })
    .then(response => response.json())
    .then(data => {
      if (data.cart.length === 0) {
        return;
      }

      const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
      brojProizvodaUKosarici.innerHTML = data.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
      brojProizvodaUKosarici.classList.remove('hidden');

      const productCountP = element.parentElement.getElementsByClassName('product-quantity')[0];
      if (productCountP.innerHTML == 0) {
        productCountP.innerHTML = 1;
        return;
      }
      productCountP.innerHTML = parseInt(productCountP.innerHTML) + 1;
    });
};

const removeFromCart = (element) => {
  const productName = element.dataset.productName;
  console.log('Product removed:', productName);

  fetch('/cart/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productName })
  })
    .then(response => response.json())
    .then(data => {
      const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
      brojProizvodaUKosarici.innerHTML = data.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
      if (brojProizvodaUKosarici.innerHTML == 0) {
        brojProizvodaUKosarici.classList.add('hidden');
      }
      
      const productCountP = element.parentElement.getElementsByClassName('product-quantity')[0];
      productCountP.innerHTML = parseInt(productCountP.innerHTML) - 1;
      if (productCountP.innerHTML == 0) {
        const quantityDiv = element.parentElement;
        const productDiv = quantityDiv.previousElementSibling;
        quantityDiv.remove();
        productDiv.remove();
      }
    });
};

const redirect = (url) => {
  window.location = url;
};