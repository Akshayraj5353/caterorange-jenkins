
import React, { useEffect, useRef, useState } from 'react'
import mealbox from '../images/mealbox.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
    let data = useCart()

    let navigate = useNavigate();
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    const priceRef = useRef();



    let options = props.options
    let priceOptions = Object.keys(options)
    let foodItem = props.item;
    const dispatch = useDispatchCart();
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }
    const handleQty = (e) => {
        setqty(e.target.value);
    }
    const handleOptions = (e) => {
        setsize(e.target.value);
    }
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        // console.log(food)
        // console.log(new Date())
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                alert("added to cart successfull");
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                alert("added to cart successfull");
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        // // console.log(data)
        alert("added to cart successfull");
    }

    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])


    let finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div >
                <div className="card mt-3" style={{ width: "25rem", maxHeight: "450px" }}>
                    <img src={mealbox} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className='card-tittle'>{props.foodItem.name}</h5>
                        {/* <p className="card-text"> Meal Box</p> */}
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success text-black rounded' style={{ select: "#FF0000" }}  onChange={handleQty}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} style={{ color: "white" }}  onChange={handleOptions}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </select>
                            <div className='d-inline fs-5'>
                                INR{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className='btn btn-success jestify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
