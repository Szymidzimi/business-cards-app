import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../Context/LoginContext";

interface WraperProps{
    children:React.ReactNode
}

const UserContext: React.FC<WraperProps> = ({children}) => {
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const value =useMemo(()=>({user,setUser}),[user]);

    const authCheck= async ()=>{
      try {

        const res =await fetch("/isUserAuth", {
          headers: {
            "x-access-token": localStorage.getItem("token") || "",
          },
        })
       const user = await res.json()
       if(!user){
        navigate("/sign")
        return;
       }
       setUser(user);
        
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      authCheck();
      setInterval(()=>authCheck(), 900_000)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


  return (
    <>
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    </>
    
  );
};

export default UserContext;
