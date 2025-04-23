import shoe_p_1 from './shoe-p-1.png'
import shoe_p_2 from './shoe-p-2.webp'
import shoe_p_3 from './shoe-p-3.webp'
import shoe_p_4 from './shoe-p-4.webp'
import shoe_p_5 from './shoe-p-5.webp'
import shoe_p_6 from './shoe-p-6.webp'
import shoe_p_7 from './shoe-p-7.jpg'
import slipper_p_8 from './slipper-p-8.webp'
import slipper_p_9 from './slipper-p-9.webp'



import search from './search.svg'
import shoppingCart from './shopping-cart.svg'
import user from './user.svg'
import heroImg from './hero-img.png'
import aboutMissionImg from './about-mission-img.png'
import aboutStoryImg from './about-story-img.png'

export const assets = {
    search, shoppingCart, user,
    heroImg,
    aboutMissionImg, aboutStoryImg,

}


export const products = [
    {
        _id: "0001",
        name: "Adidas Ultraboost 21 Running Shoes",
        description: "Premium responsive running shoes with energy-returning cushioning. Features a breathable Primeknit upper and Continental rubber outsole for exceptional traction.",
        price: 15999,  // in cents (₹159.99)
        image: [shoe_p_1, shoe_p_2, shoe_p_3, shoe_p_4],
        gender: "Men",
        color: "Core Black",
        brand: "Adidas",
        sizes: [6, 7, 8, 9, 10, 11],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0002",
        name: "Nike Air Max 270 React",
        description: "Casual sneakers with visible Air cushioning and lightweight React foam for all-day comfort. Retro-inspired design with modern materials.",
        price: 13499,
        image: [shoe_p_2],
        gender: "Men",
        color: "Phantom/University Red",
        brand: "Puma",
        sizes: [7, 8, 9, 10, 11],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0003",
        name: "Puma RS-X³ Puzzle Sneakers",
        description: "Chunky retro-style sneakers with layered textile upper and RS cushioning technology. Bold color-blocking for streetwear appeal.",
        price: 8999,
        image: [shoe_p_3],
        gender: "Women",
        color: "Puma White/Blue Depths",
        brand: "Campus",
        sizes: [5, 6, 7, 8],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0004",
        name: "Adidas Superstar Slip-On",
        description: "Convenient slip-on version of the iconic Superstar design. Leather upper with rubber shell toe and cloud foam comfort.",
        price: 10999,
        image: [shoe_p_4],
        gender: "Women",
        color: "Crystal White",
        brand: "Adidas",
        sizes: [6, 7, 8, 9],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0005",
        name: "Skechers Arch Fit Sandals",
        description: "Orthopedic-friendly sandals with podiatrist-certified arch support. Lightweight ULTRA GO cushioning and machine-washable design.",
        price: 6499,
        image: [shoe_p_5],
        gender: "Women",
        color: "Charcoal",
        brand: "Puma",
        sizes: [7, 8, 9, 10],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0006",
        name: "New Balance 574 Core",
        description: "Classic heritage sneakers with ENCAP midsole technology. Durable suede and mesh upper with retro running silhouette.",
        price: 12499,
        image: [shoe_p_6],
        gender: "Men",
        color: "Navy/White",
        brand: "Campus",
        sizes: [8, 9, 10, 11],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0007",
        name: "Adidas Adilette Comfort Slides",
        description: "Cloud foam comfort slides with massage nubs and adjustable strap. Quick-drying synthetic upper with contoured footbed.",
        price: 4499,
        image: [shoe_p_7],
        gender: "Men",
        color: "Black/White",
        brand: "Others",
        sizes: [8, 9, 10, 11],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0008",
        name: "Crocs Classic Clogs",
        description: "Iconic lightweight clogs with ventilation ports. Croslite™ foam construction offers custom comfort and odor resistance.",
        price: 3999,
        image: [slipper_p_8],
        gender: "Men",
        color: "Electric Blue",
        brand: "Others",
        sizes: [6, 7, 8, 9, 10],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0009",
        name: "Birkenstock Arizona Soft Footbed",
        description: "Premium leather sandals with contoured cork-latex footbed. Adjustable straps and deep heel cup for superior support.",
        price: 14999,
        image: [slipper_p_9],
        gender: "Women",
        color: "Tobacco Brown",
        brand: "Campus",
        sizes: [7, 8, 9],
        date: 1716634345448,
        bestSeller: true
    }
];