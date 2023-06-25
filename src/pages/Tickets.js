import React, { useState, useEffect } from 'react'

import { EditIcon, TrashIcon,MenuIcon, ChartsIcon, PagesIcon, CardsIcon, OutlineCogIcon, MailIcon } from '../icons'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon,FormsIcon} from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import RoundIcon from '../components/RoundIcon'
import { useHistory } from "react-router-dom";
import SectionTitle from '../components/Typography/SectionTitle'
import { Link } from 'react-router-dom';

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
import { Input, Label, Select} from '@windmill/react-ui'
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

const Tickets = () => {
    const [data, setData] = React.useState([]);
    const [user, setUser] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState(null); // new state variable
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketEmail, setTicketEmail] = useState('');
    const [ticketPhoneNumber, setTicketPhoneNumber] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const [ticketPriority, setTicketPriority] = useState('');
    const [ticketStatus, setTicketStatus] = useState('');
    const [ticketClosedDate, setTicketClosedDate] = useState('');
    const [ticketDetails, setTicketDetails] = useState({});
    const history2=useHistory();
    const history = useHistory();
    const handleMailClick = (id) => {
      history.push( `ticketChatUser/${id}`);
    };

    function openModal(ticket) {
      setSelectedTicket(ticket);
      setIsModalOpen(true)
      fetchTicketDetails(ticket.id);
      
    }
  
    function closeModal() {
      setIsModalOpen(false)
    
    }
    useEffect(() => {
      if (selectedTicket) {
        setTicketSubject(selectedTicket.title || '');
        setTicketEmail(selectedTicket.email || '');
        setTicketPhoneNumber(selectedTicket.telNumber || '');
        setTicketDescription(selectedTicket.description || '');
        setTicketPriority(selectedTicket.priority || '');
        setTicketStatus(selectedTicket.status || '');
      }
    }, [selectedTicket]);
    const fetchTicketDetails = (ticketId) => {
      axios.get(`https://localhost:7217/api/TicketApi/ticket/${ticketId}`)
        .then(response => {
          const ticketData = response.data;
          setTicketDetails(ticketData);
        })
        .catch(error => {
          console.log(error);
        });
    };
    useEffect(() => {
        // Retrieve user information from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    const fetchData = () => {
        const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
        const url = 'https://localhost:7217/api/TicketApi/user/'+user.userID;
      
        axios.get(url)
          .then(response => {
            const responseData = response.data;
            console.log(data);
            setData(responseData);
          })
          .catch(error => {
            console.log(error);
          });
      };
      useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
      }, []);
      const handleEditTicket = () => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        const ticketId = selectedTicket.id;
    
        const ticketData = {
          
          title: ticketSubject,
          status: ticketStatus,
          telNumber: ticketPhoneNumber,
          email: ticketEmail,
        
          description: ticketDescription,
          priority: ticketPriority,
          
        };
    
        axios
          .put(`https://localhost:7217/api/TicketApi/${user.userID}?ticketId=${ticketId}`, ticketData)
          .then(response => {
            console.log(response.data);
            closeModal(); // Close the modal after successful update
            fetchData(); // Fetch updated ticket data
          })
          .catch(error => {
            console.log(error);
          });
      };

      const handleDeleteTicket = (id) => {
        
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        axios
          .delete('https://localhost:7217/api/TicketApi/' +user.userID + '?ticketId=' +id)
          .then(response => {
            if (response.status === 200) {
              
              fetchData();
          history2.push('/app/tickets');
            }
          })
          .catch(error => {
            // Handle error
            console.log(error);
          });
      };
    
    return (
     <>
      
     
     <PageTitle> Mes tickets</PageTitle>
     
     
     <TableContainer  >
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Sujet</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priorité</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Création</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                    <Link to={`viewTicket/${data.id}`} className="text-black-500 hover:text-black-700 underline">
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
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="View" onClick={() =>handleMailClick(data.id)}>
                      <ChatIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDeleteTicket(data.id)}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="ticket" onClick={() => openModal(data)} >
                      <EditIcon className="w-5 h-5" aria-hidden="true"  />
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
     <ModalHeader>Créer Ticket Support </ModalHeader>
     <ModalBody>
     
     <div className="w-96 mx-auto p-8 bg-gray-100 border rounded-lg">
            {/* Populate the input fields with selected ticket data */}
            <Label className="mt-4">
              <span>Sujet</span>
              <Input className="mt-1" type="title" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} />
            </Label>
            <Label>
              <span>Email</span>
              <Input className="mt-1" type="email" value={ticketEmail} onChange={(e) => setTicketEmail(e.target.value)} placeholder="john@doe.com" />
            </Label>
            <Label className="mt-4">
              <span>Numéro Telephone</span>
              <Input className="mt-1" type="TelNumber" value={ticketPhoneNumber} onChange={(e) => setTicketPhoneNumber(e.target.value)} />
            </Label>
            <Label className="mt-4">
              <span>Description</span>
              <Input className="mt-1 " style={{ paddingTop: '0.5rem' }} type="Description"value={ticketDescription}  onChange={(e) => setTicketDescription(e.target.value)} />
            </Label>
            <Label className="mt-4">
              <span>Priorité</span>
              <Select className="mt-1" value={ticketPriority}  onChange={(e) => setTicketPriority(e.target.value)}>
                <option value="">Sélectionnez la priorité de votre ticket</option>
                <option value="Elevé">Elevé</option>
                <option value="Normale">Normale</option>
                <option value="Faible">Faible</option>
              </Select>
            </Label>
            <Label className="mt-4">
              <span>Status</span>
              <Select className="mt-1" value={ticketStatus}  onChange={(e) => setTicketStatus(e.target.value)}>
                <option value="">Sélectionnez le status de votre ticket</option>
                <option value="Résolu">Résolu</option>
                <option value="Non Résolu">Non Résolu</option>
               
              </Select>
            </Label>

            {/* Show the Closed Date input when the status is resolved */}
           
          </div>
    
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
       <Button className="bg-red-500" onClick={handleEditTicket} >Upload</Button>
       </div>
       <div className="block w-full sm:hidden">
         <Button block size="large" layout="outline" onClick={closeModal}>
           Cancel
         </Button>
       </div>
       <div className="block w-full sm:hidden">
         <Button block size="large" >
           Accept
         </Button>
       </div>
     </ModalFooter>
   </Modal>
     
     
     
     
     
     
     
     </>
    );
  }
  
  export default Tickets;