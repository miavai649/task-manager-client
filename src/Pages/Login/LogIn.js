import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const LogIn = () => {
    const { loading, setLoading, signin, googleAuthentication } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    
    const handleLogIn = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value 
        const password = form.password.value

        signin(email, password)
            .then(result => {
            const user = result.user
            console.log(user)
            form.reset()
            setLoading(false)
              toast.success('Logged in successfully')
              navigate(from, {replace: true})
            })
          .catch(err => {
            console.log(err)
            setLoading(false)
            toast.error(err.message);
          })

  }
  
  const handleGoogleLogin = () => {
    googleAuthentication()
    .then((result) => {
      const user = result.user;
      console.log(user);
      setLoading(false)
      toast.success("Logged in Successfully");
      navigate(from, {replace: true})
    })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        toast.error(err.message);
      });
  }

    return (
        <div className="max-w-md container mx-auto my-52">
      <Card>
        <form onSubmit={handleLogIn} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              name="email"
              type="email"
              placeholder="Your email"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" name="password" type="password" required={true} />
          </div>
          <div className="w-full">
            {
              loading ? 
              <Button className="w-full">
                <div>
                  <Spinner
                    size="sm"
                    light={true}
                  />
                </div>
                Loading ...
              </Button> : <Button className="w-full" type="submit">Log in</Button>
            }
          </div>
          </form>
          <p className="text-center">Don't have any account? <Link className="text-blue-700 font-bold" to='/signup'>Sign up</Link></p>
        <div className="flex justify-center">

        <button onClick={handleGoogleLogin}><FaGoogle className="text-4xl"></FaGoogle></button>
        </div>
      </Card>
    </div>
    );
};

export default LogIn;