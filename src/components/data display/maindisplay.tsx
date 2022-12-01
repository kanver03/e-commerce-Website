import React,{useState, useEffect} from "react";
import {DataProps} from "./Types";
import {ItemProps} from "./Types";
import MenuForMainDisplay from "./MenuForMainDisplay";
import {CartDataProps} from "./Types";
import Payment from "./payment";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import {useApi}  from "../Service/Api"; 


const MainDisplay = () => {
    const urlForProducts = "https://fakestoreapi.com/products";
    //const[data, setData] = useState<DataProps>(); // this state is defined to store data for all products
    const[cartData, setCartData] = useState<CartDataProps>([]);    // this is to store cart data
    const[cartTotalData, setCartTotalData] = useState(0);   // this is to store cart total from cartTotal
 
    const[showData,setShowData] = useState(false); // this is defined to show and hide data from intial rendering
    const[loading, setLoading]  = useState("");
    const[showCartData, setShowCartData] = useState(false); // this is defined to show and hide cart data
    const[showCartButton, setShowCartButton] = useState(false); // this is show and hide cart button 
    const{data,setData} = useApi(urlForProducts);
   
useEffect(() =>{
    getData()
},[]);


useEffect(()=>{      // this is used to do total of cart, it is being used here, first it was in different components, it was creating problem with total
cartTotal();
},[cartData]);       // of cart because cart was not getting updated right away when remove or add to item was used. Here cartTotal is runnig and doing total
                    // only when cart is updated from actions like remove from cart or add to cart
    

// line from 23 to 100 is for cart data  and display of cart
// this addToCart is here to add items listed to cart(cartData) by using push method and it also protects duplicacy
const addToCart = (id:number, price:number, title: string) => {
        {cartData!.push({id:id,
                        price:price,
                        title: title,
                        quantity: 1,
                         })
        };
const cartWithoutDuplicacy = Array.from(cartData.reduce((map, cartItem) => map.set(cartItem.id,cartItem), new Map()).values());
        setCartData(cartWithoutDuplicacy);
        //console.log(cartData);
        //cartTotal();
        //console.log(`cartTotal when addToCart is pressed ${cartTotalData}`);
        //console.log(cartData);
        console.log(`cartTotal when addToCart is pressed is ${cartTotalData}`)
        setShowCartButton(true);
}

const cartTotal = () => {
let total = 0;
cartData.forEach(cartItem => {
    total += (cartItem.price * cartItem.quantity);
})
setCartTotalData(parseFloat(total.toFixed(2)));
};

const updateQuantity = (id:number, newValue:number) => {
const cartWithUpdateQuantity = cartData.map(cartItem => {

    if(cartItem.id === id){
        return {...cartItem, quantity: newValue}
    } else{
        return cartItem;
    }
});
setCartData(cartWithUpdateQuantity);
}

const cartDataDisplay = () => {
    if(cartTotalData === 0){
        setLoading("Cart Is Empty Now");
       setShowCartData(false);
       setShowCartButton(false);
       getData();
        
    }else{

    return(
        <>
    <Button className="m-1" size="sm"variant="dark"type="button" onClick= {clearCart}>CLEAR CART and Back to Home</Button>
        <Container fluid>
        <Row className="row-cols-lg-1">
            {cartData.map((cartItem)=>{
                const{id, price, title,quantity} = cartItem;
                return(
                    <>
                <Col className="p-1 bg-dark text-white border border-white">
                    <h4>{title}</h4>
                    <h4>Price: ${price}</h4>
                    <h5>Item ID : {id}</h5>
                    <input type="number" max={10} min={1} placeholder="Use Arrow to Change Value"  onChange = {(e)=>updateQuantity(id, parseInt(e.target.value))}/>
                    <h5>Quantity is : {quantity}</h5>
                    <Button variant="light" size="sm"type="button" onClick={()=>removeCartItem(id)}>Remove This Item</Button>
                </Col>
                    </>
                );
            })}
            </Row>
            </Container>
            <h1>Total of Cart is ${cartTotalData}.</h1>
            <Payment />
        </>
        );
    }
    }
const removeCartItem = (id:number) => {
    const newCartItems = cartData.filter((cartItem)=> cartItem.id != id);
    console.log(`cart total at remove cart Item is ${cartTotalData}`);
    setCartData(newCartItems);       // this is not updating cartData immedialtly(beacuse setState are async functions)
   if(cartData.length < 1){
    setLoading("Cart is Empty Now");
    }
}

//following is seprately defined to make sure upon clear cart showCartData is false because if it is previoulsy true
// from any other fucntion website will break 
//because cartDataDisplay function will return cartData is not undefined as error

const clearCart = () => {               // clear cart set array to empty [] and hide cart data and also hide cart button
                                        // and tigger getData function to fetch main data agign
setCartData([]);
setShowCartData(false);
setShowCartButton(false);
setLoading("Cart Is Empty Now");
getData();
}

const getData = async() => {            // this is to fetch data on page loading and reloading
    setLoading("Loading...")
    setLoading("Welcome to the Store");
    setShowCartData(false);
    setTimeout(() => setShowData(true),700);
};

// const getData = async() => {            // this is to fetch data on page loading and reloading
//         setLoading("Loading...")
//     try{
//         const a = await fetch(urlForProducts);
//         var b = await a.json();
//     }catch(e){
//         setLoading(`OOPS...Somethis is wrong here: ${Error}`);
//     }
//         setData(b);
//         setLoading("Welcome to the Store");
//         console.log(data);
//         setShowCartData(false);
//         setShowData(true);
//     };

const cartPopUp = () => {             
if(cartTotalData === 0){
setLoading("Cart Is Empty Now");
setShowCartData(false);
setShowCartButton(false);
getData();
}else{
console.log(`cart total at cartPop up is ${cartTotalData}`);
setLoading("Welcome To Cart");
setShowData(false);
setShowCartData(true);
}
}
    // this dataAfterIntailCall is to avoid returning the data before it get loaded by api call if we return following direclty into main component application will only work for
    // intial rendering it will crash upon refreshing the webpage; it is very important to use conditional redenring in this case
 const dataAfterIntialCall = () => {
   
    return ( 
            <>
    <Container fluid>
        <Row className="row-cols-lg-3">
            {data!.map((item: ItemProps)=>{
                const{id, title, price, description, category, image, rating} = item;
                    return(
                        <>
                        <Col  className="p-1 bg-dark text-white border border-white">
                        <h2>Item No. {id}  </h2>
                            <h3>{title}</h3><span><h4>Price: ${price}</h4></span>
                            {/* <h4>{category}</h4> */}
                            <Image src={image} alt={title} style={{height:125, width: 125}} /> 
                            {/* <h4>{description}</h4>  */}
                            <h5> Rating: {rating.rate}/5 Reviews: {rating.count}  </h5>
                            <Button  variant="light" size="sm"type="button" onClick={()=>addToCart(id,price,title)}>Add To Cart</Button>
                               
                        </Col>
                        </>
                    );
                })}
             </Row>
        </Container>

            </>
    )}
return(
<>  
<MenuForMainDisplay url = {urlForProducts} setData = {setData} setLoading = {setLoading}  
setShowCartData={setShowCartData} setShowData={setShowData} /><br/>
{showCartButton && <Button type="button" onClick={cartPopUp} variant="dark" size="sm" className="m-1">Cart</Button> }
<h1>{loading}</h1>
{showData && dataAfterIntialCall()}
{showCartData && cartDataDisplay()}
</>     
);
}
export default MainDisplay;   

