import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import axios from 'axios'

export default function Home() {
    const [foodCat, setfoodcat] = useState([]);
    const [FoodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        const response = (await axios.get('https://cater-orange-backend.vercel.app/api/foodData'));
        // console.log(response[0],response[1]);
        // console.log(response.data[1]);
        setFoodItem(response.data[0]);
        setfoodcat(response.data[1]);
    }
    useEffect(() => {
        loadData();
    }, [])


    return (
        <div>
            <div> <Navbar /></div>
            <div > <Carousal /> </div>
            <div className='card-div'>
                <div className='container'>
                    {
                        foodCat.length !== 0
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr/>
                                {FoodItem.length !== 0 ? 
                                <div>
                                    {FoodItem.filter((item)=> item.CategoryName == data.CategoryName).map(filterItem => {
                                        return(
                                            <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                <Card foodItem = {filterItem}
                                                options={filterItem.options[0]}
                                                ></Card>
                                            </div>
                                        )
                                    })}
                                </div> : <div>no Such div found </div>}

                                </div>
                                )
                            
                        })
                        :<div>""""""""""</div>
                    }
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );

}
