import React from 'react'
import App from './App.js'


import { createRoot } from 'react-dom/client'
class Main extends React.Component {
  render() {
    return <App />
  }
}

const container = document.getElementById('root')
const root = createRoot(container) 
root.render(<Main tab='home' />)