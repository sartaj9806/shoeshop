import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const navigate = useNavigate();
    const { search, setSearch, searchBar, setSearchBar } = useContext(ShopContext)

    return (
        <>
            {searchBar && <div className=' lg:px-[7vw]'>
                <div className='flex items-center justify-center h-14  border-t border-b bg-gray-50 text-base'>
                    <div className='flex border border-gray-500 px-2 rounded-lg py-1 items-center justify-center w-full md:w-1/2'>
                        <input onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSearchBar(false)
                                navigate('/collection')
                            }
                        }} value={search} className='outline-none w-full text-base' type="text" placeholder='Search' />
                        <TfiClose className='cursor-pointer' onClick={() => setSearchBar(false)} />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default SearchBar
