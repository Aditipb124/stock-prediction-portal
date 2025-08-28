import { useState, useContext , createContext} from 'react'

// create the context
const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('access_token') 
// !! will get the boolean value means if there is access Token it will set the useState to true or else false 
    )
  return (
// provide the context
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};