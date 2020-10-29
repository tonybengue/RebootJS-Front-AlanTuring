import React, { Component } from 'react';
import { Container, Box, Button, Grid } from '@material-ui/core';
import { register } from '../../api/users';
import { Alert } from '../../Layout/components/Alert';
import { IFormField, IPasswordField, RegisterFormKey } from '../types';
import { defaultPasswordFormField, defaultStringFormField } from '../utils/defaultFormField';
import { validateConfirmationField } from '../utils/validateConfirmationField';
import { validateEmailField } from '../utils/validateEmailField';
import { validateNameField } from '../utils/validateNameField';
import { validatePasswordField } from '../utils/validatePasswordField';

import CredentialSection from './CredentialSection';
import IdentitySection from './IdentitySection';

interface IRegisterFormState{
  // email: string;
  // firstName: string;
  // lastName: string;
  // password: string;
  // confirmation: string;
  status: 'ready' | 'error' | 'success';
  email: IFormField<string>;
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  password: IPasswordField;
  confirmation: IFormField<string>;
}

class RegisterForm extends Component<{}, IRegisterFormState> {
  constructor(props: {}){
    super(props);
    this.state = {
      // email: "",
      // firstName: "",
      // lastName: "",
      // password: "",
      // confirmation: ""
      status: 'ready',
      email: defaultStringFormField(),
      firstName: defaultStringFormField(),
      lastName: defaultStringFormField(),
      password: defaultPasswordFormField(),
      confirmation: defaultStringFormField()
    }
  }

  handleChange = (field: RegisterFormKey, newValue: string) => {
    const newState = {
      ...this.state,
      [field]: {
        ...this.state[field],
        value: newValue,
      }
    };
    if (field === 'email') {
      const { email } = newState;
      validateEmailField(email);
    } else if (['firstName', 'lastName'].includes(field)) {
      const formField = newState[field];
      validateNameField(formField);
    } else if (field === 'password') {
      const { password } = newState;
      validatePasswordField(password);
    }

    if (['password', 'confirmation'].includes(field)) {
      const { password, confirmation } = newState;
      validateConfirmationField(confirmation, password);
    }

    this.setState(newState);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, firstName, lastName, password, confirmation } = this.state;

    if(email.isValid && firstName.isValid && lastName.isValid && password.isValid && confirmation.isValid) {
      register(email.value, firstName.value, lastName.value, password.value).then(
        user => {
          this.setState({
            status: 'success'
          })
        });
    }
  }

  render(){
    const { status, email, firstName, lastName, password, confirmation } = this.state;
    return (
      <Container maxWidth="sm">
        <Box style={{ margin: '2rem 0' }}>
          <Alert
            status={status}
            error="Something happened !"
            success={`You're registered ${firstName.value}! Please login`}
          />
        </Box>
        <form onSubmit={this.handleSubmit}>
          <Box style={{margin: "1rem 0"}}>
            <IdentitySection
              email={email}
              firstName={firstName}
              lastName={lastName}
              handleChange={this.handleChange}
            />
          </Box>
          <Box>
            <CredentialSection
              password={password}
              confirmation={confirmation}
              handleChange={this.handleChange}
            />
          </Box>
          <Box style={{margin: "1rem 0"}}>
            <Grid container justify="flex-end">
              <Grid item xs={4}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    )
  }
}

export default RegisterForm;