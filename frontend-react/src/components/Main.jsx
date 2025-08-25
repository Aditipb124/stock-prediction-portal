import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
  return (
    <>
    {/* <Header/> */}
        <div className='container'>
            <div className='p-5 text-center bg-light-dark rounded'>
                <h1 className='text-light'>Stock Prediction Portal</h1>
                <p className='text-light lead'>Welcome to Stock Prediction Portal — your intelligent gateway to smarter investing. Our platform leverages cutting-edge machine learning models to forecast stock trends, helping you make data-driven decisions with confidence. Whether you're a seasoned investor or just starting out, explore insights, track performance, and stay ahead of the market with precision.</p>
                <Button class="btn-outline-info" text="Login" url="/login"/>
                {/* <a className='btn btn-info' href="">Login</a> */}
            </div>

        </div>
    {/* <Footer/> */}
    </>
  )
}

export default Main