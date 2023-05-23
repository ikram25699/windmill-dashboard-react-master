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
import axios from 'axios'
function Dashboard() {
  
  const history = useHistory();
  const history2=useHistory();
  const [page, setPage] = useState(1)
  const [data, setData] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deletionKey, setDeletionKey] = React.useState([]);
  const renderFile = (id) => {
    history.push(`/file/${id}`);
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
    const handleViewFile = (file) => { // new function
      setSelectedFile(file);
    };

    const handleDeleteFile = (id) => {
      axios
        .delete(`https://localhost:7075/api/FileAPI/${id}`)
        .then(response => {
          if (response.status === 200) {
            history2.push('/app/dashboard')
          }
        })
        .catch(error => {
          // Handle error
          console.log(error);
        });
    };
    

    const show = () => {
      axios.get("https://localhost:7075/api/FileAPI")
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
  )
}

export default Dashboard
