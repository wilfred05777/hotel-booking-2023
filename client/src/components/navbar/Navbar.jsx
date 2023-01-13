import './navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navContainer">
        <span className="logo">Julian's Hotel</span>
        <div className="navItems">
          <button className="navbutton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar