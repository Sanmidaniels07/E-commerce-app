import { useSelector } from 'react-redux' // helps to select anything from the store
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

const ShowOnLoggedIn = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if(isLoggedIn){
        return children
    }
  
  return null
}
export const ShowOnLoggedOut = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if(!isLoggedIn){
        return children
    }
  
  return null
}

export default ShowOnLoggedIn
