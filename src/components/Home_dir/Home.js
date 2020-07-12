import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import Products from '../Product_list_dir/Product_list'
import './Home.css'

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // get data from the third party api & store them in redux store
        const fetch = async () => {
            await Axios.get('http://localhost:3000/grocery')
                .then((response) => {
                    const setProducts = () => (
                        { type: "PRODUCTS", obj: response.data }
                    );
                    dispatch(setProducts()) 
                })
        }
        fetch();
    },)
    return (
        <>
            <Products />
        </>
    )
}

export default Home;