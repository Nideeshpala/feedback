import React, { createContext, useState } from 'react'

export const loginContext=createContext()
function Contextshare({children}) {

    const [loginData,setloginData]=useState("")
  return (
    <div>
        <loginContext.Provider value={{loginData,setloginData}}>

            {children}
        </loginContext.Provider>


    </div>
  )
}

export default Contextshare