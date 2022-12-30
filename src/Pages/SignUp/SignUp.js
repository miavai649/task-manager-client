import {
  Button,
  Card,
  FileInput,
  Label,
  Spinner,
  TextInput
} from "flowbite-react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const SignUp = () => {
  const imgHostKey = process.env.REACT_APP_imagebb_key;
  const { createUser, updateUserProfile, loading, setLoading, googleAuthentication } =
    useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.files[0];
    const password = form.password.value;

    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((imgData) => {
        createUser(email, password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            form.reset();
            updateUserProfile(name, imgData.data.url)
              .then(() => {
                toast.success("Signed up Successfully");
                setLoading(false);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
            toast.error(err.message);
          });
      })
      .catch((err) => console.log(err));

    // console.log(name, email, image, password)
  };

  const handleGoogleSignUp = () => {
    googleAuthentication()
    .then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("Sign Up Successfully");
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
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text1" value="Name" />
            </div>
            <TextInput
              id="text1"
              type="text"
              name="name"
              placeholder="Your name"
              required={true}
            />
          </div>
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
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Photo" />
            </div>
            <FileInput name="image" id="file" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              name="password"
              type="password"
              required={true}
            />
          </div>
          <div className="w-full">
            {loading ? (
              <Button className="w-full">
                <div>
                  <Spinner size="sm" light={true} />
                </div>
                Loading ...
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Sign up
              </Button>
            )}
          </div>
        </form>
        <p className="text-center">Already have an account? <Link className="text-blue-700 font-bold" to='/login'>Log in</Link></p>
        <div className="flex justify-center">

        <button onClick={handleGoogleSignUp}><FaGoogle className="text-4xl"></FaGoogle></button>
        </div>
      </Card>
      
    </div>
  );
};

export default SignUp;
