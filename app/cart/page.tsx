'use client'
import React from 'react'

import { UseUser } from '../Context/shoppingContext'
import Navbar from '../components/Navbar'
import Image from 'next/image'

const page:React.FC = () => {

    const {cart, removeCart} = UseUser()
    // const router = useRouter()
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
        <Navbar />

        
        <div className='w-[80%] m-auto'> {cart.length === 0 ?
            ( <p>Cart is empty</p> ) : 
            ( <div> <h2 className='text-2xl mb-4'>Shopping Cart</h2> 
            <ul> {cart.map((item) =>
                ( 
                 <li key={item.id} className='flex items-center border-b border-gray-300 py-2'>
                     <Image src={item.image} alt={item.title} className='w-20 h-20 object-cover mr-4' width={400} height={400} /> 

                     <div className='flex-1'>
                        <h3 className='text-lg'>{item.title}</h3>
                        <p>${item.price}</p> 
                        <p>Quantity: {item.quantity}</p> 
                     </div>

                     <button className=' p-4 text-white bg-black' onClick={()=> removeCart(item.id)}>Remove Item</button>
                </li>
                 )
             )} 
             
         </ul> 

         <h3 className='text-xl mt-4'>Total Price: ${totalPrice.toFixed(2)}</h3>
     </div>)}
    </div>
</div>
  ) 
}

export default page