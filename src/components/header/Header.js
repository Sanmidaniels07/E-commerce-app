import React, {useEffect, useState} from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import styles from  "./Header.module.scss"
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa"
import {HiOutlineMenuAlt3} from "react-icons/hi"
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import {useDispatch} from "react-redux"
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLoggedIn, { ShowOnLoggedOut } from '../hiddenLink/hiddenLink'
const logo = (
<div className={styles.logo}>
        <Link to='/'>
        <h2>
          e<span>Shop</span>.
        </h2>
        </Link>
      </div>
)

const cart = (
  <span className={styles.cart}>
            <Link to="/cart">
               Cart 
               <FaShoppingCart size={20}/>
               <p>0</p>
               </Link>
          </span>
)

const activeLink = ({isActive}) => 
(isActive ? `${styles.active}` : "")

const Header = () => {
const [showMenu, setShowMenu] = useState(false)
const [displayUser, setDisplayUser] = useState("")

const dispatch =useDispatch()

const navigate = useNavigate()

// This checks if the user is logged in or not
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      // const uid = user.uid;

      if(user.displayUser == null) {
        const u1 = user.email.substring(0, user.email.indexOf("@"));
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
        setDisplayUser(uName)
      } else{
        setDisplayUser(user.displayUser)
      }
      dispatch(SET_ACTIVE_USER({
        email: user.email,
        userName: user.displayUser ? user.displayUser : displayUser,
        userID: user.uid,
      }))
    } else {
        setDisplayUser("")
        dispatch(REMOVE_ACTIVE_USER())
    }
  });
}, [ dispatch, displayUser ])

const toggleMenu = () => {
    setShowMenu(!showMenu)
}

const hideMenu = () => {
  setShowMenu(false)
}


const logoutUser =() => {
  signOut(auth).then(() => {
    toast.success("Logout Successfully.")
    navigate("/")
  }).catch((error) => {
    toast.error(error.message)
  }); 
}


  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}
        >
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} 
          
             onClick={hideMenu}
             >
          </div>

          <ul onClick={hideMenu}>

            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu}/>
            </li>

          <li>
            <NavLink to="/" className={activeLink} > 
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={activeLink}> 
              Contact us
            </NavLink>
          </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
          <span className={styles.links}> 
           <ShowOnLoggedOut><NavLink to="/login" className={activeLink}>Login</NavLink></ShowOnLoggedOut>
            
            <ShowOnLoggedIn>
              <a href='#home' style={{color: "#ff7722"}}>
              <FaUserCircle size={16}/>
              Hi, {displayUser}
            </a>
            </ShowOnLoggedIn>
            <ShowOnLoggedIn><NavLink to="/order-history" className={activeLink}>My Orders</NavLink></ShowOnLoggedIn>
            <ShowOnLoggedIn><NavLink to="/" onClick={logoutUser}>Logout</NavLink></ShowOnLoggedIn>

          </span>
          {cart}
          </div>
        </nav>

        <div className={styles['menu-icon']}>
        {cart}
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
  )
}

export default Header
