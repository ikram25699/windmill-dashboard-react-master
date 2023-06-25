import React, { lazy } from 'react'
import  { useContext, useState,useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import userManagement from './pages/UserManagement'
import AddUser from './pages/AddUser'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ShowFile = lazy(() => import('./pages/ShowFile'))
const DashboardAdmin = lazy(() => import('./pages/DashboardAdmin'))
const UserManagement = lazy(() => import('./pages/UserManagement'))
const ProfilePage = lazy(() => import('./pages/UserProfile'))
const EditUser = lazy(() => import('./pages/EditUser'))
const viewTicket = lazy(() => import('./pages/viewTicket'))
const viewTicketAdmin = lazy(() => import('./pages/viewTicketAdmin'))
const TicketsAdmin = lazy(() => import('./pages/TicketsAdmin'))
const TicketChat = lazy(() => import('./pages/TicketChat'))
const TicketChatUser = lazy(() => import('./pages/TicketChatUser'))
function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    
      
    }
   

    // Retrieve token from localStorage
    
  }, []);
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/viewticket/:id" component={viewTicket} />
          <Route exact path="/viewticketAdmin/:id" component={viewTicketAdmin} />
          <Route exact path="/ticketsAdmin" component={TicketsAdmin} />
          <Route exact path="/ticketChat/:id" component={TicketChat} />
          <Route exact path="/ticketChatUser/:id" component={TicketChatUser} />
          <Redirect exact from="/" to="/login" />
          {  user && user.userRole === 'User' && (
                      <>
          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
         
          <Route exact path="/file/:id" component={ShowFile} />

          </>
          )}


{    user && user.userRole === 'Administrator' && (
                    
                    <>
         
          <Route exact path="/dashboardAdmin" component={DashboardAdmin} />
          
          <Route exact path="/userManagement" component={userManagement} />
          <Route exact path="/editUser/:id" component={EditUser} />
          <Route exact path="/addUser" component={AddUser} />

          </>
)}
<Route path="/" element={"/login" } />
        </Switch>
        
      </Router>
    </>
  )
}

export default App
