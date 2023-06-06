import React, { useState,useEffect} from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import Modals from '../../pages/Modals'
import Blank from '../../pages/Blank'
import Care from '../../assets/img/imgCor.png';
import {Link } from "react-router-dom";
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { useHistory } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import '../../pages/override.css';
function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const [token, setToken] = useState('');
  const [fileName, setFileName] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Retrieve token from localStorage
    
  }, []);
  
  useEffect(() => {
    
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(token);
    }
    
  }, []);
  const onFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(e.target.files[0]);
    setFileName(file.name)
  
  };

  const onFileUpload = async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    //const userId = user.userID;
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
      const response = await axios.post('http://localhost:5248/api/FileAPI/1', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log(response.data);
      closeModal();
    history.push('/app/dashboard');
     
    } catch (error) {
      console.error(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        eFact
      </a>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="bg-red-500"  /*className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"*/
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
       <Button className="bg-red-500" onClick={openModal} >
          Télécharger une facture
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
        
      </div>
      <>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
     <ModalHeader>Ajouter Facture</ModalHeader>
     <ModalBody>
     
      <div className="w-96 mx-auto p-8 bg-gray-100 border rounded-lg">
      <label htmlFor="upload-input" className="w-full h-32 flex flex-col justify-center items-center border-dashed border-2 border-gray-400 rounded-lg cursor-pointer">
      <input id="upload-input" type="file" onChange={onFileSelect} className="hidden" />
      <span className="text-gray-500">{fileName ? fileName : 'Drag and drop files here or click to browse'}</span>
    </label>
        
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
       <Button className="bg-red-500"   onClick={onFileUpload}>Upload</Button>
       </div>
       <div className="block w-full sm:hidden">
         <Button block size="large" layout="outline" onClick={closeModal}>
           Cancel
         </Button>
       </div>
       <div className="block w-full sm:hidden">
         <Button block size="large">
           Accept
         </Button>
       </div>
     </ModalFooter>
   </Modal>
   </>
      
    </div>
    
  )
}

export default SidebarContent
