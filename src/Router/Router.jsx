import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Public from '../Pages/Public/Public'
import DriveLayout from '../Pages/Drive/DriveLayout'
import Home from '../Pages/Drive/Home/Home'
import Login from '../Pages/Auth/Login'
import Signup from '../Pages/Auth/Signup'
import Files from '../Pages/Drive/Files/Files'
import AuthChecker from '../helper/authChecker'
import Recent from '../Pages/Drive/Recent/Recent'
import Folders from '../Pages/Drive/Folders/Folders'
import Search from '../Pages/Drive/Search/Search'
import Settings from '../Pages/Drive/Settings/Settings'
import Profile from '../Pages/Drive/Settings/Profile'
import Shared from '../Pages/Drive/Shared/Shared'
import Password from '../Pages/Drive/Settings/Password'
import Users from '../Pages/Drive/Settings/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        // element: <Public />
        element: <Login />,
      },
      {
        path: 'drive',
        element: <AuthChecker> <DriveLayout /></AuthChecker>,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'files',
            element: <Files />
          },
          {
            path: 'recent',
            element: <Recent />
          },
          {
            path: 'folders',
            element: <Folders />
          },
          {
            path: 'search',
            element: <Search />
          },
          {
            path: 'shared',
            element: <Shared />
          },
          {
            path: 'recovery',
            element: <Files mode={"recovery"} />
          },
          {
            path: "settings",
            element: <AuthChecker>
              <Settings />
            </AuthChecker>,
            children: [
              {
                index: true,
                element: <Profile />
              },
              {
                path: "password",
                element: <Password />
              },
              {
                path: "users",
                element: <Users />
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/shared/:id',
    element: <Files mode={"shared"} />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])


export default router
