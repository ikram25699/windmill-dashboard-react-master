import React, { useEffect, useState } from 'react';
import { Label, Input, Button } from '@windmill/react-ui'
import './ProfileStyle.css'
import Care from '../assets/img/conncare.png';
import SidebarContentAdmin from '../components/SidebarAdmin/SidebarContentAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import { useHistory } from "react-router-dom";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = React.useState([]);
  
  const history=useHistory();
 
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleEditUser = () => {
    // Redirect to the update user page with the user ID
    history.push(`/editUser/${user.userID}`);
  };
  return (
    <div
    className={`flex h-screen bg-gray-50 dark:bg-gray-900 `}
  >
    <div> <SidebarContentAdmin className={'background-sidebar'} /></div>
    
      
        
          {/* Render your sidebar component */}
          
          <div className="flex flex-col flex-1 w-full"> 
          <HeaderAdmin/>
          
    
    <div className="profile-container">
   
      <div className="profile-card">
      
      <div className="image-container"> 
      
      <img 
          
          src={Care}
          className="centered-image"
          alt="Profile Image"
          
        />
      </div>
        
      
<br></br>
        {user ? (
          <>
            <div className="profile-header">
              
             
              <Label className="mt-4" >
                <p className="profile-p"> Nom </p>
                <Input style={{  backgroundColor: '#f8f8f8',color:'gray',  fontWeight: 'bold'}} className="mt-4"  value={user.name}  />
              </Label>
              <Label className="mt-4">
                <p className="profile-p"> Prénom </p>
                <Input style={{  backgroundColor: '#f8f8f8',color:'gray',  fontWeight: 'bold' }} className="mt-4"  value={user.lastName}  />
              </Label>
              <Label className="mt-4">
                <p className="profile-p"> Email </p>
                <Input style={{  backgroundColor: '#f8f8f8',color:'gray',  fontWeight: 'bold' }} className="mt-1"  value={user.userName}  />
              </Label>
              <Label className="mt-4">
                <p className="profile-p"> Role </p>
                <Input style={{  backgroundColor: '#f8f8f8',color:'gray',  fontWeight: 'bold' }} className="mt-1"  value={user.userRole}  />
              </Label>
              
              
            </div>
            <br></br>
            
            <div className="profile-footer">
              <button style={{width: '650px',}} className="edit-profile-button" onClick={() => handleEditUser(user.userID)}>Modifier</button>
            </div>
          </>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProfilePage;