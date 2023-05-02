

import PageTitle from '../components/Typography/PageTitle'
import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Button } from '@windmill/react-ui'
function Blank() {
  const [selectedFile, setSelectedFile] = useState();

  const onFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
      const response = await axios.post('https://localhost:7075/api/FileAPI', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div>
      <input type="file" onChange={onFileSelect} />
      <Button onClick={onFileUpload}>Upload</Button>
      
    </div>
    
  );
}

export default Blank
