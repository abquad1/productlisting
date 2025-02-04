'use client'
import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react'


type UserContextType = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>
    logout: () => void
    cart: cartItemType[];
    addToCart: (item: {id: number; title: string; price: number; image: string})=> void
    removeCart: (id: number)=> void
}

type cartItemType ={
    id: number;
    price: number;
    title: string;
    quantity: number;
    image: string;

}


export const UserContext = createContext<UserContextType | undefined> (undefined);

export const UserProvider: React.FC<{children: ReactNode}> =({children})=>{
    // const [username,setUsername] = useState<string>(
    //     JSON.parse(localStorage.getItem('username') as string) || ''
    // )

    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        // Only run on client-side
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(JSON.parse(storedUsername));
        }
    }, []);

    const [cart,setCart] = useState<cartItemType[]> ([])

   useEffect(()=>{
localStorage.setItem('username', JSON.stringify(username))
   }, [username])

   const logout =()=>{
    setUsername('');
    localStorage.removeItem('username')
   }

   const addToCart = (item:{id: number; title: string; price: number; image: string;})=>{
    setCart(
        prevCart=>{
            const existingItem = prevCart.find(cartItem=> cartItem.id === item.id)

            if (existingItem) {
                return prevCart.map(cartItem=>
                    cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
                )
            } else{
                return [...prevCart, {...item, quantity: 1}]
            }
        }
    )
   }

   const removeCart =(id: number)=>{
    setCart(prevCart=>prevCart.filter(cartItem=>cartItem.id !== id))
   }

    return(
        <UserContext.Provider value={{username, setUsername, logout, cart, addToCart, removeCart}}>
            {children}
        </UserContext.Provider>
    )
}

export const UseUser = () =>{
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be wrapped')
    }

    return context
}
