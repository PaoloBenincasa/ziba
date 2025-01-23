import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import SessionContextProvider from "./context/SessionContextProvider";


function App() {
  return (
    <div className="vh-100">
      <RouterProvider router={router} />
    </div>
  )
}

function Root() {
  return (
    <SessionContextProvider>
        <App />
    </SessionContextProvider>
  )
}

export default Root;
