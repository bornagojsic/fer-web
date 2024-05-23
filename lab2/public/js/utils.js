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


const increaseProductCount = (data, productCountP) => {
  if (data.cart.length === 0)
    return;

  const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
  brojProizvodaUKosarici.innerHTML = data.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
  
  try {
    brojProizvodaUKosarici.classList.remove('hidden');
    productCountP.classList.remove('hidden');
  } catch (error) {
    console.log(error);
  }
  
  if (productCountP.innerHTML == 0) {
    productCountP.innerHTML = 1;
    return;
  }
  
  productCountP.innerHTML = parseInt(productCountP.innerHTML) + 1;
}


const decreaseProductCount = (data, productCountP) => {
  const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
  brojProizvodaUKosarici.innerHTML = data.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
  if (brojProizvodaUKosarici.innerHTML == 0) {
    brojProizvodaUKosarici.classList.add('hidden');
  }
  
  productCountP.innerHTML = parseInt(productCountP.innerHTML) - 1;
  if (productCountP.innerHTML == 0) {
    const quantityDiv = productCountP.parentElement;
    const productDiv = quantityDiv.previousElementSibling;
    quantityDiv.remove();
    productDiv.remove();
  }
}


const changeProductCount = (url, element, productCountP, changeFunction) => {
  const productName = element.dataset.productName;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productName })
  })
    .then(response => response.json())
    .then(data => {changeFunction(data, productCountP);});
};


const addProduct = (element) => {
  const productCountP = element.getElementsByClassName('product-count')[0];
  changeProductCount('/cart/add', element, productCountP, increaseProductCount);
};


const addToCart = (element) => {
  const productCountP = element.parentElement.getElementsByClassName('product-quantity')[0];
  changeProductCount('/cart/add', element, productCountP, increaseProductCount);
};


const removeFromCart = (element) => {
  const productCountP = element.parentElement.getElementsByClassName('product-quantity')[0]
  changeProductCount('/cart/remove', element, productCountP, decreaseProductCount);
};


/* Navigation */


const redirect = (url) => {
  window.location = url;
};


const logo = document.getElementById('logo');


logo.onclick = () => {
  redirect('/');
};


const cartIcon = document.getElementById('kosarica');


cartIcon.onclick = () => {
  redirect('/cart');
};