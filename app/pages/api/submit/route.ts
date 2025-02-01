import {NextApiRequest, NextApiResponse} from 'next'
import {z} from 'zod';
import { NextResponse } from 'next/server';
import { adminAuth, adminDb} from '@/app/config/firebase-admin';   




interface User {
    username: string; password: string; email: string; firstname?: string; lastname?: string;
}

const users:User[] = []
const schema = z.object({
    username: z.string().min(1, 'username is required'),
    password: z.string().min(6, 'password is required'),
    email: z.string().email(' valid email is required'),
    firstname: z.string().min(1, 'firstname is required'),
    lastname: z.string().min(1, 'lastname is required')

});


export const  POST = async (req:Request,res:NextApiResponse)=>{
    // if(req.method === 'POST'){ 
    try {
        const body:User = await req.json()
                                                    
        schema.parse(body)
        if (body.firstname && body.lastname) {
                        // Sign up request
                        try {
                            // Check if user exists in Firebase
                            const userRecord = await adminAuth.getUserByEmail(body.email)
                                .catch(() => null);
            
                            if (userRecord) {
                                return new NextResponse(
                                    JSON.stringify({ message: 'User already exists' }), 
                                    { status: 409 }
                                );
                            }
            
                            // Create user in Firebase Auth
                            const newUser = await adminAuth.createUser({
                                email: body.email,
                                password: body.password,
                                displayName: body.username
                            });
            
                            // Store additional user data in Firestore
                            await adminDb.collection('users').doc(newUser.uid).set({
                                username: body.username,
                                email: body.email,
                                firstname: body.firstname,
                                lastname: body.lastname,
                                // createdAt: admin.firestore.FieldValue.serverTimestamp(),
                            });
            
                            return new NextResponse(
                                JSON.stringify({ 
                                    message: 'Sign up successful',
                                    userId: newUser.uid 
                                }), 
                                { status: 201 }
                            );
                        } catch (error: any) {
                            console.error('Firebase error:', error);
                            return new NextResponse(
                                JSON.stringify({ 
                                    message: error.message || 'Error creating user' 
                                }), 
                                { status: 500 }
                            );
                        }
                    } else {
                        // Login request
                        try {
                            // Sign in with Firebase
                            const userRecord = await adminAuth.getUserByEmail(body.email);
                            
                            // Note: Firebase Admin SDK cannot verify passwords
                            // You should handle actual authentication in the frontend
                            // Here we just verify the user exists
                            
                            if (userRecord) {
                                // Get user data from Firestore
                                const userData = await adminDb
                                    .collection('users')
                                    .doc(userRecord.uid)
                                    .get();
            
                                return new NextResponse(
                                    JSON.stringify({ 
                                        message: 'Login successful',
                                        user: userData.data()
                                    }), 
                                    { status: 200 }
                                );
                            } else {
                                return new NextResponse(
                                    JSON.stringify({ message: 'Invalid credentials' }), 
                                    { status: 401 }
                                );
                            }
                        } catch (error) {
                            return new NextResponse(
                                JSON.stringify({ message: 'Invalid credentials' }), 
                                { status: 401 }
                            );
                        }
                    }
                // } catch (err: any) {
                //     if (err instanceof z.ZodError) {
                //         return new NextResponse(
                //             JSON.stringify({ errors: err.errors }), 
                //             { status: 400 }
                //         );
                //     }
                    
                //     return new NextResponse(
                //         JSON.stringify({ message: 'Internal server error' }), 
                //         { status: 500 }
                //     );
                // }
        
      return new NextResponse(JSON.stringify({message: 'Form Submtted Succesfully'}))   
        } 
    
catch(err:any) {
            console.log(err)
            return new NextResponse(JSON.stringify({errors: err.errors}))
        
        }
    }
    
        // new codes for backend 
//         import { NextResponse } from 'next/server';
// import { z } from 'zod';
// import { adminAuth, adminDb } from '@/config/firebase-admin';

// interface User {
//     username: string;
//     email: string; // Added for Firebase Auth
//     password: string;
//     firstname?: string;
//     lastname?: string;
// }

// const schema = z.object({
//     username: z.string().min(1, 'username is required'),
//     email: z.string().email('Valid email is required'),
//     password: z.string().min(6, 'password must be at least 6 characters'),
//     firstname: z.string().min(1, 'firstname is required'),
//     lastname: z.string().min(1, 'lastname is required')
// });

// export async function POST(req: Request) {
//     try {
//         const body: User = await req.json();
        
//         // Validate request body
//         schema.parse(body);

//         if (body.firstname && body.lastname) {
//             // Sign up request
//             try {
//                 // Check if user exists in Firebase
//                 const userRecord = await adminAuth.getUserByEmail(body.email)
//                     .catch(() => null);

//                 if (userRecord) {
//                     return new NextResponse(
//                         JSON.stringify({ message: 'User already exists' }), 
//                         { status: 409 }
//                     );
//                 }

//                 // Create user in Firebase Auth
//                 const newUser = await adminAuth.createUser({
//                     email: body.email,
//                     password: body.password,
//                     displayName: body.username
//                 });

//                 // Store additional user data in Firestore
//                 await adminDb.collection('users').doc(newUser.uid).set({
//                     username: body.username,
//                     email: body.email,
//                     firstname: body.firstname,
//                     lastname: body.lastname,
//                     createdAt: admin.firestore.FieldValue.serverTimestamp(),
//                 });

//                 return new NextResponse(
//                     JSON.stringify({ 
//                         message: 'Sign up successful',
//                         userId: newUser.uid 
//                     }), 
//                     { status: 201 }
//                 );
//             } catch (error: any) {
//                 console.error('Firebase error:', error);
//                 return new NextResponse(
//                     JSON.stringify({ 
//                         message: error.message || 'Error creating user' 
//                     }), 
//                     { status: 500 }
//                 );
//             }
//         } else {
//             // Login request
//             try {
//                 // Sign in with Firebase
//                 const userRecord = await adminAuth.getUserByEmail(body.email);
                
//                 // Note: Firebase Admin SDK cannot verify passwords
//                 // You should handle actual authentication in the frontend
//                 // Here we just verify the user exists
                
//                 if (userRecord) {
//                     // Get user data from Firestore
//                     const userData = await adminDb
//                         .collection('users')
//                         .doc(userRecord.uid)
//                         .get();

//                     return new NextResponse(
//                         JSON.stringify({ 
//                             message: 'Login successful',
//                             user: userData.data()
//                         }), 
//                         { status: 200 }
//                     );
//                 } else {
//                     return new NextResponse(
//                         JSON.stringify({ message: 'Invalid credentials' }), 
//                         { status: 401 }
//                     );
//                 }
//             } catch (error) {
//                 return new NextResponse(
//                     JSON.stringify({ message: 'Invalid credentials' }), 
//                     { status: 401 }
//                 );
//             }
//         }
//     } catch (err: any) {
//         if (err instanceof z.ZodError) {
//             return new NextResponse(
//                 JSON.stringify({ errors: err.errors }), 
//                 { status: 400 }
//             );
//         }
        
//         return new NextResponse(
//             JSON.stringify({ message: 'Internal server error' }), 
//             { status: 500 }
//         );
//     }
// }

// FIREBASE

// src/config/firebase-admin.ts
// import admin from 'firebase-admin';
// import { getApps } from 'firebase-admin/app';

// if (!getApps().length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
//     })
//   });
// }

// export const adminAuth = admin.auth();
// export const adminDb = admin.firestore();

// FIREBASE WITH SIGNUP 

// 'use client'
// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { auth, db } from '../config/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'

// function SignUp() {
//     const router = useRouter()
    
//     const [input, setInput] = useState({
//         firstname: '',
//         lastname: '',
//         username: '',
//         email: '',    // Added email field for Firebase Auth
//         password: '',
//         confirmpassword: ''
//     })

//     const [error, setError] = useState({
//         firstname: '',
//         lastname: '',
//         username: '',
//         email: '',
//         password: '',
//         confirmpassword: ''
//     })

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setInput({
//             ...input,
//             [name]: value
//         })
//         // Clear error when user starts typing
//         setError({
//             ...error,
//             [name]: ''
//         })
//     }

//     const validateForm = () => {
//         let isValid = true
//         const newErrors = { ...error }

//         // Validate first name
//         if (input.firstname.trim().length < 2) {
//             newErrors.firstname = 'First name must be at least 2 characters'
//             isValid = false
//         }

//         // Validate last name
//         if (input.lastname.trim().length < 2) {
//             newErrors.lastname = 'Last name must be at least 2 characters'
//             isValid = false
//         }

//         // Validate username
//         if (input.username.trim().length < 6) {
//             newErrors.username = 'Username must be at least 6 characters'
//             isValid = false
//         }

//         // Validate email
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//         if (!emailRegex.test(input.email)) {
//             newErrors.email = 'Please enter a valid email address'
//             isValid = false
//         }

//         // Validate password
//         const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//         if (!passwordRegex.test(input.password)) {
//             newErrors.password = 'Password must be at least 8 characters and contain at least one uppercase letter, one number, and one special character'
//             isValid = false
//         }

//         // Validate confirm password
//         if (input.password !== input.confirmpassword) {
//             newErrors.confirmpassword = 'Passwords do not match'
//             isValid = false
//         }

//         setError(newErrors)
//         return isValid
//     }

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()

//         if (!validateForm()) {
//             return
//         }

//         try {
//             // Create authentication user
//             const userCredential = await createUserWithEmailAndPassword(
//                 auth,
//                 input.email,
//                 input.password
//             )

//             // Store additional user data in Firestore
//             await setDoc(doc(db, "users", userCredential.user.uid), {
//                 firstname: input.firstname,
//                 lastname: input.lastname,
//                 username: input.username,
//                 email: input.email,
//                 createdAt: new Date().toISOString(),
//                 lastLogin: new Date().toISOString()
//             })

//             console.log('User registered successfully!')
//             router.push('/login')

//         } catch (err: any) {
//             console.error('Registration error:', err)
//             if (err.code === 'auth/email-already-in-use') {
//                 setError({
//                     ...error,
//                     email: 'This email is already registered'
//                 })
//             } else {
//                 setError({
//                     ...error,
//                     email: 'An error occurred during registration'
//                 })
//             }
//         }
//     }

//     return (
//         <div className='w-full pt-8'>
//             <h1 className='text-4xl text-center mb-4'>Sign Up</h1>
//             <div className='md:w-[30%] sm:w-[70%] m-auto border border-black h-[80%] px-8 leading-10 rounded-lg'>
//                 <form onSubmit={handleSubmit}>
//                     <div className='flex flex-col my-6'>
//                         <label htmlFor='firstname'>First Name</label>
//                         <input
//                             type='text'
//                             name='firstname'
//                             value={input.firstname}
//                             onChange={handleChange}
//                             placeholder='Input First Name'
//                             className='border border-black px-4 rounded-lg'
//                         />
//                         {error.firstname && <p className='text-red-500 text-sm mt-1'>{error.firstname}</p>}
//                     </div>

//                     <div className='flex flex-col my-6'>
//                         <label htmlFor='lastname'>Last Name</label>
//                         <input
//                             type='text'
//                             name='lastname'
//                             value={input.lastname}
//                             onChange={handleChange}
//                             placeholder='Input Last Name'
//                             className='border border-black px-4 rounded-lg'
//                         />
//                         {error.lastname && <p className='text-red-500 text-sm mt-1'>{error.lastname}</p>}
//                     </div>

//                     <div className='flex flex-col my-6'>
//                         <label htmlFor='username'>Username</label>
//                         <input
//                             type='text'
//                             name='username'
//                             value={input.username}
//                             onChange={handleChange}
//                             placeholder='Input Username'
//                             className='border border-black px-4 rounded-lg'
//                         />
//                         {error.username && <p className='text-red-500 text-sm mt-1'>{error.username}</p>}
//                     </div>

//                     <div className='flex flex-col my-6'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             type='email'
//                             name='email'
//                             value={input.email}
//                             onChange={handleChange}
//                             placeholder='Input Email'
//                             className='border border-black px-4 rounded-lg'
//                         />
//                         {error.email && <p className='text-red-500 text-sm mt-1'>{error.email}</p>}
//                     </div>

//                     <div className='flex flex-col my-6'>
//                         <label htmlFor='password'>Password</label>
//                         <input
//                             type='password'
//                             name='password'
//                             value={input.password}
//                             onChange={handleChange}
//                             placeholder='Input Password'
//                             className='border border-black px-4 rounded-lg'
//                         />
//                         {error.password && <p className='text-red-500 text-sm mt-1'>{error.password}</p>}
//                     </div>

//                     <div className='flex flex-col my-6'>
//                         <label htmlFor='confirmpassword'>Confirm Password</label>
//                         <input
//                             type='password'
//                             name='confirmpassword'
//                             value={input.confirmpassword}
//                             onChange={handleChange}
//                             placeholder='Confirm Password'
//                             className='border border-black px-4 rounded-lg'
//                         />
//                         {error.confirmpassword && <p className='text-red-500 text-sm mt-1'>{error.confirmpassword}</p>}
//                     </div>

//                     <div className='my-6'>
//                         <button
//                             type='submit'
//                             className='border border-black rounded-lg w-[120px]'
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             <div className='md:w-[30%] sm:w-[70%] m-auto my-8'>
//                 <p>Already have an account? <a href='/login' className='text-blue-700 hover:underline'>Sign In</a> here</p>
//             </div>
//         </div>
//     )
// }

// export default SignUp