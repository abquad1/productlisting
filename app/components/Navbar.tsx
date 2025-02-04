import React from 'react'
import { FaCartShopping } from "react-icons/fa6"
import { UseUser} from '../Context/shoppingContext'
import { useRouter } from 'next/navigation'


function Navbar() {

  const {cart} = UseUser()
  const router = useRouter()


  return (
    <div className='w-full bg-black text-white'>
        <div className='w-[80%] m-auto h-16 flex items-center justify-between'>
            <div className=''>
                <h1 className='font-bold cursor-pointer' onClick={()=>router.push('/home')}>LOGO</h1>
            </div>

            <div className='flex items-center gap-8 '>
                {/* <h4><a href=''>Products</a></h4> */}
                <span onClick={()=>router.push('/cart')}><FaCartShopping /></span>
                <span>{cart.length}</span>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar