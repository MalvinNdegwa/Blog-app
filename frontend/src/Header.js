import { Link } from "react-router-dom"


export default function Header() {
  
  // useEffect(() => {
  //   fetch('http://localhost:4000/profile', {
  //     credentials: 'include',
  //   })
  // }, [])

  return (
    <header>
      <Link to='/' className='logo'>My Blog</Link>
      <nav>
        <Link to='/Login'>Login</Link>
        <Link to='/Register'>Register</Link>
        <Link to='/Create'>Create New Post</Link>
      </nav>
    </header>
  )
}