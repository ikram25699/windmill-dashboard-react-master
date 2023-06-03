import React, { useState, useEffect } from 'react'

import { EditIcon, TrashIcon,MenuIcon } from '../icons'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon,FormsIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { useHistory } from "react-router-dom";
import SectionTitle from '../components/Typography/SectionTitle'
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

import { Card, CardBody } from '@windmill/react-ui'

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
const DashboardAdmin = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    fetchTotalUsers();
  }, []);
  const fetchTotalUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5248/api/UserRegistration', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      
      const data = response.data;
      setTotalUsers(data.length);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };
  return (
    <div
    className={`flex h-screen bg-gray-50 dark:bg-white-900 `}
  >
    <div> <SidebarContentAdmin className={'background-sidebar'} /></div>
    
      
        
          {/* Render your sidebar component */}
          
          <div className="flex flex-col flex-1 w-full"> 
          <HeaderAdmin/>
          

          
<br></br>
      <SectionTitle>Statistiques</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total des utilisateurs" value={totalUsers.toString()}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total des fichiers eFact" value="10">
          <RoundIcon
            icon={FormsIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        

        <InfoCard title="Total réclamations" value="0">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
          </div>
          
          

    
      
     
    </div>
  );
}

export default DashboardAdmin;