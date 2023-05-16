import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../components/Typography/PageTitle'
import { useParams } from 'react-router-dom';
import Care from '../assets/img/conncare.png';
import './override.css';
const ShowFile = () => {
    const [Seg200, setSeg200] = useState([]);
    const [Seg300, setSeg300] = useState([]);
    const { id }=useParams();
    const [showMore200, setShowMore200] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [Seg10, setSeg10] = useState([]);
    const [showMore10, setShowMore10] = useState(false);
    //get seg200
    useEffect(() => {
        axios.get(`https://localhost:7075/api/customer/Getseg200?Fileid=${id}`)
          .then(response => {
            const data = response.data;
            console.log(data);
            setSeg200(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, [id]);

      const descriptionKeys = Object.keys(Seg200);
  

      const toggleShowMore200 = () => {
        setShowMore200(!showMore200);
      };
      const toggleShowMore = () => {
        setShowMore(!showMore);
      };
      const toggleShowMore10 = () => {
        setShowMore10(!showMore10);
      };
    //get seg300
    useEffect(() => {
      axios.get(`https://localhost:7075/api/customer/Getseg300?Fileid=${id}`)
        .then(response => {
          const data = response.data;
          console.log(data);
          setSeg300(data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [id]);

    const descriptionKeys300 = Object.keys(Seg300);

    //get rec10 
  useEffect(() => {
    axios.get(`https://localhost:7075/api/customer/GetRec10?Fileid=${id}`)
      .then(response => {
        const data = response.data;
        console.log(data);
        setSeg10(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const descriptionKeys10 = Object.keys(Seg10);

   



  return (
    
    <div className="show-file-table">
      <img
          
              src={Care}
              
            />
    
     <h1  class="custom-heading"> Header</h1>
    
     <h2 class="record-heading" > Segment 200 </h2>
     <table className="show-file-table" >
        <thead>
          <tr className="mt-6">
            {descriptionKeys.slice(0, 6).map((key) => (
              <th className="relative px-6 py-3"  key={key}>{Seg200[key].description}</th>
            ))}
            <th>
              <button  onClick={toggleShowMore200}>{showMore200 ? "Hide" : "Show"} More</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {descriptionKeys.slice(0, 6).map((key) => (
              <td style={{ textAlign:'center' }} key={key}>{Seg200[key].content}</td>
            ))}
            <td>
              {showMore200 && (
                <table>
                  <tbody>
                    {descriptionKeys.slice(6).map((key) => (
                      <tr key={key}>
                        <td style={{ fontSize: '14px', color: '#6ebeb0' }}>{Seg200[key].description}</td>
                        <td style={{ textAlign: 'center' }}>{Seg200[key].content}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
          
        </tfoot>
                </table>
              )}
            </td>
          </tr>
        </tbody>
      </table>


      <h2 class="record-heading" > Segment 300 </h2>
     
     <table className="show-file-table" >
        <thead>
          <tr className="mt-6">
            {descriptionKeys300.slice(0, 7).map((key) => (
              <th className="relative px-6 py-3"  key={key}>{Seg300[key].description}</th>
            ))}
            <th>
              <button  onClick={toggleShowMore}>{showMore ? "Hide" : "Show"} More</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {descriptionKeys300.slice(0, 7).map((key) => (
              <td className="align-top" style={{ textAlign:'center' }} key={key}>{Seg300[key].content}</td>
            ))}
            <td>
              {showMore && (
                <table>
                  <tbody>
                    {descriptionKeys300.slice(7).map((key) => (
                      <tr key={key}>
                        <td style={{ fontSize: '14px', color: '#6ebeb0' }}>{Seg300[key].description}</td>
                        <td style={{ textAlign: 'center' }}>{Seg300[key].content}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
          
        </tfoot>
                </table>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <h1  class="custom-heading" > Details de facture </h1>
      <h2 class="record-heading" > Enregistrement 10 </h2>

      <table className="show-file-table" >
        <thead>
          <tr className="mt-6">
            {descriptionKeys10.slice(0, 7).map((key) => (
              <th className="relative px-6 py-3"  key={key}>{Seg10[key].description}</th>
            ))}
            <th>
              <button  onClick={toggleShowMore10}>{showMore ? "Hide" : "Show"} More</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {descriptionKeys10.slice(0, 7).map((key) => (
              <td className="align-top" style={{ textAlign:'center' }} key={key}>{Seg10[key].content}</td>
            ))}
            <td>
              {showMore10 && (
                <table>
                  <tbody>
                    {descriptionKeys10.slice(7).map((key) => (
                      <tr key={key}>
                        <td style={{ fontSize: '14px', color: '#6ebeb0' }}>{Seg10[key].description}</td>
                        <td style={{ textAlign: 'center' }}>{Seg10[key].content}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
          
        </tfoot>
                </table>
              )}
            </td>
          </tr>
        </tbody>
      </table>



      


      
    
    
    
    </div>
  );
};

export default ShowFile;