import React, { useState,useEffect } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

import useStyles from './styles'
import { commerce } from '../../../lib/commerce';

const steps= ['shipping address','Payment details']

const Checkout = ({cart, order, handleCaptureCheckout, error}) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData,setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token)

            }
            catch(error){

            }
        }
        generateToken()
        alert(error)
     
    }, [cart])

    const nextStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep + 1)
    const backStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep - 1)


const next = (data)=>{
    setShippingData(data)
    nextStep()

}

    const Confirmation =()=>(
        <div> confirm </div>
    )

    const Form =()=> activeStep === 0 ? <AddressForm  checkoutToken={checkoutToken} next={next}/> 
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} nextStep={nextStep} />
    return (
        <>
        <div className={classes.toolbar}/>
        <main className={classes.layout} >
            <Paper className={classes.paper} >
                <Typography variant='h4' align="center" > Check Out</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper} >
                    {steps.map((step) =>(
                        <Step key={step}>
                            <StepLabel> {step}</StepLabel>
                        </Step>
                    ))}

                </Stepper>

                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
            </Paper>
        </main>
            
        </>
    )
}

export default Checkout;
