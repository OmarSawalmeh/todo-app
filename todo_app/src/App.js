import React from 'react'
import './App.css'

import Settings from './components/context/settings';
import ToDo from './components/todo/todo'
import Navbar  from './components/navbar/navbar';

import Auth from './components/auth/auth';
import Login from './components/auth/login';
import LoginProvider from './components/auth/context'

function App() {
  return (
    <>
      <h1 className='website'>To Do List Manager</h1>
      <Navbar />

      <LoginProvider>
        <Login />

        <Auth>
          <div>Any valid user can see this</div>
          <Settings>
            <ToDo />
          </Settings>
        </Auth>
        
        <Auth capability='create'>
          <div>Users with create access can see this</div>
          <Settings>
            <ToDo />
          </Settings>
        </Auth>

        <Auth capability='update'>
          <div>Users with update access can see this</div>
          <Settings>
            <ToDo />
          </Settings>
        </Auth>

        <Auth capability='delete'>
          <div>Users with delete access can see this</div>
          <Settings>
            <ToDo />
          </Settings>
        </Auth>
      </LoginProvider>
    </>
  )
}

export default App;


