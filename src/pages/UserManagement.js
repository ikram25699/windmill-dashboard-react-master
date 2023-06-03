import React, { useState, useEffect } from 'react'

import { EditIcon, TrashIcon,MenuIcon } from '../icons'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { useHistory } from "react-router-dom";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import SidebarContentAdmin from '../components/SidebarAdmin/SidebarContentAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import axios from 'axios'
import '../pages/override.css'
const UserManagement = () => {
  const [deletionKey, setDeletionKey] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [token, setToken] = useState('');
  const history2=useHistory();
  const history=useHistory();
  useEffect(() => {
    
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(token);
    }
    
  }, []);
  const handleDeleteFile = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5248/api/UserRegistration/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      })
      .then(response => {
        if (response.status === 200) {
          history2.push('/userManagement')
        }
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  };
  const handleEditUser = (id) => {
    // Redirect to the update user page with the user ID
    history.push(`/editUser/${id}`);
  };
  const show = () => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:5248/api/UserRegistration", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        setData(data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  };
  useEffect(() => {
    show();
  }, [deletionKey]);

  return (
    <div
    className={`flex h-screen bg-gray-50 dark:bg-gray-900 `}
  >
    <div> <SidebarContentAdmin  /></div>
    
      
        
          {/* Render your sidebar component */}
          
          <div className="flex flex-col flex-1 w-full"> 
          <HeaderAdmin/>
          <>
          <PageTitle>Utilisateurs</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{data.name}</p>
                      
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm"> {data.lastName}</p>
                </TableCell>
                
                <TableCell>
                  <p className="text-sm">{data.userName}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{data.role}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="View" onClick={() => handleEditUser(data.id)} >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDeleteFile(data.id)}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          
        </TableFooter>
      </TableContainer>
      </>
          </div>
          
          
          
          

    
      
     
    </div>
  );
}

export default UserManagement;