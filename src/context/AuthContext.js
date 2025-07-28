import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    const fetchUserData = async () => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            setRole(userSnap.data().role || 'user');
          } else {
            await setDoc(userDocRef, {
              role: 'user',
              email: currentUser.email,
            });
            setRole('user'); // 기본값
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setRole('user'); // 오류 시에도 기본값
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    };

    fetchUserData();
  });

  return () => unsubscribe();
}, []);

  // 로그인 함수
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 회원가입 함수
  const signup = async (email, password, role = 'user') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    // Firestore에 사용자 역할 저장
    await setDoc(doc(db, 'users', newUser.uid), {
      role,
      email,
      createdAt: serverTimestamp()
    });

    return newUser;
  };

  // 로그아웃 함수
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);