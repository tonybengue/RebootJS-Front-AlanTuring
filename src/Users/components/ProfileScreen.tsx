import React, { Component } from 'react';
import { Container, Box, Button, Grid } from '@material-ui/core';
import { getConnectedUser } from '../../api/users';
import { IFormField, IPasswordField, RegisterFormKey } from '../../Login/types';

import CredentialSection from '../../Login/components/CredentialSection';
import IdentitySection from '../../Login/components/IdentitySection';
import { Loading } from '../../Layout/components/Loading';
import { ErrorScreen } from '../../Layout/components/ErrorScreen';

import { defaultStringFormField, defaultPasswordFormField } from '../../Login/utils/defaultFormField';
import { validateConfirmationField } from '../../Login/utils/validateConfirmationField';
import { validateEmailField } from '../../Login/utils/validateEmailField';
import { validateNameField } from '../../Login/utils/validateNameField';
import { validatePasswordField } from '../../Login/utils/validatePasswordField';
// import Alert from '@material-ui/lab/Alert';

interface RegisterFormState {
  status: 'error' | 'success' | 'unavailable';
  email: IFormField<string>;
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  password: IPasswordField;
  confirmation: IFormField<string>;
}

class ProfileScreen extends Component<{}, RegisterFormState> {
  constructor(props: {}){
    super(props);
    this.state = {
      status: 'unavailable',
      email: defaultStringFormField(),
      firstName: defaultStringFormField(),
      lastName: defaultStringFormField(),
      password: defaultPasswordFormField(),
      confirmation: defaultStringFormField()
    }
  }

  // Datas are loaded after the component
  componentDidMount() {
    getConnectedUser()
      .then(user => {
        this.setState({
          status: 'success',
          email:{
            ...this.state.email,
            value: user.email
          },
          firstName: {
            ...this.state.firstName,
            value: user.firstName
          },
          lastName: {
            ...this.state.lastName,
            value: user.lastName
          }
        })
      })
      .catch(_err => {
        this.setState({
          status: 'error'
        })
      })
  }

  // TODO Est-ce que le password est required ?
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
    } else if (['firstname', 'lastname'].includes(field)) {
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

  // TODO Mettre à jour avec le patch
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, firstName, lastName, password, confirmation } = this.state;
    if(email.isValid && firstName.isValid && lastName.isValid && password.isValid && confirmation.isValid){
      //register(...this.state).then((user) => alert(user.firstname));
    }
  }

  render(){
    const { email, firstName, lastName, password, confirmation, status } = this.state;
    if(status === "error") {
      // return <Alert severity="error">This is an error alert — check it out!</Alert>
      return <ErrorScreen errorMessage='Sorry, you need to be connected to access this page' />
    } else if (status === "unavailable"){
      return <Loading />
    } else {
      return <Container maxWidth="sm">
        <form >
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
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    }
  }
}

export default ProfileScreen;