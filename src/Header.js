import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light style={{backgroundColor: '#003361'}}>
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
              <MDBNavbarLink active aria-current='page' href='#' style={{color:'white', border:'1px solid', borderColor:'rgba(255,255,255,0.3)'}}>
                Create Function
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#' style={{color:'white', border:'1px solid', borderColor:'rgba(255,255,255,0.3)', marginLeft: "3px"}}>
                Create File
              </MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;