const logo = document.getElementById('logo');

logo.onclick = () => {
  redirect('/');
};

const cartIcon = document.getElementById('kosarica');

cartIcon.onclick = () => {
  redirect('/cart');
};