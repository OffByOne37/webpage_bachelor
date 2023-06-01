import React from 'react';
import {
    MDBFooter,
    MDBIcon,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='text-center fixed-bottom' color='white' style={{ backgroundColor: "rgb(0,51,97)", height: "118px"}}>

            <MDBRow style={{ display: "flex", justifyContent: "space-between" }}>
                <MDBCol>
                    <h6 className='text-uppercase'>Contact me</h6>
                    <MDBBtn outline color="orange" floating className='m-1' href='#!' role='button' style={{ padding: "10px" }}>
                        <MDBIcon fab icon='facebook' />
                    </MDBBtn>

                    <MDBBtn outline color="orange" floating className='m-1' href='#!' role='button' style={{ padding: "10px" }}>
                        <MDBIcon fas icon='at' />
                    </MDBBtn>
                </MDBCol>

                <MDBCol>
                    <img src='pictures/uni_logo.jpg' alt='uibk_logo' style={{ width: '150px', margin: "1em auto" }} />
                </MDBCol>

                <MDBCol>
                    <h6 className='text-uppercase'>Source Code</h6>
                    <MDBBtn outline color="orange" floating className='m-1' href='#!' role='button' style={{ padding: "10px" }}>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </MDBCol>
            </MDBRow>


            <div className='text-center p-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} >
                <h6 style={{ marginBottom: 0 }}>
                    This Webpage was created as part of my Bachelor Thesis. For Further Information please contact me or go to the <a className="App-link" href='#!'>GitHub</a>-page.
                </h6>
            </div>
        </MDBFooter>
    );
}

export default Footer;