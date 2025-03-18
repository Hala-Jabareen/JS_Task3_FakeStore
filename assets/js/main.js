const getCatgories= async () =>{
    try{
       const {data} =await axios.get("https://fakestoreapi.com/products/categories");
    return data; 
    }catch(error){
        return [];
    }
    
}
const displayCategories=async ()=>{
    try{
      const categories= await getCatgories();
    const result = categories.map((category) =>
    `
    <div class='category'>
    <a class="capital" href="./Categorydetails.html?category=${category}">${category}</a>
    </div>

    `
).join('');
document.querySelector(".categories .row").innerHTML=result;  
    }catch(error){
        document.querySelector(".categories .row").innerHTML="<p> Please try again later ...</p>"; 
    }finally{
        document.querySelector(".loading").classList.add("d-none");
    }
    
}
displayCategories();

window.onscroll= function(){
    const header =document.querySelector("header");
    const about = document.querySelector(".about");
    if(window.scrollY > about.offsetTop){
        header.classList.add("header-scrolled");
    }else{
        header.classList.remove("header-scrolled");
    }
};