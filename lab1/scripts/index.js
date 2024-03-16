document.addEventListener('DOMContentLoaded', loadCart());

let currentCategory = data.categories[0];

changeCurrentCategory(currentCategory);

renderProducts(currentCategory);
renderCategories(currentCategory);