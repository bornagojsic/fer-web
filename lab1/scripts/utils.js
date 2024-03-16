const storage = window.localStorage;

const CartManager = {
  get: function () {
    cart = storage.getItem('cart');
    if (cart === "undefined" || cart === undefined || cart === null || cart === "null") {
      return [];
    }
    return JSON.parse(cart);
  },
  set: function (cart) {
    storage.setItem('cart', JSON.stringify(cart));
  },
  setCartQuantity: function () {
    const cart = this.get();
    const cartQuantity = cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
    const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
    brojProizvodaUKosarici.innerHTML = cartQuantity;
    if (cartQuantity === 0) {
      return;
    }
    brojProizvodaUKosarici.classList.remove('hidden');
  },
  addProduct: function (product) {
    const cart = this.get();
    for (cartProduct of cart) {
      if (cartProduct.product.name === product.name) {
        cartProduct.quantity++;
        this.set(cart);
        console.log("added to same item in cart", cart);
        this.setCartQuantity();
        return;
      }
    }
    cart.push({ product: product, quantity: 1 });
    const brojProizvodaUKosarici = document.getElementById('broj-proizvoda-u-kosarici');
    brojProizvodaUKosarici.innerHTML = 1;
    brojProizvodaUKosarici.classList.remove('hidden');
    console.log("added to cart", cart);
    this.set(cart);
  },
  removeProduct: function (product) {
    const cart = this.get();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.name === product.name) {
        cart[i].quantity--;
        if (cart[i].quantity === 0) {
          cart.splice(i, 1);
        }
        this.set(cart);
        return;
      }
    }
  },
  clear: function () {
    this.set([]);
  }
};

const createProduct = (product) => {
  const productElement = document.createElement('div');
  let productCount = 0;
  if (CartManager.get().find(cartProduct => cartProduct.product.name === product.name)) {
    productCount = CartManager.get().find(cartProduct => cartProduct.product.name === product.name).quantity;
  }
  productElement.innerHTML = `
    <div class="img-container">
      <img src="images/${product.image}" alt="${product.name}" />
      <p class="cart hidden">🛒</p>
      <p class="product-count${productCount === 0 ? " hidden" : ""}">${productCount}</p>
    </div>
    <h3>${product.name}</h3>
  `;
  productElement.classList.add('proizvod');
  productElement.onclick = () => {
    CartManager.addProduct(product);
    const productCountP = productElement.getElementsByClassName('product-count')[0];
    productCountP.classList.remove('hidden');
    productCountP.innerHTML = parseInt(productCountP.innerHTML) + 1;
  };
  productElement.onmouseover = () => {
    productElement.getElementsByClassName('cart')[0].classList.remove('hidden');
  };
  productElement.onmouseout = () => {
    productElement.getElementsByClassName('cart')[0].classList.add('hidden');
  };
  return productElement;
};

const renderProducts = (category) => {
  const productsContainer = document.getElementById('proizvodi');
  productsContainer.innerHTML = '';
  category.products.forEach(product => {
    productsContainer.appendChild(createProduct(product));
  });
};

const changeCurrentCategory = (category) => {
  const currentCategoryElement = document.getElementById('trenutna-kategorija');
  currentCategoryElement.innerHTML = category.name;
  for (categoryElement of document.getElementsByClassName('kategorija')) {
    categoryElement.classList.remove('odabrana');
    console.log(categoryElement.innerHTML, category.name, categoryElement.innerHTML.includes(category.name))
    if (categoryElement.innerHTML.includes(category.name.replace('&', '&amp;'))) {
      categoryElement.classList.add('odabrana');
    }
  }
};

const createCategory = (category) => {
  const categoryElement = document.createElement('div');
  categoryElement.innerHTML = `
    <p>${category.name}</p>
  `;
  categoryElement.classList.add('kategorija');
  categoryElement.onclick = () => {
    currentCategory = category;
    renderProducts(category);
    changeCurrentCategory(category);
  };
  return categoryElement;
};

const renderCategories = (currentCategory) => {
  const categoriesContainer = document.getElementById('kategorije');
  data.categories.forEach(category => {
    categoriesContainer.appendChild(createCategory(category));
    if (category.name === currentCategory.name) {
      categoriesContainer.lastChild.classList.add('odabrana');
    }
  });
};

const addProductsToCart = () => {
  const cart = CartManager.get();
  for (cartProduct of cart) {
    const product = cartProduct.product;
    const productElement = document.getElementsByClassName('proizvod').find(element => element.innerHTML.includes(product.name));
    const productCountP = productElement.getElementsByClassName('product-count')[0];
    productCountP.classList.remove('hidden');
    productCountP.innerHTML = cartProduct.quantity;
  }
};

const redirect = (url) => {
  const cart = CartManager.get();
  const cartQueryParams = window.btoa(JSON.stringify(cart));
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('cart', cartQueryParams);
  window.location = `${url}?${urlSearchParams.toString()}`;
};

const loadCart = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const cartQueryParams = urlSearchParams.get('cart');
  if (cartQueryParams) {
    CartManager.set(JSON.parse(window.atob(cartQueryParams)));
  }
  CartManager.setCartQuantity();
  if (window.location.pathname.endsWith('/cart.html')) {
    proizvodiUKosarici = document.getElementById('proizvodi-u-kosarici');
    console.log(CartManager.get());
    console.log(proizvodiUKosarici);
    for (cartProduct of CartManager.get()) {
      const product = cartProduct.product;
      // const productElement = createProduct(product);
      // productElement.getElementsByClassName('cart')[0].classList.add('hidden');
      // productElement.getElementsByClassName('product-count')[0].classList.remove('hidden');
      // productElement.getElementsByClassName('product-count')[0].innerHTML = cartProduct.quantity;
      // proizvodiUKosarici.appendChild(productElement);
    }
  }
};