import React, { PureComponent, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

const RelatedProduct = ({ brand, gender }) => {

    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {

        if (products.length > 0) {
            let productCopy = products.slice();

            productCopy = productCopy.filter(item => item.brand === brand)
            productCopy = productCopy.filter(item => item.gender === gender)

            setRelated(productCopy.slice(0, 5))
        }

    }, [products])

    return (
        <>
            <div className='flex justify-center items-center'>
                <Title text1={'Related'} text2={'Product'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ' >
                {
                    related.map((item, index) => (
                        <Card key={index} id={item._id} name={item.name} image={item.image[0]} price={item.price} />
                    ))
                }
            </div>
        </>

    )
}

export default RelatedProduct
