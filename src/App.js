import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Router } from "./Routes/Routes/Router";

function App() {
  return (
    <div>
      <RouterProvider router={Router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
