const catagoryTitleName = document.getElementById("catagoryTitle");
const catagorycardDetails = document.getElementById("cardDetails");
const cartContainerDetails = document.getElementById("cartContainer");
const cartContainertotal = document.getElementById("cartContainerCount");
const mainCards = document.getElementById("mainCard");

let carts = [];
const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const catagory = data.categories;
      displayCatagoryTitle(catagory);
    });
};

// Category Loading Load Tree Categories dynamically on the left side.
const displayCatagoryTitle = (catagory) => {
  catagory.forEach((title) => {
    catagoryTitleName.innerHTML += `
            <p id = "${title.id}" class="text-[#1F2937] font-medium text-base py-2 px-3 cursor-pointer hover:bg-[#1ab352] hover:text-white rounded-md ">
            ${title.category_name}
          </p>
        `;
  });

  // Category Click → Tree Data On clicking a category: load trees of that category.
  catagoryTitleName.addEventListener("click", (e) => {
    if (e.target.localName === "p") {
      [...catagoryTitleName.querySelectorAll("p")].forEach((el) => {
        el.classList.remove("bg-[#15803D]", "text-white");
      });

      e.target.classList.add("bg-[#15803D]", "text-white", "rounded-md");
      loadCatagoryDetails(e.target.id);
      loadSpinnerCatagory();
    }
  });
};

// Display in a 3-column card layout.

const loadCatagoryDetails = (targetId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${targetId}`)
    .then((res) => res.json())
    .then((data) => {
      const dataPlants = data.plants;
      displayLoadCatagoriesDetails(dataPlants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const defaultLoadCatagory = (targetId) => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const dataPlants = data.plants;
      displayLoadCatagoriesDetails(dataPlants);
    });
};

const displayLoadCatagoriesDetails = (details) => {
  catagorycardDetails.innerHTML = "";
  details.forEach((detail) => {
    // console.log(detail);

    catagorycardDetails.innerHTML += `
        <div class="card bg-base-100 shadow-sm p-4  flex flex-col">
          <div id="${detail.id}" class="space-y-3 h-full  flex flex-col">
            <figure class="bg-gray-300 rounded-xl">
              <img src=${detail.image} alt="" class="w-full h-40 object-cover" />
            </figure>

            <h2 onclick= "showModal(${detail.id})" class="cursor-pointer card-title ">${detail.name}</h2>
            <p class=" line-clamp-3">
              ${detail.description}
            </p>
            <div class="flex justify-between items-center">
              <h1
                class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-[400px] font-medium">
                ${detail.category}
              </h1>
              <h1>৳<span>${detail.price}</span></h1>
            </div>

            <button id = "catagoryCardBtn"
              class="btn bg-[#15803D] text-sm text-white rounded-full w-full shadow-none border-none hover:bg-[#13c755]">
              Add to Cart
            </button>
          </div>
        </div>
        
        `;
  });
};

// const countCartContainer = () => {

// }
catagorycardDetails.addEventListener("click", (e) => {
  // console.log(e.target.innerText);
  if (e.target.innerText === "Add to Cart") {
    handleCartContainer(e);
  }
});

const handleCartContainer = (e) => {
  // console.log(e.target);

  const cartTitle = e.target.parentNode.children[1].innerText;
  const cartamount =
    e.target.parentNode.childNodes[7].children[1].children[0].innerText;
  const id = e.target.parentNode.id;
  // console.log(id);

  const parseCartamount = parseInt(cartamount);
  // console.log(parseCartamount);

  carts.push({
    id: id,
    cartTitle: cartTitle,
    parseCartamount: parseCartamount,
  });
  // console.log(carts);

  displayCartContainer(carts);
};

const displayCartContainer = (carts) => {
  // console.log(carts);
  cartContainer.innerHTML = "";

  carts.forEach((cartList) => {
    // console.log(cartList.id);

    // console.log(cartList);

    cartContainerDetails.innerHTML += `
    
    <div class = "flex justify-between items-center bg-[#F0FDF4] rounded-md gap-3 px-2 py-3 shadow-md">
    <div class="space-y-2 ">
    <h1 class="font-semibold text-[15px] font-sans block">${cartList.cartTitle}</h1>
    <p class="text-[#5C5C5C] text-sm">৳${cartList.parseCartamount} x 1</p>
    </div>
    
    
    <div>
    <p onclick="handleDelete('${cartList.id}')" class="text-2xl font-sans text-[#8C8C8C] cursor-pointer">x</p>
    </div>
    
    </div>
    
    
    
    `;
    cartContainertotal.innerHTML = "";
    cartContainertotal.innerHTML += `
    <div  class="flex justify-between items-center">
    <h1 class="font-medium text-base text-[#1F2937]">Total:</h1>
    <p class="font-medium text-base text-[#1F2937]">৳<span>${cartList.parseCartamount}</p>
    </div>
        `;
  });
};

const handleDelete = (deleteId) => {
  const filtered = carts.filter((cartList) => cartList.id !== deleteId);
  carts = filtered;
  displayCartContainer(carts);
};

const showModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCardDetails(data.plants));
};
const displayCardDetails = (card) => {
  console.log(card);

  const detailsBox = document.getElementById("detailsModalContainer");
  detailsBox.innerHTML = "";
  detailsBox.innerHTML += `
      <div class = "p-2 space-y-2">
      <h2 class = "text-2xl font-bold">${card.name}</h2>
     
      <img src=${card.image} alt="" class="w-full h-60 object-cover rounded-lg"/>
      <p> <span class = "text-lg font-semibold"> Category: </span>${card.category}</p>
      <p><span class = "text-lg font-semibold">Price:</span> ৳${card.price}</p>
      <p><span class = "text-base font-semibold">Description:</span> ${card.description}</p>
      </div>
  
  `;
  document.getElementById("card_modal").showModal();
};
loadCatagory();
defaultLoadCatagory();
// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }
