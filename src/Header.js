import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' style={{backgroundColor: '#003361', height: "56px"}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' className='mb-0 h1' style={{color: 'rgb(243,146,0)'}}>MakeCode Extension Development Tool</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
          style={{color:'rgb(243,146,0)'}}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='justify-content-end mb-lg-0'>
            <MDBNavbarItem>
              <Link active to='/' className='nav-link'>
                Home
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link active to='/single' className='nav-link'>
                Create Function
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link active to="/multiple" className='nav-link'>
                Create File
              </Link>
            </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;