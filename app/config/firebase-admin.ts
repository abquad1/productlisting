import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

if (!getApps().length) {
  // admin.initializeApp({
  //   credential: admin.credential.cert({
  //     projectId: "productlisting-e5c27",
  //     clientEmail: "firebase-adminsdk-c33bd@productlisting-e5c27.iam.gserviceaccount.com",
  //     privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9xkJFcRKNY1Tg\nGoJdDIojr1rA3czwDQYvY6YzEikAyG9pyfyikHG7zvr2AO2KR8SgvQYIoNV5CMrL\njW7cRa8HeEv/I9nf0Pv1iw6v6rHVGcImp7G/7/RAL75kj/XLD4dju0MWaTjlW0/C\nHdelOzEeEgZHn1jvvwV95E6BSxHna4I2J1Nv8iXG6f5Ed5LNHsZA0rv8Us9FXz+2\nOmJS3tNTuk/NejiUs38s8IZFPjzT+8+oWfYGjw1Cm3BlJmgOo7GNDDLoXjp15M+r\nJABxpT4nt7LIrjpqGxEoCOZwGFaPSgrdeiyNO4TCuIV7HuTj0dTf18LX3I6Shn8i\naOaol/CbAgMBAAECggEAUEeqiU3IF1/J6/PK6in/1hC8R5KMu5AG6c0x5bDs/5PK\n7emwoeSQ+G4a5C6ITlMF7ymHf+bp54W8pFd0amJgJLzTCV/VL0VtEPZ+hBS4nfmD\nlG6kVxnfLbgExu3PgNNU5u+09aoVk5EJMIkHTLK5mIrvdSUHroQUgqkuPKvRKyAn\n70hlO0ps2NGcWqe/Ii38YOBL0Cn8i+pLWYi+bkMBINF1NzH1qVfbflcg5OPGggi1\nMQ7EvfgTvbZQcxucxRwSb5jao11DMAjPJnxJCK+nL6n/XwfIa0YP7AV+SQFcnBjW\ncmNoF2K8lkpekzwUevjoi4LTjl8ZbcitoEKGeMQpwQKBgQD4EMUqotZPihBd14ft\nl+ng9ve6HCxH/Q/YV2ouS2acUk3L6oG7+sM6pnLs9M0HdWTjodvMETtScUSkGi43\nwLMPqDngMl03fM/ffhHBOI7OXUpabeWUkKxkzvArChbj1MiPl5AAumuKpzk7aov2\n7dTQsg1yfcxDUfemdyN/xxmdaQKBgQDD2C9nvgFaU3gIP7BuouUN7ZWZYXtmUYSP\njsqpyev58+sl9B3InvwUTeGXIoZzsy3Y/L4CPu6VpOL8ONVlhZgQtBLBQcTR8pTH\njbMkeQRD/dSWuq0ZWvqqjk6/U9YuiDkjaSJTww1A1FUG8CgwRNU0TU1VLea017cv\ndXRlQyBpYwKBgC3zjVJ0j5Z0UMvRXRCaD2zo0sLa7Sj4q7K7nqOsu/lBFcAsVJPp\nw7hdlPRn9ILpMCMqnHiUyJRg/wIXB3C0dXb1BqONMM9Sg3827zsHqwx3I4rUyK5Y\njlauLrcKS2sww2Y2ASrhXYJ1r5heCEdZjw6JrQwEWY4u5N0lPKIy03/hAoGBALSL\nWwB3kIW1x0VLeZo0/5a8fRp+XKVx5xP1Hm4yYSH3tMMzbjWiI1+QgLS0tmB5QX31\nWjF11LsN29eLiWbjJtHXQCb7O7gUuwXQYuLv0XfgzBf8llF2pvmO4ZfOcPhKyuoT\nJPs1KMWoOY6A3XvKKQbjcLRi8XmsGAtfa2Ni48FjAoGBAKkheJoa6ns0JyYjNrnV\nzt12/3KpsGPChli5ItBZ9/Gz0bI9W1gePXa3H8fN0WPXQnsJNvJQIe+66aWZJ5B7\nf7GC8GsKKtA9OR0JxcL8wzMDph9OcE9g3Mq+ezeEy3rMZ5gG9+d1VYeSL7FeoRnx\nNVZnO+KgMmlivF6AWwkBPRiu\n-----END PRIVATE KEY-----\n"
  //   })
  // });

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();