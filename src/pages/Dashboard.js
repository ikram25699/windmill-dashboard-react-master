import React, { useState, useEffect } from 'react'


import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'

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
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import axios from 'axios'
function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = React.useState([]);
  const show=()=>{
    axios.get("https://localhost:7075/api/FileAPI")
     .then(response => {
       const data = response.data;
      console.log(data)
       setData(data)
     })}
     useEffect(() => {
      show();
      console.log(data)
    
    }, []);

  // pagination setup
 // const resultsPerPage = 10
 // const totalResults = response.length

  // pagination change control
  //function onPageChange(p) {
  //  setPage(p)
 // }

  // on page change, load new sliced data
  // here you would make another server request for new data
 // useEffect(() => {
  //  setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
 // }, [page])

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
