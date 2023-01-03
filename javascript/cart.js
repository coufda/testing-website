let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="200" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>Položka: ${search.name}</p>
                <p class="cart-item-price">Cena: $ ${search.price}</p>
              </h4>
          </div>

          <div class="buttons">
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              <div id=${id} class="quantity">${item}</div>
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          </div>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <div id="cart_text_empty">
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn btn btn-outline-info">Back to homepage</button>
    </a>
    </div>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button onclick="clearCart()" class="removeAll btn btn-outline-primary">Clear Cart</button>
    <a href="index.html">
      <button class="HomeBtn btn btn btn-outline-info">Back to homepage</button>
    </a>
    <a href="thank_you_page.html";" class="btn btn-outline-secondary btn-purchase">PURCHASE</a>
    
    `;
  } else return;
};

TotalAmount();

/*<a href="thank_you_page.html";" onclick="clearCart()"class="btn btn-outline-secondary btn-purchase">PURCHASE</a>*/

