const catagoryTitleName = document.getElementById("catagoryTitle");
const catagorycardDetails = document.getElementById("cardDetails");
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
            <p id = "${title.id}" class="text-[#1F2937] font-medium text-base py-2 px-3 cursor-pointer hover:bg-[#15803D] hover:text-white rounded-md ">
            ${title.category_name}
          </p>
        `;
  });

  // Category Click → Tree Data On clicking a category: load trees of that category.
  catagoryTitleName.addEventListener("click", (e) => {
    // console.log(e.target.id);

    if (e.target.localName === "p") {
      [...catagoryTitleName.querySelectorAll("p")].forEach((el) => {
        el.classList.remove("bg-[#15803D]", "text-white");
      });

      e.target.classList.add("bg-[#15803D]", "text-white", "rounded-md");
      loadCatagoryDetails(e.target.id);
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


const displayLoadCatagoriesDetails = (details) => {
    details.forEach(detail => {
        catagorycardDetails.innerHTML += `
        <div class="card bg-base-100 shadow-sm p-4 h-full flex flex-col">
          <div class="space-y-3 h-full flex flex-col">
            <figure class="bg-gray-300 rounded-xl">
              <img src=${detail.image} alt="" class="w-full h-40 object-cover" />
            </figure>

            <h2 class="card-title">${detail.name}</h2>
            <p class="flex-grow">
              ${detail.description}
            </p>
            <div class="flex justify-between items-center">
              <h1
                class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-[400px] font-medium">
                ${detail.category}
              </h1>
              <h1>${detail.price}</h1>
            </div>

            <button
              class="btn bg-[#15803D] text-sm text-white rounded-full w-full shadow-none border-none">
              Add to Cart
            </button>
          </div>
        </div>
        
        `;
    })
    
};

loadCatagory();
