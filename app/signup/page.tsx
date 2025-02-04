'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
// import { auth, db } from '../config/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'

function SignUp() {

    const [input, setInput] =useState({
        firstname:'',lastname:'',username:'',password:'',confirmpassword:'', email:''
    })

    const [error, setError] = useState({
        firstname:'',lastname:'',username:'',password:'',confirmpassword:'', email:''
    })



    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}= e.target
        setInput({
            ...input, [name]: value
        })

        setError ({
            ...error, [name]: ''
        })
    }


    const validateForm = ()=>{
        let isValid = true
        const newErrors = {...error}

        if (input.firstname.trim().length < 2) {
            newErrors.firstname = 'Firstname must be at least 2 characters'
            isValid= false
        }

        if (input.lastname.trim().length < 2) {
            newErrors.lastname = 'Lastname must be at least 2 characters'
            isValid= false
        }

        if (input.username.trim().length < 6) {
            newErrors.username = 'Username must be more than 6 characters'
            isValid= false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(input.email)) {
            newErrors.email = 'Please enter a valid email address'
            isValid = false
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                if (!passwordRegex.test(input.password)) {
                    newErrors.password = 'Password must be at least 8 characters and contain at least one uppercase letter, one number, and one special character'
                    isValid = false
                }

         if (input.password !== input.confirmpassword) {
                     newErrors.confirmpassword = 'Passwords do not match'
                     isValid = false
             }
                    

        setError(newErrors)
        return isValid
    }

    // validate firstname
   
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if (!validateForm()) {
            return
        }

    //    try {
    //         // Create authentication user
    //         const userCredential = await createUserWithEmailAndPassword(
    //             auth,
    //             input.email,
    //             input.password
    //         )

            // Store additional user data in Firestore
            // await setDoc(doc(db, "users", userCredential.user.uid), {
            //     firstname: input.firstname,
            //     lastname: input.lastname,
            //     username: input.username,
            //     email: input.email,
            //     createdAt: new Date().toISOString(),
            //     lastLogin: new Date().toISOString()                
            // })

        router.push('/login')

        // } catch (err) {
        //                     console.error('Registration error:', err)
        //                     // if (err.code === 'auth/email-already-in-use') {
        //                     //     setError({
        //                     //         ...error,
        //                     //         email: 'This email is already registered'
        //                     //     })
        //                     // } else {
        //                     //     setError({
        //                     //         ...error,
        //                     //         email: 'An error occurred during registration'
        //                     //     })
        //                     // }
        //                 }
         
        const response = await fetch('pages/api/submit', {
          method: 'POST',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify(input) 
        })
           
        const result = await response.json();

        console.log('form submitted:', result)
    }

  return (
    <div className='w-full pt-8'>

        <h1 className='text-4xl text-center mb-4'>Sign Up</h1>
        <div className='md:w-[30%] sm: w-[70%] m-auto border border-black h-[80%] px-8 leading-10 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col my-6'>
                    <label htmlFor='firstname'>First Name</label>
                     <input type='text' name='firstname' value={input.firstname} onChange={handleChange}  placeholder='Input First Name' className='border border-black px-4 rounded-lg'></input>
                </div>

        {error.firstname && <p className='text-red-500 text-sm mt-1 italic'>{error.firstname}</p>}


                <div className='flex flex-col my-6'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text'  name='lastname' value={input.lastname} onChange={handleChange} placeholder='Input Last Name' className='border border-black px-4 rounded-lg'></input>
                </div>

        {error.lastname && <p className='text-red-500 text-sm mt-1 italic'>{error.lastname}</p>}

                <div className='flex flex-col my-6'>
                    <label htmlFor='username'>Username</label>
                    <input type='text'  name='username' value={input.username} onChange={handleChange} placeholder='Input Username' className='border border-black px-4 rounded-lg'></input>
                </div>

        {error.username && <p className='text-red-500 text-sm mt-1 italic'>{error.username}</p>}

                <div className='flex flex-col my-6'>
                    <label htmlFor='email'>Email</label>
                    <input type='email'  name='email' value={input.email} onChange={handleChange} placeholder='Input Email' className='border border-black px-4 rounded-lg'></input>
                </div>
        {error.email && <p className='text-red-500 text-sm mt-1 italic'>{error.email}</p>}


                <div className='flex flex-col my-6'>
                    <label htmlFor='password'>Password</label>
                    <input type='password'  name='password' value={input.password} onChange={handleChange} placeholder='Input Password' className='border border-black px-4 rounded-lg'></input>
                </div>

        {error.password && <p className='text-red-500 text-sm mt-1 italic'>{error.password}</p>}


                <div className='flex flex-col my-6'>
                    <label htmlFor='username'>Confirm Password</label>
                    <input type='password'  name='confirmpassword' value={input.confirmpassword} onChange={handleChange} placeholder='Confirm Password' className='border border-black px-4 rounded-lg'></input>
                </div>

        {error.confirmpassword && <p className='text-red-500 text-sm mt-1 italic'>{error.confirmpassword}</p>}


                <div className='my-6'>    
                    <button type='submit' className='border border-black rounded-lg w-[120px]'>Submit</button>
                </div>
            </form>
        </div>

        <div className='md:w-[30%] sm: w-[70%] m-auto my-8'>
         <p>Already have an account? , <a href='/login' className='text-blue-700 hover:underline'>Sign In</a> here</p>
        </div>       

    </div>
  )
}

export default SignUp