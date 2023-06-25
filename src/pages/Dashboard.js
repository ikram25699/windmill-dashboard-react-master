import React, { useState, useEffect } from 'react'

import { EditIcon, TrashIcon,MenuIcon } from '../icons'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon,OutlinePersonIcon} from '../icons'
import RoundIcon from '../components/RoundIcon'
import { useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, Label, Select} from '@windmill/react-ui'
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
import axios from 'axios'
import './override.css';
function Dashboard() {
  const [user, setUser] = useState(null);
  const [ErrorData, setErrorData] = useState([]);
  const history = useHistory();
  const history2=useHistory();
  const [page, setPage] = useState(1)
  const [data, setData] = React.useState([]);
  const [token, setToken] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [deletionKey, setDeletionKey] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ticketSubject, setTicketSubject] = useState('');
const [ticketEmail, setTicketEmail] = useState('');
const [ticketPhoneNumber, setTicketPhoneNumber] = useState('');
const [ticketDescription, setTicketDescription] = useState('');
const [ticketPriority, setTicketPriority] = useState('');
const [fileId, setFileId] = useState(null);


  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setIsModalOpen(false);
    setTicketSubject('');
    setTicketEmail('');
    setTicketPhoneNumber('');
    setTicketDescription('');
    setTicketPriority('');
  }
 
  const getErrors = (id) => {
    axios.get('http://localhost:5004/api/ZoneErrorsProducer/api/customer/GetFileRecordErrors?fileId='+id)
      .then(response => {
        setFileId(id)
        const errors = response.data;
        setErrorData(errors);
        openModal(); // Open the modal upon successful response
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(token);
    }
    
  }, []);
  const renderFile = (id) => {
    history.push(`/file/${id}`);
  };

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const submitTicket = (id) => {
    const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
    // Create an object with the ticket data
    const ticketData = {
      userName: user.userName,
      title: ticketSubject,
      telNumber: ticketPhoneNumber,
      email: ticketEmail,
     status :"Non resolu",
      description: ticketDescription,
      priority: ticketPriority,
    };
  
    // Make the POST request
    axios.post('https://localhost:7217/api/TicketApi?userId='+user.userID+'&fileId='+fileId, ticketData)
      .then(response => {
        // Handle the response
        console.log(response.data);
        closeModal(); // Close the modal after successful submission
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  };
  
  /*const show=()=>{
    axios.get("https://localhost:7075/api/FileAPI")
     .then(response => {
       const data = response.data;
      console.log(data)
       setData(data)
     })}

     useEffect(() => {
      show();
      console.log(data)
    
    }, []);*/
    const handleViewFile = (file) => { 
      setSelectedFileId(file.id);// new function
      setSelectedFile(file);
    };

    const handleDeleteFile = (id) => {
      const token = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5248/api/FileAPI/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        })
        .then(response => {
          if (response.status === 200) {
            setDeletionKey(prevKey => prevKey + 1);
            history2.push('/app/dashboard')
          }
        })
        .catch(error => {
          // Handle error
          console.log(error);
        });
    };
    

    const show = () => {
      const token = localStorage.getItem('token');
      axios.get("http://localhost:5248/api/FileAPI", {
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
    <>
      <PageTitle>Dashboard</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom de fichier</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
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
                  <span className="text-sm"> {data.size}</span>
                </TableCell>
                <TableCell>
                  <Badge type={"success"}>{data.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(data.createdDate).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="View"  onClick={() => renderFile(data.id)}>
                      <MenuIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDeleteFile(data.id)}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="ticket" onClick={() => getErrors(data.id)} >
                      <OutlinePersonIcon className="w-5 h-5" aria-hidden="true"  />
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
      <Label className="mt-4">
                <span>Sujet</span>
                <Input className="mt-1"  type="title" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} />
              </Label>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" value={ticketEmail} onChange={(e) => setTicketEmail(e.target.value)} placeholder="john@doe.com" />
              </Label>
              <Label className="mt-4">
                <span>Numéro Telephone</span>
                <Input className="mt-1"  type="TelNumber" value={ticketPhoneNumber} onChange={(e) => setTicketPhoneNumber(e.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Description</span>
                <Input className="mt-1 h-32 resize-none p-0 " style={{ paddingTop: '0.5rem' }}  type="Description" value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)}/>
              </Label>
              <Label className="mt-4">
              <span >Priorité</span>
              <Select className="mt-1" value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)}  >
                <option value="">Sélectionnez la priorité de votre ticket</option>
                <option value="Elevé">Elevé</option>
                <option value="Normale">Normale</option>
                <option value="Faible">faible</option>
              </Select>
            </Label>
        
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
       <Button className="bg-red-500" onClick={() => submitTicket(data.id)} >Upload</Button>
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
    
  )
}

export default Dashboard
