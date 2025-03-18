const getProductDetails= async ()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return data;
}
const displayProductDetails=async ()=>{
    const details=await getProductDetails();
    const result =
         `
        <div class='productDetails'>
        <img src=${details.image} />
        <h2>${details.title}</h2>
        <span>${details.price}</span>
        <p>${details.description}</p>
        </div>
        `
    ;
    document.querySelector(".products_details .row").innerHTML=result;
console.log(result);
}
displayProductDetails();