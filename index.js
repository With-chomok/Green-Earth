
const catagoryTitleName = document.getElementById("catagoryTitle");

const loadCatagory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
    const catagory = data.categories;
    
    
    catagory.forEach(title => {
        
    // Category Loading Load Tree Categories dynamically on the left side.    
        catagoryTitleName.innerHTML += `
            <p class="text-[#1F2937] font-medium text-base py-2 px-3 cursor-pointer hover:bg-[#15803D] hover:text-white rounded-md">
            ${title.category_name}
          </p>
        `

    });   
})
}

loadCatagory();