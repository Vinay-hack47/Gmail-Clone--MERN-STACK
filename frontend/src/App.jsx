import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './App.css'
import Sidebar from './components/Sidebar'
import Inbox from './components/Inbox'
import Mail from "./components/Mail"
import Body from './components/Body'
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { Toaster } from 'react-hot-toast'
import ScheduledEmailss from "./components/ScheduledEmailss"
import ScheduledMail from "./components/ScheduledMail"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <Inbox />,
      },
      {
        path: '/mail/:id',
        element: <Mail />,
      },
      {
        path: '/scheduled-email',
        element: <ScheduledEmailss />
      },
      {
        path: "/scheduled-email/:id",
        element: <ScheduledMail />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
]);

function App() {
  return (
    <>

      {/* <RouterProvider router={appRouter}>
     <div className='bg-[#2c3f5d] h-screen'>
         <Navbar />
     <div className="absolute w-[30%] bottom-0 right-20 z-10">
     <SendEmail ></SendEmail>
     </div>
     </div>
     </RouterProvider>
     <Toaster></Toaster>
    </> */}

      <RouterProvider router={appRouter}>
        <div className='bg-[#2c3f5d] h-screen'>
          
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
