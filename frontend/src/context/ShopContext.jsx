import { createContext, use, useContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const [searchBar, setSearchBar] = useState(false);
    const [search, setSearch] = useState('')
    const [cartItem, setCartItem] = useState([]);
    const [products, setProducts] = useState([])
    const [customerInfo, setCustomerInfo] = useState({})
    const [token, setToken] = useState('')
    const [profile, setProfile] = useState(false)
    const [cartCount, setCartCount] = useState('')
    const [orderedInfo, setOrderedInfo] = useState([])

    const getAllProductData = async () => {
        try {

            const { data } = await axios.get(backendURL + '/api/product/get-all-product')
            setProducts(data.product)
            // console.log(data.product)

        } catch (error) {
            console.error(error);
            toast.error(data.message)
        }

    }

    useEffect(() => {
        getAllProductData();
    }, [])

    const addToCart = async (productId, size) => {

        if (!token) {
            toast.error('You are not login')
            navigate('/login')
            return
        }

        if (!size) {
            toast.error('Please select Size!')
            return
        };

        const existProduct = cartItem.find(item => item._id === productId && item.size === size);

        if (existProduct) {
            setCartItem(prev => prev.map((item) => item._id === productId && item.size === size ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
            setCartItem(prev => [...prev, { _id: productId, size: size, quantity: 1 }])
        }

        if (token) {
            try {

                const { data } = await axios.post(`${backendURL}/api/cart/add`, { productId, size }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (data.success) {
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }

    }

    const updateCart = async (productId, size, quantity) => {

        setCartItem(prev => prev.map((item) => item._id === productId && item.size === size ? { ...item, quantity: quantity } : item))

        console.log(productId, size, quantity)

        if (token) {
            try {

                const { data } = await axios.put(`${backendURL}/api/cart/update`, { productId, size, quantity }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }
    }

    const deleteCart = async (productId, size) => {
        setCartItem(prev => prev.filter((item) => !(item._id === productId && item.size === size)))

        if (token) {
            try {

                const { data } = await axios.put(`${backendURL}/api/cart/delete`, { productId, size }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }
    }

    const getTotalAmount = cartItem.reduce((total, item) => {

        return total + (products.find((p) => p._id === item._id)).price * item.quantity;

    }, 0)

    const cartCountFunction = () => {
        setCartCount(cartItem.reduce((total, item) => total + item.quantity, 0))
    }

    useEffect(() => {
        cartCountFunction();
    }, [cartItem])

    // --------------Get Customer Cart Details 
    const getCustomerCart = async (token) => {
        try {

            const { data } = await axios.get(`${backendURL}/api/cart/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setCartItem(data.cartItem)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const getCustomerInfo = async (token) => {

        try {

            const { data } = await axios.get(`${backendURL}/api/customer/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setCustomerInfo(data.customer)
            } else {
                setCustomerInfo({})
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message)

        }

    }

    const getCustomerOrders = async (token) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/order/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {

                const sorted = data.ordered.sort((a, b) => b.date - a.date)
                setOrderedInfo(sorted);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };


    // Token Fetch
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getCustomerCart(localStorage.getItem('token'))
            getCustomerInfo(localStorage.getItem('token'))
            getCustomerOrders(localStorage.getItem('token'))   // call correctly
        }
    }, [])


    const value = {
        products,
        searchBar, setSearchBar,
        search, setSearch,
        addToCart, cartCount, cartItem, setCartItem, updateCart, getTotalAmount, deleteCart,
        getAllProductData, backendURL,
        customerInfo, setCustomerInfo,
        token, setToken,
        profile, setProfile,
        getCustomerOrders,
        orderedInfo, setOrderedInfo,
        getCustomerCart,

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;