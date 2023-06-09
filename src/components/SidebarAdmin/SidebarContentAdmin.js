import React from 'react'
import { useContext, useState,useEffect } from 'react'
import routes from '../../routes/sidebarAdmin'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from '../Sidebar/SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import Modals from '../../pages/Modals'
import Blank from '../../pages/Blank'
import Care from '../../assets/img/imgCor.png';
import {Link } from "react-router-dom";
import '../../pages/override.css';
function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContentAdmin() {

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        eFactAdmin
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
      <Link to="/addUser"> <Button className="bg-red-500"  >
         Ajouter un utilisateur
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
        </Link>
      </div>
      
    </div>
    
  )
}

export default SidebarContentAdmin
