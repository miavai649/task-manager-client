import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assests/logo/myLogo.png';
import { AuthContext } from '../../Context/AuthContext';

const MyNavbar = () => {

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogOut = () => {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

    return (
        <Navbar
      className='mx-12'
  fluid={true}
  rounded={true}
>
  <Navbar.Brand>
    <img
      src={logo}
      className="mr-3 h-6 sm:h-9 w-12"
      alt="Flowbite Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    Schedules
    </span>
  </Navbar.Brand>
  <div className="flex md:order-2">
  {
    user?.uid ? <Dropdown
    arrowIcon={false}
    inline={true}
    label={<Avatar alt="User settings" img={user?.photoURL} rounded={true}/>}
  >
    <Dropdown.Header>
      <span className="block text-sm">
        {user?.displayName}
      </span>
      <span className="block truncate text-sm font-medium">
        {user?.email}
      </span>
    </Dropdown.Header>
    <Dropdown.Divider />
    <Dropdown.Item onClick={handleLogOut}>
      Sign out
    </Dropdown.Item>
  </Dropdown> : <Link to={'/login'}><Button>
      Log in
    </Button></Link>
  }
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    <Link to='/'
    className='text-base'
      active={true}
    >
      Add Task
    </Link>
    <Link to='/mytask' className='text-base'>
      My Task
    </Link>
    <Link to='/completedtask' className='text-base'>
      Completed Task
    </Link>
    </Navbar.Collapse>
</Navbar>
    );
};

export default MyNavbar;