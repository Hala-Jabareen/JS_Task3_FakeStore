const getCategoryProducts= async()=>{
    try{
        const urlParams=new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const {data} = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return data;
    }
    catch(error){
        return [];
    }
    
};

const limit=3;
let allProducts=[];
let currentPage = 1;


const displayProducts=async (page = 1)=>{
    try{
        if(allProducts.length === 0){
            allProducts=await getCategoryProducts();
        }

       const numberOfPags = Math.ceil(allProducts.length / limit);
       currentPage= page;
       console.log(numberOfPags);
       console.log(currentPage);
       const start = (page - 1) * limit;
       const end = start + limit;
       const products = allProducts.slice(start, end);

    const result = products.map( (product) => {
        return `
        <div class="product">
        <img src=${product.image} class="product-image"/>
        <h2>${product.title}</h2>
        <p>Price: ${product.price}$</p>
        </div>
        `
    }).join('');
    document.querySelector('.products .row').innerHTML = result; 
    customModal();

    let pagination=``;

    if (page > 1){
        pagination=`<li><button onclick=displayProducts(${page-1})>&lt;</button></li>`;
    }
    else{
        pagination=`<li><button disabled>&lt;</button></li>`;
    }

    for(let i=1;i<=numberOfPags;i++){
        pagination+=`<li><button onclick=displayProducts(${i})>${i}</button></li>`;
        
    }

    if (page < numberOfPags){
        pagination+=`<li><button onclick=displayProducts(${parseInt(page)+1})>&gt;</button></li>`;
    }else{
        pagination+=`<li><button disabled>&gt;</button></li>`;
    }
    
console.log(pagination);

document.querySelector('.pagination').innerHTML=pagination;


    }catch(error){
        document.querySelector(".products .row").innerHTML="<p> Please try again later ...</p>"; 
    }finally{
        document.querySelector(".loading").classList.add("d-none");
    }
    
};


displayProducts();

function activeBtn(){
    
    document.querySelector(".pagination button").classList.add('active-btn');

};

function customModal(){
    const modal =document.querySelector(".my-modal");
    const closeBtn =document.querySelector(".close-btn");
    const leftBtn =document.querySelector(".left-btn");
    const rightBtn =document.querySelector(".right-btn");
    const images =Array.from(document.querySelectorAll(".product-image"));
    let currentIndex=0;
    images.forEach(function(img){
        img.addEventListener('click',(e)=>{
        
            modal.classList.remove('d-none');
            modal.querySelector("img").setAttribute("src",e.target.src);

            const currentImg=e.target;
            currentIndex=images.indexOf(currentImg);
        });
    });

    closeBtn.addEventListener("click",(e)=>{
        modal.classList.add('d-none');
    });

    rightBtn.addEventListener("click",(e)=>{
        currentIndex++;
        if(currentIndex>= images.length){
            currentIndex=0;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    });
    leftBtn.addEventListener("click",(e)=>{
        currentIndex--;
        if(currentIndex < 0){
            currentIndex=images.length - 1;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    });

    document.addEventListener("keydown",(e)=>{
        if(e.code=="ArrowRight"){
            currentIndex++;
        if(currentIndex>= images.length){
            currentIndex=0;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        }
        else if(e.code=="ArrowLeft"){
            currentIndex--;
        if(currentIndex < 0){
            currentIndex=images.length - 1;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        }
        else if(e.code=="Escape"){
            modal.classList.add('d-none');
        }
    })

}
