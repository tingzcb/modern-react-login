import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
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



const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//password regex for strong password
//confirmPassword when then
const validationSchema = yup.object({
  fullName: yup.string().min(3, "Please enter your real name").required('Full name is required!'),
  email: yup.string().email("Please enter a valid email address").required(),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: ()=> yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});
export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  //onSubmit call back will be called every time the form click submit,
  // is the method FormitConfig<>.onSubmit
  const onSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  // the const formik is passed in the FormContainer component onSubmit handler 
  const formik = useFormik({
    initialValues: { fullName: '', email: '', password: '', confirmPassword: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,

  });

  console.log("Error:", formik.errors);


  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input name="fullName" type="text" placeholder="Full Name" value={formik.values.fullName} onChange={formik.handleChange} />
          <FieldError>{formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}</FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input name="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
          <FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
          <FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input name="confirmPassword" type="password" placeholder="Confirm Password"
            value={formik.values.confirmPassword} onChange={formik.handleChange} />
          <FieldError>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</FieldError>
        </FieldContainer>
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
