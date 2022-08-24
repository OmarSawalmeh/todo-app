import React from 'react'
import './App.css'

import Settings from './components/context/settings';
import ToDo from './components/todo/todo'
import Navbar  from './components/navbar/navbar';

function App() {
  return (
    <>
      <h1 className='website'>To Do List Manager</h1>
      <Navbar />
      <Settings>
        <ToDo />
      </Settings>
    </>
  )
}

export default App;
