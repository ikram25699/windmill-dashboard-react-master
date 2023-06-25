import React, { useState, useEffect } from 'react'

import { EditIcon, TrashIcon,MenuIcon } from '../icons'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon,FormsIcon,MailIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { useHistory } from "react-router-dom";
import SectionTitle from '../components/Typography/SectionTitle'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
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
import { Link } from 'react-router-dom';
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
const TicketsAdmin = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const history = useHistory();
  const history3= useHistory();
  const [data, setData] = React.useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null);
  const handleMailClick = (id) => {
    history.push( `/ticketChat/${id}`);
  };
  function openModal(ticket) {
    setSelectedTicket(ticket);
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }
  

  const takeChargeOfTicket = async () => {
    const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const ticketId = selectedTicket.id;
       
    const url = `https://localhost:7217/api/TicketApi/${selectedTicket.id}/take-charge?assignedToName=${user.userName}`;
   
  
    try {
      const response = await axios.put(url, null);
      console.log(response.data);
      history.push( `/ticketsAdmin`); // Handle the response as needed
     
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  const show = () => {
    
    axios.get("https://localhost:7217/api/TicketApi")
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
  }, []);
  const handleStatusFilter = (event) => {
    setFilterStatus(event.target.value);
  };

  const handlePriorityFilter = (event) => {
    setFilterPriority(event.target.value);
  };

  const filteredData = data.filter((ticket) => {
    if (filterStatus && ticket.status !== filterStatus) {
      return false;
    }
    if (filterPriority && ticket.priority !== filterPriority) {
      return false;
    }
    return true;
  });
  return (
    <div
    className={`flex h-screen bg-gray-50 dark:bg-white-900 `}
  >
    <div> <SidebarContentAdmin className={'background-sidebar'} /></div>
    
      
        
          {/* Render your sidebar component */}
          
          <div className="flex flex-col flex-1 w-full"> 
          <HeaderAdmin/>
          

          
<br></br>
      <SectionTitle>Tickets des utilisateurs</SectionTitle>
      <div className="flex items-center space-x-4 mb-4">
          <label htmlFor="statusFilter" className="text-lg">
            Status:
          </label>
          <select
            id="statusFilter"
            className="px-2 py-1 border border-gray-300 rounded-md"
            value={filterStatus}
            onChange={handleStatusFilter}
          >
            <option value="">Tous</option>
            <option value="Résolu">Résolu</option>
            <option value="Non Résolu">Non Résolu</option>
          </select>
          <label htmlFor="priorityFilter" className="text-lg">
            Priorité:
          </label>
          <select
            id="priorityFilter"
            className="px-2 py-1 border border-gray-300 rounded-md"
            value={filterPriority}
            onChange={handlePriorityFilter}
          >
            <option value="">Tous</option>
            <option value="Faible">Faible</option>
            <option value="Normale">Normale</option>
            <option value="Élevée">Élevée</option>
          </select>
        </div>
      <TableContainer  >
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Sujet</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priorité</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Création</TableCell>
              <TableCell>Agent Support</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                    <Link to={`viewTicketAdmin/${data.id}`} className="text-black-500 hover:text-black-700 underline">
                      <p className="font-semibold">{data.title}</p>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {data.description}</span>
                </TableCell>
                <TableCell>
                <Badge type={data.priority === 'Faible' ? 'success' : (data.priority === 'Normale' ? 'primary' : 'danger')}>
                {data.priority}
                 </Badge>

                </TableCell>
                <TableCell>
                  <Badge type={data.status === 'Résolu' ? 'success' : 'danger'}>{data.status}</Badge>
                </TableCell>

                
                
                <TableCell> 
                  <span className="text-sm">{new Date(data.createdDate).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <span className="items-center text-sm"> {data.assignedToName}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="View" onClick={() =>handleMailClick(data.id)} >
                      <MailIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    
                    <Button layout="link" size="icon" aria-label="ticket"  onClick={() => openModal(data)}  >
                      <ChatIcon className="w-5 h-5" aria-hidden="true"  />
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Confirmez votre choix</ModalHeader>
        <ModalBody>
        Êtes-vous sûr de prendre en charge ce ticket ?
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button className="bg-red-500" onClick={() => takeChargeOfTicket(data)}>Confirmer</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
             Annuler
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        
      </div>
          </div>
          
          

    
      
     
    </div>
  );
}

export default TicketsAdmin;