import React, { useState } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

import useStyles from './styles'

const steps= ['shipping address','Payment details']

const Checkout = () => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0);


    const Confirmation =()=>(
        <div> confirm </div>
    )

    const Form =()=> activeStep === 0 ? <AddressForm /> 
    : <PaymentForm/>
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

                {activeStep === steps.length ? <Confirmation /> : <Form /> }
            </Paper>
        </main>
            
        </>
    )
}

export default Checkout;
