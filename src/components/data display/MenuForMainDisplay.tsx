import {useState,FormEvent} from "react";
import {ItemProps} from "./Types";
import{DataProps}  from "./Types";
import{MenuForMainDisplayProps} from "./Types";
// following are imports for bootstrap
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import {useApi} from "../Service/Api";

// states are defined here
const MenuForMainDisplay = (props: MenuForMainDisplayProps)=> {
const[maxRange, setMaxRange] = useState(1000);
const[minRange, setMinRange]= useState(0);
const[rating, setRating] = useState(1);
const urlForProducts = "https://fakestoreapi.com/products";

const{data,setData} = useApi(urlForProducts);
// for bootstrap 
const[showOffcanvas,setShowOffCanvas] = useState(false);
const handleClose = () => setShowOffCanvas(false);
const handleOpen = () => setShowOffCanvas(true);

const CategoryFilter = async(category: string) => {
    
    const filterOutput = data!.filter((item:ItemProps) => item.category === category &&  item.price >= minRange && item.price <= maxRange && item.rating.rate >= rating);
    props.setData(filterOutput);
    console.log(filterOutput);
    if(filterOutput.length === 0){
        props.setLoading(`No Item to Match Category and filter combination`);
        props.setShowCartData(false);
        props.setShowData(false); 
    }else{
    props.setLoading(`Welcome to ${category} Store`);
    props.setShowCartData(false);
    props.setShowData(true);
    }
    }
// const CategoryFilter = async(category: string) => {
// const c = await fetch(props.url);
// const d = await c.json();
// const e = d.filter((item:ItemProps) => item.category === category &&  item.price >= minRange && item.price <= maxRange && item.rating.rate >= rating);
// props.setData(e);
// props.setLoading(`Welcome to ${category} Store`);
// props.setShowCartData(false);
// props.setShowData(true);
// }
//following function is defined to filter items on basis of price range, and rating only, this fucntion can be used anywhere
// i used this when apply filter button is pressed
const filteredItems = async() => {
    
    const filterOutput1 = data!.filter((item:ItemProps)=> item.price >= minRange && item.price <= maxRange && item.rating.rate >= rating);
    if(filterOutput1.length === 0){
    props.setShowCartData(false);
    props.setLoading("No Item To Match In Current Filter Combination");
    props.setShowData(false);
    }else{
    props.setData(filterOutput1);
    props.setShowCartData(false);
    props.setLoading("Welcome To Store");
    props.setShowData(true);
    }
    }
// const filteredItems = async() => {
// const f = await fetch(props.url);
// const g = await f.json();
// const h = g.filter((item:ItemProps)=> item.price >= minRange && item.price <= maxRange && item.rating.rate >= rating);
// props.setData(h);
// props.setShowCartData(false);
// props.setShowData(true);
// }

const handleFilterSubmit= (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
}
const clearFilter = () => {
    setMaxRange(1000);
    setMinRange(0);
    setRating(1);
}
return(
    <>
    <Button variant="dark" className="m-1" size="sm" onClick={handleOpen}>
        Filter & Category
      </Button>

<Offcanvas show={showOffcanvas} onHide={handleClose} responsive="lg">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Categories And Filter</Offcanvas.Title>
    </Offcanvas.Header>
<Offcanvas.Body className="mb-0">

<ListGroup className="mb-2">
      <ListGroup.Item className="p-0 mb-0.50">
      <Button variant="dark" type="button" className="w-100 m-0" onClick={()=>CategoryFilter("men's clothing")}> Men's Clothing</Button>
      </ListGroup.Item>
      <ListGroup.Item className="p-0 mb-0.50">
      <Button variant="dark" type="button" className="w-100 m-0" onClick={()=>CategoryFilter("women's clothing")}> WoMen's Clothing</Button>
      </ListGroup.Item>
      <ListGroup.Item className="p-0 mb-0.50">
      <Button variant="dark" type="button" className="w-100 m-0" onClick={()=>CategoryFilter("electronics")}> Electronics</Button>
      </ListGroup.Item>
      <ListGroup.Item className="p-0 mb-0.50">
      <Button variant="dark" type="button" className="w-100 m-0" onClick={()=>CategoryFilter("jewelery")}> Jewelery</Button>
      </ListGroup.Item>
</ListGroup>

<Form onSubmit={handleFilterSubmit}>
    <Form.Group className="mb-2" controlId="formMinPrice">
        <Form.Label>Set Minimum Price:</Form.Label>
        <Form.Control type="number" placeholder="Min. Price" max={999} min={0} value={minRange}  
        onChange={(e)=> setMinRange(parseInt(e.target.value))} />
    </Form.Group>
    <Form.Group className="mb-2" controlId="formMaxPrice">
        <Form.Label>Set Maximum Price:</Form.Label>
        <Form.Control type="number" placeholder="Max. Price" min={1} max={1000} value={maxRange}
        onChange={(e) => setMaxRange(parseInt(e.target.value))}/>
    </Form.Group>

<Form.Group controlId="SetRating" className="mb-3">
    <Form.Label>Set Rating:</Form.Label>
    <Form.Control 
    as="select" value={rating} onChange={(e)=> setRating(parseInt(e.target.value))}
    >
    <option value={4}>4 And More</option>
    <option value={3}>3 And More</option>
    <option value={2}>2 And More</option>
    <option value={1}>1 And More</option>
    </Form.Control>
    </Form.Group>
    
    <Button variant="dark" type="submit" className="m-1">Apply Filter</Button>
    <Button variant="dark" type="button" onClick = {clearFilter} className="m-1"> Clear Filter </Button>
    <Button variant="dark" type="button" onClick = {filteredItems} className="m-1"> Main Page </Button>
    </Form>
</Offcanvas.Body>
</Offcanvas>
</>
);
}
export default MenuForMainDisplay;
