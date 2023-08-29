import {createContext, useContext, useState} from "react";
import axios from "../api/axios.ts";
import {useNavigate} from "react-router";
import UserInterface from "../Interfaces/UserInterface";

const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<UserInterface>(null);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const getUser = async () => {
    const {data} =await axios.get('/api/user');
    setUser(data);
  }

  const login = async (data: any) => {
    await csrf();
    try {
      await axios.post('/login', data).then(() => {
        getUser();
        navigate('/');
      });
    } catch (e: any) {
      if (e.response && e.response.status === 422){
        setErrors(e.response.data.errors);
      }
    }
  }

  const register = async (data: any) => {
    await csrf();
    try {
      await axios.post('/register', data).then(() => {
        getUser();
        navigate('/');
      });
    } catch (e: any) {
      if (e.response && e.response.status === 422){
        setErrors(e.response.data.errors);
      }
    }
  }

  return <AuthContext.Provider value={{ user, errors, getUser, login, register}}>
    {children}
  </AuthContext.Provider>
}

export default function useAuthContext(){
  return useContext(AuthContext);
}
