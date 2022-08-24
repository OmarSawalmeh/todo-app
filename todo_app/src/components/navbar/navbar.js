import React from 'react'
import { Navbar, Alignment } from '@blueprintjs/core'

import './navbar.scss'

const homeNavbar = () => {
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
            aria-expanded='false'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a className='navbar-brand' href='#'>
            Home
          </a>
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav'>
            <li className='active'>
              <a href='#'>
                Pages <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li>
              <a href='#'>Link</a>
            </li>
            <li className='dropdown'>

              <ul className='dropdown-menu'>
                <li>
                  <a href='#'>Action</a>
                </li>
                <li>
                  <a href='#'>Another action</a>
                </li>
                <li>
                  <a href='#'>Something else here</a>
                </li>
                <li role='separator' className='divider'></li>
                <li>
                  <a href='#'>Separated link</a>
                </li>
                <li role='separator' className='divider'></li>
                <li>
                  <a href='#'>One more separated link</a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className='nav navbar-nav navbar-right'>
           
            <li className='dropdown'>
              <ul className='dropdown-menu'>
                <li>
                  <a href='#'>Action</a>
                </li>
                <li>
                  <a href='#'>Another action</a>
                </li>
                <li>
                  <a href='#'>Something else here</a>
                </li>
                <li role='separator' className='divider'></li>
                <li>
                  <a href='#'>Separated link</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default homeNavbar
