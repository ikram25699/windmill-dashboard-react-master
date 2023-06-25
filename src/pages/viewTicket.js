import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/Typography/SectionTitle';
import { Input, Label, Select} from '@windmill/react-ui'
import './override.css';
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
const ViewTicket = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get(`https://localhost:7217/api/TicketApi/ticket/${id}`);
        setTicketData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicketData();
  }, [id]);

  if (!ticketData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <br></br>
  <div class="white-box" >#: <span>{ticketData.id}</span> </div>
  
  <br></br>
  <div className="w-96 mx-auto p-8 bg-gray-100 border rounded-lg">
    {/* Populate the input fields with selected ticket data */}
    <div className="flex flex-wrap -mx-2">
      <div className="w-full px-2">
        <Label className="mt-4">
          <span className=" text-lg">Sujet</span>
          <Input className="mt-1" type="title" value={ticketData.title} />
        </Label>
      </div>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className=" text-lg">Email</span>
          <Input className="mt-1" type="email" value={ticketData.email} />
        </Label>
      </div>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className=" text-lg">Numéro Telephone</span>
          <Input className="mt-1" type="TelNumber" value={ticketData.telNumber} />
        </Label>
      </div>
      <div className="w-full px-2">
        <Label className="mt-4 ">
          <span className=" text-lg">Description</span>
          <Input className="mt-1 h-16" type="Description" value={ticketData.description} />
        </Label>
      </div>
    
      <div className="w-1/2 px-2">
          <Label className="mt-4">
            <span  className=" text-lg">Date de Création</span>
            <Input className="mt-1 "  value={ticketData.createdDate.substring(0, 10) + ' - ' + ticketData.createdDate.substring(11, 16)} />
          </Label>
        </div>
        {ticketData.status === 'Résolu' && (
             <div className="w-1/2 px-2">
             <Label className="mt-4">
               <span className=" text-lg">Date de Clôture</span>
               <Input className="mt-1 "  value={ticketData.closedDate.substring(0, 10) + ' - ' + ticketData.closedDate.substring(11, 16)} />
             </Label>
           </div>



        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
          <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className=" text-lg">Priorité</span>
          <Badge type={ticketData.priority === 'Faible' ? 'success' : (ticketData.priority === 'Normale' ? 'primary' : 'danger')} style={{ fontSize: '1rem', margin: '0 1rem' }}> {ticketData.priority}</Badge>
        </Label>
      </div>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className=" text-lg">Status</span>
          <Badge type={ticketData.status === 'Résolu' ? 'success' : 'danger'} style={{ fontSize: '1rem', margin: '0 1rem' }}>{ticketData.status}</Badge>
        </Label>
      </div>
      <br></br>
        
    </div>

    {/* Show the Closed Date input when the status is resolved */}
  </div>
  {/* Add additional ticket details here */}
</div>

  );
};

export default ViewTicket;
