import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [products, setProducts] = useState([])
    const [orderedProduct, setOrderedProduct] = useState([])
    const [completedOrderProduct, setCompletedOrderProduct] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token'))

    const getAllProductData = async (token) => {
        try {

            const { data } = await axios.get(backendURL + '/api/product/get-all-product', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
           
            if(data.success) {
                setProducts(data.product.sort((a, b)=> b.date-a.date))
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(data.message)
        }

    }

    const getAllOrderedProduct = async (token) => {

        console.log(token)

        try {

            const { data } = await axios.get(`${backendURL}/api/order/get-all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setOrderedProduct(data.ordered.filter((item) => item.status !== 'Delivered').sort((a, b) => b.date - a.date))
                setCompletedOrderProduct(data.ordered.filter((item) => item.status === 'Delivered').sort((a, b) => b.date - a.date))

            } else {
                toast.error(data.message + ' All Ordered Product')
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getAllProductData(localStorage.getItem('token'));
            getAllOrderedProduct(localStorage.getItem('token'));
        }

    }, [token])

    const value = {
        backendURL, products,
        getAllProductData,
        getAllOrderedProduct,
        orderedProduct, setOrderedProduct,
        completedOrderProduct,
        token, setToken,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;