import React, { useEffect, useState } from 'react';
import SidebarContentAdmin from '../components/SidebarAdmin/SidebarContentAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import axios from 'axios'
import PageTitle from '../components/Typography/PageTitle'
import { useParams } from 'react-router-dom';
import {  Button
} from '@windmill/react-ui'
import './override.css'
const TicketChatUser = () => {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const { id }=useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };
  
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  // Function to handle sending the message
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
      const response = await axios.post(`https://localhost:7217/api/TicketResponseApi
      `, {
        ticketID: ticket.id,
        sender: user.userName,
        message: message,
        createdAt: new Date().toISOString(),
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      // Handle the response as needed
  
      // Reset the message input field
      setMessage('');
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  

  // Fetch the ticket information from the backend
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`https://localhost:7217/api/TicketApi/ticket/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://localhost:7217/api/TicketResponseApi?TicketID=${id}`);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicket();
    fetchMessages();
  }, [id]);

  return (
    <div className="flex h-screen bg-white-50 dark:bg-white-900">
     

      <div className="flex-1 flex flex-col">
       
        <div className="flex flex-1">
          <div className="w-2/3">
            <div className="ticket-chat-page">
              <br></br>
              <div className="ticket-info">
                {ticket && (
                  <>
                    <div className="white-box">
                      <span style={{ fontSize: 'large' }}>#{ticket.id}</span>
                    </div>
                    <span style={{ fontSize: 'large', fontWeight: 'bold', color: 'black', marginLeft: '10px' }}>
                      {ticket.title}
                    </span>
                  </>
                )}
              </div>
              <br></br>

              <div className="chat-interface">
                {/* Render the chat messages and input components */}
                {messages.map((message) => (
                    <div key={message.id} className="message-bubble">
                      <h1 className="sender">{message.sender}:</h1>
                      <div className="message-text-box">
                   <span className="message-text">{message.message}</span>
                   
                        </div>
                        <div className="timestamp">{formatTimestamp(message.createdAt)}</div>
                    </div>
                  
                  ))}
                <div className="message-container">
                <form className="message-container"  onSubmit={handleSubmit}>
               <textarea className="message-input"
                value={message}
                onChange={handleChange}
                  placeholder="Type your message..."
                  rows={4}
                  ></textarea>
    <button style={{padding: '9px 30px',
                backgroundColor: 'rgb(110,190,176)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',marginBottom:'50px'}} type="submit">Envoyer</button>
  </form>
            
          </div>
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <div className="sidebar-right">
              {/* Render your right sidebar content */}
              <h1 style={{ fontSize: 'large', fontWeight: 'bold', color: 'rgb(110,190,176)', marginLeft: '10px' }}>Details de Ticket</h1>
              <br></br>
              <br></br>
               

              {ticket && (
                  <>

                <p style={{ marginBottom: '15px' }}>
                   <span style={{ color: 'grey', fontWeight: '600' }}>Description:</span>
                     <span style={{ marginLeft: '10px', color: 'black', fontWeight: '600',marginBottom:'190px' }}> {ticket.description}</span>
                </p>
                
               
                <p style={{ marginBottom: '15px' }}>
                   <span style={{ color: 'grey', fontWeight: '600' }}>Priorité:</span>
                     <span style={{ marginLeft: '10px', color: 'black', fontWeight: '600' }}> {ticket.priority}</span>
                </p>
                
                
                <p style={{ marginBottom: '15px' }}>
                   <span style={{ color: 'grey', fontWeight: '600' }}>Status:</span>
                     <span style={{ marginLeft: '10px', color: 'black', fontWeight: '600' }}> {ticket.status}</span>
                </p>
                <p style={{ marginBottom: '15px' }}>
                   <span style={{ color: 'grey', fontWeight: '600' }}>Numéro Telephone:</span>
                     <span style={{ marginLeft: '10px', color: 'black', fontWeight: '600' }}> {ticket.telNumber}</span>
                </p>
                <h3 className="text-lg font-bold mt-4">Liste des erreurs</h3>
              {ticket.zoneErrors.length > 0 ? (
                ticket.zoneErrors.map((error) => (
                  <div key={error.id} className="mt-2"   style={{
                    position: 'relative',
                    paddingLeft: '16px',
                    marginBottom: '4px',
                    backgroundColor: 'pink',
                  }}>
                    <div className="marker" >
                      <span className="font-bold" >Nature d'Erreur:</span> {error.natureErreur}
                    </div>
                    <div>
                      <span className="font-bold">Code d'Erreur:</span> {error.codeErreur}
                    </div>
                    <div>
                      <span className="font-bold">Description:</span> {error.libelle}
                    </div>
                    <div>
                      <span className="font-bold">Omschrijving:</span> {error.omschrijving}
                    </div>
                    <hr className="my-2" />
                    
                  </div>
                ))
              ) : (
                <div>No errors found.</div>
              )}
                
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketChatUser;
