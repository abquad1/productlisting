// import { NextApiResponse} from 'next'
import {z} from 'zod';
import { NextResponse } from 'next/server';
// import { adminAuth, adminDb} from '@/app/config/firebase-admin';   


// Add this interface at the top with your other interfaces
// interface FirebaseError {
//     code?: string;
//     message: string;
// }

interface User {
    username: string; password: string; email: string; firstname?: string; lastname?: string;
}


const schema = z.object({
    username: z.string().min(1, 'username is required'),
    password: z.string().min(6, 'password is required'),
    email: z.string().email(' valid email is required'),
    firstname: z.string().min(1, 'firstname is required'),
    lastname: z.string().min(1, 'lastname is required')

});

// res:NextApiResponse
export const  POST = async (req:Request)=>{
    // if(req.method === 'POST'){ 
    try {
        const body:User = await req.json()
                                                    
        schema.parse(body)
        // if (body.firstname && body.lastname) {
                        // Sign up request
                        // try {
                        //     // Check if user exists in Firebase
                        //     const userRecord = await adminAuth.getUserByEmail(body.email)
                        //         .catch(() => null);
            
                        //     if (userRecord) {
                        //         return new NextResponse(
                        //             JSON.stringify({ message: 'User already exists' }), 
                        //             { status: 409 }
                        //         );
                        //     }
            
                        //     // Create user in Firebase Auth
                        //     const newUser = await adminAuth.createUser({
                        //         email: body.email,
                        //         password: body.password,
                        //         displayName: body.username
                        //     });
            
                        //     // Store additional user data in Firestore
                        //     await adminDb.collection('users').doc(newUser.uid).set({
                        //         username: body.username,
                        //         email: body.email,
                        //         firstname: body.firstname,
                        //         lastname: body.lastname,
                        //         // createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        //     });
            
                        //     return new NextResponse(
                        //         JSON.stringify({ 
                        //             message: 'Sign up successful',
                        //             userId: newUser.uid 
                        //         }), 
                        //         { status: 201 }
                        //     );
                        // } catch (error: unknown) {  // Change from any to unknown
                        //     const firebaseError = error as FirebaseError;
                        //     console.error('Firebase error:', firebaseError);
                        //     return new NextResponse(
                        //         JSON.stringify({ 
                        //             message: firebaseError.message || 'Error creating user' 
                        //         }), 
                        //         { status: 500 }
                        //     );
                        // }
                    // } else {
                    //     // Login request
                    //     try {
                    //         // Sign in with Firebase
                    //         const userRecord = await adminAuth.getUserByEmail(body.email);
                            
                    //         // Note: Firebase Admin SDK cannot verify passwords
                    //         // You should handle actual authentication in the frontend
                    //         // Here we just verify the user exists
                            
                    //         if (userRecord) {
                    //             // Get user data from Firestore
                    //             const userData = await adminDb
                    //                 .collection('users')
                    //                 .doc(userRecord.uid)
                    //                 .get();
            
                    //             return new NextResponse(
                    //                 JSON.stringify({ 
                    //                     message: 'Login successful',
                    //                     user: userData.data()
                    //                 }), 
                    //                 { status: 200 }
                    //             );
                    //         } else {
                    //             return new NextResponse(
                    //                 JSON.stringify({ message: 'Invalid credentials' }), 
                    //                 { status: 401 }
                    //             );
                    //         }
                    //     } catch (_error) {
                    //         return new NextResponse(
                    //             JSON.stringify({ message: 'Invalid credentials' }), 
                    //             { status: 401 }
                    //         );
                    //     }
                    // }
               
      return new NextResponse(JSON.stringify({message: 'Form Submtted Succesfully'}))   
} 
    
catch(err) {
            console.log(err)
            return new NextResponse(JSON.stringify({message: 'something went wrong'}))
        
        }
    }
    
        