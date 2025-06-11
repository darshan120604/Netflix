
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { addDoc,collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCl5xjjy4niblcFVqArJFSE26YmWj5j2Rg",
  authDomain: "netflix-clone-63eb7.firebaseapp.com",
  projectId: "netflix-clone-63eb7",
  storageBucket: "netflix-clone-63eb7.firebasestorage.app",
  messagingSenderId: "1029568137208",
  appId: "1:1029568137208:web:b51a69e7f0872ab21ff80d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) =>{
    try{
        const response = await createUserWithEmailAndPassword(auth,email,password);
        const user = response.user;
        await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        }
    );
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout =  () =>{
    signOut(auth);
}


export {auth,db,login,signup,logout};