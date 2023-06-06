import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../components/Typography/PageTitle'
import { useParams } from 'react-router-dom';
import Care from '../assets/img/conncare.png';
import './override.css';
const ShowFile = () => {
    const [Seg200, setSeg200] = useState([]);
    const [Seg300, setSeg300] = useState([]);
    const [rec92,setRec92]=useState([]);
    const [rec91,setRec91]=useState([]);
    const { id }=useParams();
    const [showMore200, setShowMore200] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showMore91, setShowMore91] = useState(false);
    const [showMore92, setShowMore92] = useState(false);
    const [Seg10, setSeg10] = useState([]);
    const [Seg90, setSeg90] = useState([]);
    const [showMore10, setShowMore10] = useState(false);
    const [showMore90, setShowMore90] = useState(false);
    const [Attestation, setAttestation] = useState([]);
    const [recordData, setRecordData] = useState([]);
    const [showMoreRecord, setShowMoreRecord] = useState(false);
    const toggleShowMoreRecord = () => setShowMoreRecord(!showMoreRecord);
    const [recordErrors, setRecordErrors] = useState({});
    const [token, setToken] = useState('');
    const [errors, setErrors] = useState([])
    const [zoneDescriptions, setZoneDescriptions] = useState(new Map());
    const [zoneDescriptionsMap, setZoneDescriptionsMap] = useState(new Map());

    useEffect(() => {
    
      // Retrieve token from localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(token);
      }
      
    }, []);
    //get seg200
    useEffect(() => {
        axios.get(`http://localhost:5248/api/customer/Getseg200?Fileid=${id}`)
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
      const toggleShowMore90 = () => {
        setShowMore90(!showMore90);
      };
      const toggleShowMore91 = () => {
        setShowMore91(!showMore91);
      };
      const toggleShowMore92 = () => {
        setShowMore92(!showMore92);
      };
    //get seg300
    useEffect(() => {
      axios.get(`http://localhost:5248/api/customer/Getseg300?Fileid=${id}`)
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
    axios.get(`http://localhost:5248/api/customer/GetRec10?Fileid=${id}`)
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
//get rec90
useEffect(() => {
  axios.get(`http://localhost:5248/api/customer/GetRec90?Fileid=${id}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      setSeg90(data);
    })
    .catch(error => {
      console.log(error);
    });
}, [id]);

const descriptionKeys90 = Object.keys(Seg90);
//get rec91
useEffect(() => {
  axios.get(`http://localhost:5248/api/customer/GetRec91?Fileid=${id}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      setRec91(data);
    })
    .catch(error => {
      console.log(error);
    });
}, [id]);
//get rec92
useEffect(() => {
  axios.get(`http://localhost:5248/api/customer/GetRec92?Fileid=${id}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      setRec92(data);
    })
    .catch(error => {
      console.log(error);
    });
}, [id]);


const descriptionKeys91 = Object.keys(rec91);
const descriptionKeys92 = Object.keys(rec92);
//get attestation 
   const getAttestations = () => {
    
    const url = `http://localhost:5248/api/FileAPI/api/customer/GetFileAttestations?Fileid=${id}`;
    const token = localStorage.getItem('token');
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    })
      .then(response => {
        const data = response.data;
        setAttestation(data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getAttestations();
  }, [id]);

 // ...
// Your existing code

const getRecordData = async (recordId) => {
  try {
    const token = localStorage.getItem('token');
    const url = `http://localhost:5248/api/FileAPI/api/customer/GetRecordDataID?recid=${recordId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getRecordErrorsByID = async (recordId) => {
  try {
    const url = `http://localhost:5248/api/customer/GetRecordErrrorsByID?recid=${recordId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/*useEffect(() => {
  const fetchData = async () => {
    const updatedRecordData = [];

    for (const item of Attestation) {
      for (const record of item.attestationRecords) {
        const data = await getRecordData(record.id);
        if (data) {
          updatedRecordData.push(data);
        }
      }
    }

    setRecordData(updatedRecordData);
  };

  fetchData();
}, [Attestation]);///*/


useEffect(() => {
  const fetchData = async () => {
    const updatedRecordData = [];
    const updatedRecordErrors = [];

    for (const item of Attestation) {
      for (const record of item.attestationRecords) {
        const data = await getRecordData(record.id);
        if (data) {
          updatedRecordData.push(data);
        }

        const errors = await getRecordErrorsByID(record.id);
        updatedRecordErrors.push({
          recordId: record.id,
          errors: errors.length > 0 ? errors : null,
        });
      }
    }

    setRecordData(updatedRecordData);
    setRecordErrors(updatedRecordErrors);
    fetchZoneDescriptions(Attestation);
  };

  fetchData();
}, [Attestation]);


const fetchZoneDescription = async (code) => {
  try {
    const url = `http://localhost:5004/api/ZoneDesc?code=${code}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};



const fetchZoneDescriptions = async (data) => {
  const updatedZoneDescriptions = new Map();

  for (const item of data) {
    for (const record of item.attestationRecords) {
      const errors = await getRecordErrorsByID(record.id);
      if (errors) {
        for (const error of errors) {
          const codeErreur = error.codeErreur; // Remove leading zeros if they exist
          
          
          const middleNumbers = codeErreur.slice(2, 4).replace(/^0+/, '');; // Extract middleNumbers and remove leading zeros if they exist
                      // Extract middleNumbers and remove leading zeros if they exist

          if (!updatedZoneDescriptions.has(middleNumbers)) {
            const description = await fetchZoneDescription(middleNumbers);
            if (description) {
              updatedZoneDescriptions.set(middleNumbers, description);
            }
          }
        }
      }
    }
  }

  setZoneDescriptions(updatedZoneDescriptions);
};


//render attests
const renderAttestations = (data) => {
  
  const zoneDescriptionsMap = new Map([...zoneDescriptions]);
  
 

  return (
    <>
        
    {data.map((item) => (
      <div  className="show-file-table" key={item.id}>
        <br></br>
        <h1 style={{ fontSize: '25px'}} style={{fontSize: '22px',color:'black', position: 'relative', display: 'inline-block', padding: '0.5em', marginLeft: '0.5em' }}className="Attestation-cell">
        <span style={{ position: 'absolute', top: 0, left: '-0.5em', width: '0.3em', height: '100%', backgroundColor: 'black' }}></span>
        Attestation</h1>
        <br></br>
        {item.attestationRecords.map( (record) => {
          const recordDataItem = recordData.find(
            (dataItem) => dataItem.id === record.id
          );

          const recordZones =
            recordDataItem &&
            recordDataItem.recordZones &&
            recordDataItem.recordZones.length > 0
              ? recordDataItem.recordZones
              : [];

          const visibleZones = recordZones.slice(1);
          const recordErrorsItem = recordErrors.find(
            (errorItem) => errorItem.recordId === record.id
          );
          const errors = recordErrorsItem ? recordErrorsItem.errors : null;
         

          

          return (
            <>
              {recordZones.length > 0 && (
                <>
                <div>
                {recordZones[0].content === "50" && <h4 style={{ fontSize: '29px',color:'#008b8b'}} style={{fontSize: '19px',color:'#008b8b', position: 'relative', display: 'inline-block', padding: '0.5em', marginLeft: '0.5em' }}  >
                <span style={{ position: 'absolute', top: 0, left: '-0.5em', width: '0.3em', height: '100%', backgroundColor: '#008b8b' }}></span>
                  Prestation</h4>}
                <h2 class="record-heading" show-file-table > Enregistrement {recordZones[0].content}</h2>
                </div>
                </>
              )}

              <table key={record.id}>
                <thead>
                  <tr>
                    {visibleZones.map((zone) => (
                      <th  key={zone.id} className="description-cell" >{zone.description}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {visibleZones.map((zone) => (
                      <td key={zone.id} style={{ textAlign: 'center' }} >{zone.content}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <br></br>
              {errors  && (
                  <div>
                    {errors.map((error) => {
                      // Get the middle numbers of the error code
                      const codeErreur = error.codeErreur; // Remove leading zeros if they exist
                      const middleNumbers = codeErreur.slice(2, 4).replace(/^0+/, ''); // Extract middleNumbers and remove leading zeros if they exist
                      const description = zoneDescriptionsMap.get(middleNumbers);
                      

                   return(
                    <div key={error.id}>
                      <h3 style={{ position: 'relative', display: 'inline-block', padding: '0.5em', marginLeft: '0.5em',color:'white',backgroundColor:'#F7A19A' }} key={error.id}>
                        
                        <span style={{ position: 'absolute', top: 0, left: '-0.5em', width: '0.3em', height: '100%', backgroundColor: '#DF4337' }}></span>
                        {error.codeErreur} :
                        {error.libelle}

                        
                        
                      </h3>
                       {description  && (
                        <div style={{ fontSize: '18px', color: 'red' }} >
                          Zone erronée: {description}
                        </div>
                      )}
                      </div>
                      
                      
                      
                    )})}
                    <br></br>
                    <br></br>
                  </div>
                  
                )}
              
            </>
          );
        })}
      </div>
      
    ))}
  </>
  );
};



// ...
// Your remaining code



  return (
    
    <div className="show-file-table">
      <img
          
              src={Care}
              
            />
    <br></br>
     <h1 style={{ fontSize: '25px',color:'#08BBAA'}} className="custom-heading"> Header</h1>
    <br></br>
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
      <br></br>


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
      <br></br>
      <h1 style={{ fontSize: '25px',color:'#08BBAA'}} class="custom-heading" > Details de facture </h1>
      <br></br>
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
      <td></td>
      {renderAttestations(Attestation)}
      <h2 class="record-heading" > Enregistrement 90 </h2>

      <table className="show-file-table" >
        <thead>
          <tr className="mt-6">
            {descriptionKeys90.slice(0, 7).map((key) => (
              <th className="relative px-6 py-3"  key={key}>{Seg90[key].description}</th>
            ))}
            <th>
              <button  onClick={toggleShowMore90}>{showMore90 ? "Hide" : "Show"} More</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {descriptionKeys90.slice(0, 7).map((key) => (
              <td className="align-top" style={{ textAlign:'center' }} key={key}>{Seg90[key].content}</td>
            ))}
            <td>
              {showMore90 && (
                <table>
                  <tbody>
                    {descriptionKeys90.slice(7).map((key) => (
                      <tr key={key}>
                        <td style={{ fontSize: '14px', color: '#6ebeb0' }}>{Seg90[key].description}</td>
                        <td style={{ textAlign: 'center' }}>{Seg90[key].content}</td>
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
      <br></br>
      <h1 style={{ fontSize: '25px',color:'#08BBAA'}} class="custom-heading" > Footer </h1>
      <br></br>
      <h2 class="record-heading" > Enregistrement 91</h2>
      <table className="show-file-table" >
        <thead>
          <tr className="mt-6">
            {descriptionKeys91.slice(0, 7).map((key) => (
              <th className="relative px-6 py-3"  key={key}>{rec91[key].description}</th>
            ))}
            <th>
              <button  onClick={toggleShowMore91}>{showMore91 ? "Hide" : "Show"} More</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {descriptionKeys91.slice(0, 7).map((key) => (
              <td className="align-top" style={{ textAlign:'center' }} key={key}>{rec91[key].content}</td>
            ))}
            <td>
              {showMore91 && (
                <table>
                  <tbody>
                    {descriptionKeys91.slice(7).map((key) => (
                      <tr key={key}>
                        <td style={{ fontSize: '14px', color: '#6ebeb0' }}>{rec91[key].description}</td>
                        <td style={{ textAlign: 'center' }}>{rec91[key].content}</td>
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
      <br></br>
      <h2 class="record-heading" > Enregistrement 92</h2>
      <table className="show-file-table" >
        <thead>
          <tr className="mt-6">
            {descriptionKeys92.slice(0, 7).map((key) => (
              <th className="relative px-6 py-3"  key={key}>{rec92[key].description}</th>
            ))}
            <th>
              <button  onClick={toggleShowMore92}>{showMore92 ? "Hide" : "Show"} More</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {descriptionKeys92.slice(0, 7).map((key) => (
              <td className="align-top" style={{ textAlign:'center' }} key={key}>{rec92[key].content}</td>
            ))}
            <td>
              {showMore92 && (
                <table>
                  <tbody>
                    {descriptionKeys92.slice(7).map((key) => (
                      <tr key={key}>
                        <td style={{ fontSize: '14px', color: '#6ebeb0' }}>{rec92[key].description}</td>
                        <td style={{ textAlign: 'center' }}>{rec92[key].content}</td>
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