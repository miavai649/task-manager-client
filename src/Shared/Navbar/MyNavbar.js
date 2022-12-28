import { Button, Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assests/logo/myLogo.png';

const MyNavbar = () => {
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
    <Button>
      Get started
    </Button>
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