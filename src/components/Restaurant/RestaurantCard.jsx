import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites } from '../State/Authencation/Action';
import { isPresentInFavourites } from '../config/logic';
import { store } from '../State/store';

export default function 
({item}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt=localStorage.getItem('jwt')
    const {auth}=useSelector(store=>store)


    const handleAddToFavorite =()=>{
        dispatch(addToFavourites({jwt,restaurantId:item.id})) 
       
    }

    const handleNavigateToRestaurant =()=>{
        if(item.open){
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
        }
    }
  return (
    <div>
        <Card  className=' w-[18rem] '>
                <div className={`${true?'cursor-pointer':"cursor-not-allowed"} relative`}>
                    <img className='w-full h-[10rem] rounded-t-md object-cover'
                     src={item.images[0]} alt="" />
                     <Chip
                     size='small'
                     className='absolute top-2 left-2'
                     color={item.open?"success":"error"}
                     label={item.open?"open":"closed"}/>

                </div>
                <div className='p-4 textPart lg:flex w-full justify-between'>
                    <div className='space-y-1'>
                        <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{item.name}</p>
                        <p className='text-gray-500 text-sm'>
                           {item.description}
                        </p>

                    </div>
                    <div>
                        <IconButton onClick={handleAddToFavorite}>
                            {isPresentInFavourites(auth.favorites,item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                        </IconButton>
                    </div>

                </div>
        </Card>
    </div>
  )
}
