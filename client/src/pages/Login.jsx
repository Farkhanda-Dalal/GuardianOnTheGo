import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
const Login = () => {

  const [data, setData] = useState({
      role:"",
      phone: "",
      password: "",
    });

  const loginHandler=async (e) => { 
    e.preventDefault();
    const {role, phone,password}=data;
   try{
    const {data}=await axios.post('/login',{role, phone,password})
    if(data.error){
      toast.error(data.error)
    }
    else{
      toast.success(data.success)
    }
   }
   catch(e){
    console.log(e)
   }
   }

  const login= () => { }
  return (
    <form onSubmit={loginHandler}>
      <div>
        <label>Login As</label>
        <label>
          <input
            type="radio"
            name="role"
            value="guardian"
            checked={data.role === "guardian"}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
          Guardian
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="co-guardian"
            checked={data.role === "co-guardian"}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
          Co-Guardian
        </label>
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Enter..."
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>
      <div>
        <label>Enter Password</label>
        <input
          type="password"
          placeholder="Enter..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div>
        <button type="submit">LOGIN</button>
      </div>
    </form>
  )
}

export default Login