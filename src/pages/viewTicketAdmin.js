import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/Typography/SectionTitle';
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
  import SidebarContentAdmin from '../components/SidebarAdmin/SidebarContentAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import './override.css';
const ViewTicketAdmin = () => {
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
    
    
    <div
    className={`flex h-screen bg-gray-50 dark:bg-white-900 `}
  >
    <div> <SidebarContentAdmin className={'background-sidebar'} /></div>
    <div className="flex flex-col flex-1 w-full"> 
          <HeaderAdmin/>
        <br></br>
       
  
  <div className="w-96 mx-auto p-8 bg-gray-100 border rounded-lg">
    {/* Populate the input fields with selected ticket data */}
    <div className="flex flex-wrap -mx-2"> 
    <div class="white-box">
   <span style={{ fontSize: 'large'}}>#{ticketData.id}</span>
</div>
      <div className="w-full px-2">
        <Label className="mt-4">
          <span className="text-lg font-bold mt-4">Sujet</span>
          <Input className="mt-1" type="title" value={ticketData.title} />
        </Label>
      </div>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className="text-lg font-bold mt-4">Email</span>
          <Input className="mt-1" type="email" value={ticketData.email} />
        </Label>
      </div>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className="text-lg font-bold mt-4">Numéro Telephone</span>
          <Input className="mt-1" type="TelNumber" value={ticketData.telNumber} />
        </Label>
      </div>
      <div className="w-full px-2">
        <Label className="mt-4 ">
          <span className="text-lg font-bold mt-4">Description</span>
          <Input className="mt-1 h-16" type="Description" value={ticketData.description} />
        </Label>
      </div>
      <br></br>
      <br></br>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className="text-lg font-bold mt-4">Priorité</span>
          <Badge type={ticketData.priority === 'Faible' ? 'success' : (ticketData.priority === 'Normale' ? 'primary' : 'danger')} style={{ fontSize: '1rem', margin: '0 1rem' }}> {ticketData.priority}</Badge>
        </Label>
      </div>
      <div className="w-1/2 px-2">
        <Label className="mt-4">
          <span className="text-lg font-bold mt-4">Status</span>
          <Badge type={ticketData.status === 'Résolu' ? 'success' : 'danger'} style={{ fontSize: '1rem', margin: '0 1rem' }}>{ticketData.status}</Badge>
        </Label>
      </div>
      <br></br>
        <br></br>
        
      <div className="w-1/2 px-2">
          <Label className="mt-4">
            <span  className="text-lg font-bold mt-4">Date de Création</span>
            <Input className="mt-1 "  value={ticketData.createdDate.substring(0, 10) + ' - ' + ticketData.createdDate.substring(11, 16)} />
          </Label>
        </div>
        {ticketData.status === 'Résolu' && (
             <div className="w-1/2 px-2">
             <Label className="mt-4">
               <span className="text-lg font-bold mt-4">Date de Clôture</span>
               <Input className="mt-1 "  value={ticketData.closedDate.substring(0, 10) + ' - ' + ticketData.closedDate.substring(11, 16)} />
             </Label>
           </div>



        )}
         
        
          
      <br></br>
      <div>
              <h3 className="text-lg font-bold mt-4">Liste des erreurs</h3>
              {ticketData.zoneErrors.length > 0 ? (
                ticketData.zoneErrors.map((error) => (
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
            </div>
        
    </div>

    {/* Show the Closed Date input when the status is resolved */}
  </div>
  <br></br>
  {/* Add additional ticket details here */}
  </div>
</div>

  );
};

export default ViewTicketAdmin;