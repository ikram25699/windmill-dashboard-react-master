import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Input, Label, Button } from '@windmill/react-ui'
import { Select } from '@windmill/react-ui'
import { useParams } from 'react-router-dom';
import SidebarContentAdmin from '../components/SidebarAdmin/SidebarContentAdmin'
import HeaderAdmin from '../components/HeaderAdmin';
import './override.css';
import './ProfileStyle.css';
function EditUser() {
    const { id }=useParams();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const history = useHistory();
  useEffect(() => {
    
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(token);
    }
    
  }, []);
  useEffect(() => {
    // Fetch user data from an API or any other source
    const fetchUserData = async (id) => {
        const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5248/api/UserRegistration/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }); // Replace 123 with the actual user ID
        const userData = response.data;

        // Set the state with the fetched user data
        setName(userData.name);
        setLastName(userData.lastName);
        setPassword(userData.password);
        setEmail(userData.userName);
        setRole(userData.role);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData(id);
  }, [id]);

  const handleUpdateUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:5248/api/UserRegistration/${id}`, {
        userName: userName,
        name:name,
        lastName: lastName,
        password: password, // You can include the password field if necessary
        role,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }); // Replace 123 with the actual user ID

      // Handle the response, e.g., display success message or redirect to another page
      console.log(response.data);
      history.push('/userManagement');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
        <div > <SidebarContentAdmin className={'background-sidebar'} /></div>
        <div className="flex flex-col flex-1 w-full"> 
    <HeaderAdmin/>
      {/* Rest of your code... */}
      <div className="container">
        <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div className="w-full">
            
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Modifier un utilisateur
            </h1>
            <Label>
              <span className="profile-p">Nom</span>
              <Input
                className="mt-1"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <Label>
              <span className="profile-p">Prénom</span>
              <Input
                className="mt-1"
                type="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Label>
            <Label>
              <span className="profile-p">Email</span>
              <Input
                className="mt-1"
                type="email"
                placeholder="john@doe.com"
                value={userName}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
            <Label>
              <span className="profile-p">Mot de passe</span>
              <Input
                className="mt-1"
                type="psd"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>
            <Label className="mt-4">
              <span className="profile-p">Rôle</span>
              <Select className="mt-1" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Sélectionnez un rôle</option>
                <option value="User">Utilisateur</option>
                <option value="Administrator">Admin</option>
              </Select>
            </Label>
            <br></br>

            {/* Rest of the form */}
            
            <Button className="bg-red-500" onClick={handleUpdateUser} block>
              Mettre à jour
            </Button>

            {/* Rest of the code */}
          </div>
        </main>
      </div>
      </div>
      {/* Rest of your code... */}
    </div>
  );
}

export default EditUser;
