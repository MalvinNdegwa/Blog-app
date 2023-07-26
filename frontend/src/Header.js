import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"



export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: "POST",
    })
    setUserInfo(null)
  }

  const username = userInfo?.username
  return (
    <header>
      <Link to='/' className='logo'>My Blog</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'> Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>

            <Link to='/Login'>Login</Link>
            <Link to='/Register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}