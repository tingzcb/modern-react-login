import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";
//
import * as yup from 'yup';

const vali

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  //onSubmit call back will be called every time the form click submit,
  // is the method FormitConfig<>.onSubmit
  const onSubmit = (values)=>{
    alert(JSON.stringify(values));
  };

// the const formik is passed in the FormContainer component onSubmit handler 
  const formik = useFormik({
    initialValues:{fullName: '', email:'', password:'', confirmPassword:''},
    validateOnBlur: true,
    onSubmit,

  });




  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <Input name="fullName"  type="text" placeholder="Full Name"  value={formik.values.fullName} onChange={formik.handleChange}/>
        <Input name="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange}/>
        <Input  name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
        <Input  name= "confirmPassword"  type="password" placeholder="Confirm Password" 
         value={formik.values.confirmPassword}  onChange={formik.handleChange}/>
         <Marginer direction="vertical" margin="1em" />
         <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />     
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
