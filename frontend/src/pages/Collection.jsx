import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Card from '../components/Card'
import Title from '../components/Title'
import { IoMdArrowDropright } from "react-icons/io";

const Collection = () => {

    const { products, search, getAllProductData } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [sortType, setSortType] = useState('Relavent')

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(category.filter((item) => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleBrand = (e) => {
        if (brand.includes(e.target.value)) {
            setBrand(brand.filter((item) => item !== e.target.value))
        } else {
            setBrand(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice();

        if (search) {
            productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productCopy = productCopy.filter((item) => category.includes(item.gender))
        }

        if (brand.length > 0) {
            productCopy = productCopy.filter((item) => brand.includes(item.brand))
        }

        setFilterProducts(productCopy)
    }



    const sortPrice = () => {

        let sortPriceProduct = filterProducts.slice();

        switch (sortType) {

            case 'High-Low':
                setFilterProducts(sortPriceProduct.sort((a, b) => (b.price - a.price)))
                break;
            case 'Low-High':
                setFilterProducts(sortPriceProduct.sort((a, b) => (a.price - b.price)))
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, brand, search, products])

    useEffect(() => {
        sortPrice();
    }, [sortType])

    return (
        <div className='my-14 px-2 lg:px-[7vw]'>

            {/* --------------Title Header--------------- */}
            <div className='text-3xl'><Title text1={'All'} text2={'Collection'} /></div>

            {/* --------------Category Section--------------- */}
            <div className='flex w-full mb-4 justify-between'>

                {/* -----------Left Category-------------- */}

                <div onClick={() => setShowFilter(!showFilter)} className='flex gap-0.5 items-center  cursor-pointer md:cursor-default'>
                    <p className={`text-[#EC5228] text-2xl font-medium`}>Filter</p>
                    <div className={`block md:hidden ${showFilter ? 'rotate-90' : ''}`}>
                        < IoMdArrowDropright />
                    </div>
                </div>

                {/* ---------------Right Category-------------- */}
                <div>
                    <select onChange={(e) => setSortType(e.target.value)} className='border text-sm px-4 py-2 rounded-lg'>
                        <option value="Relevant">Sort by: Ralevent</option>
                        <option value="High-Low">Sort by: High to low</option>
                        <option value="Low-High">Sort by: Low to High</option>
                    </select>
                </div>
            </div>

            {/* ---------------Main Section---------------- */}
            <div className='flex flex-col md:flex-row gap-4'>

                {/* ------------Side section for categroy------------ */}
                <div className='text-gray-700'>
                    <div className={`gap-4 flex-col ${showFilter ? 'flex' : 'hidden'} md:flex`}>
                        <div className='border rounded-lg p-4 w-[200px]'>
                            <p className='font-medium text-black mb-2'>Category</p>

                            <label className='flex items-center gap-2 mb-1 cursor-pointer'>
                                <input onChange={toggleCategory} type="checkbox" value={'Men'} />
                                <span>Men</span>
                            </label>

                            <label className='flex items-center gap-2 mb-1 cursor-pointer'>
                                <input onChange={toggleCategory} type="checkbox" value={'Women'} />
                                <span>Women</span>
                            </label>

                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input onChange={toggleCategory} type="checkbox" value={'Kids'} />
                                <span>Kids</span>
                            </label>
                        </div>

                        <div className='border rounded-lg p-4 w-[200px]' >
                            <p className='font-medium text-black mb-2' >Brand</p>

                            <label className='flex items-center gap-2 mb-1 cursor-pointer'>
                                <input onChange={toggleBrand} type="checkbox" value={'Puma'} />
                                <span>Puma</span>
                            </label>

                            <label className='flex items-center gap-2 mb-1 cursor-pointer'>
                                <input onChange={toggleBrand} type="checkbox" value={'Campus'} />
                                <span>Campus</span>
                            </label>

                            <label className='flex items-center gap-2 mb-1 cursor-pointer'>
                                <input onChange={toggleBrand} type="checkbox" value={'Nike'} />
                                <span>Nike</span>
                            </label>

                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input onChange={toggleBrand} type="checkbox" value={'Others'} />
                                <span>Others</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* ------------------Main Section Card------------------ */}
                <div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4'>
                        {
                            filterProducts.map((item, index) => (
                                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image[0]} />
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Collection
