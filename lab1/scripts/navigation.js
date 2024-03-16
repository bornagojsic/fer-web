const logo = document.getElementById('logo');

logo.onclick = () => {
  redirect('index.html');
};

const cartIcon = document.getElementById('kosarica');

cartIcon.onclick = () => {
  redirect('cart.html');
};