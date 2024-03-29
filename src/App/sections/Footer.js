import React from 'react';
import { MDBFooter, MDBIcon, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import './css/Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <MDBFooter className='text-center fixed-bottom' color='white' style={{ backgroundColor: "rgb(0,51,97)", height: "118px"}}>
      <MDBRow className='row'>
        <MDBCol className='col'>
          <h6 className='text-uppercase'>Contact me</h6>
          <MDBBtn outline color='orange' floating className='m-1' href='https://www.facebook.com/jonas.tscholl/' role='button'>
            <MDBIcon fab icon='facebook' />
          </MDBBtn>
          <MDBBtn outline color='orange' floating className='m-1' href='mailto:jonas.tscholl@student.uibk.ac.at' role='button'>
            <MDBIcon fas icon='at' />
          </MDBBtn>
        </MDBCol>
        <MDBCol className='col'>
          <img src='pictures/uni_logo.jpg' alt='uibk_logo' style={{ width: '150px', margin: '1em auto' }} />
        </MDBCol>
        <MDBCol className='col'>
          <h6 className='text-uppercase'>Source Code</h6>
          <MDBBtn
            outline
            color='orange'
            floating
            className='m-1'
            href='https://github.com/OffByOne37/webpage_bachelor'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <div className='text-center link'>
        <h6 style={{ marginBottom: 0 }}>
          This Webpage was created as part of my Bachelor Thesis. For Further Information please contact me or go to the{' '}
          <a className='App-link' href='https://github.com/OffByOne37/webpage_bachelor'>
            GitHub
          </a>
          -page.
        </h6>
      </div>
    </MDBFooter>
  );
};

export default Footer;
