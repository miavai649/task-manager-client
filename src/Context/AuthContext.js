import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
  
  export const AuthContext = createContext()
  const auth = getAuth(app)
  
  const googleProvider = new GoogleAuthProvider()
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  
    //1. Create User
    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    //2. Update user
    const updateUserProfile = (name, photo) => {
      setLoading(true)
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }
  
    // 4. Google Signin
    const googleAuthentication = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }
  
    // 5. Logout
    const logout = () => {
      setLoading(true)
      localStorage.removeItem('accessToken')
      return signOut(auth)
    }
  
    //6. Login with Password
    const signin = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('observing', currentUser)
        setUser(currentUser)
        setLoading(false)
      })
  
      return () => {
        return unsubscribe()
      }
    }, [])
  
    const authInfo = {
      user,
      createUser,
      updateUserProfile,
      googleAuthentication,
      logout,
      signin,
      loading,
      setLoading,
    }
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
  }
  
  export default AuthProvider
  