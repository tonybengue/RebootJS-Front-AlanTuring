import React, { Component } from 'react';
import { FormControl, FormGroup, FormLabel, TextField } from '@material-ui/core';
import { IFormField, RegisterFormKey } from '../types';

interface IdentitySectionProps {
  // email: string;
  // firstname: string;
  // lastname: string;
  email: IFormField<string>;
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  // handleChange: (field: string, value: string) => void;
  handleChange: (field: RegisterFormKey, value: string) => void;
}

class IdentitySection extends Component<IdentitySectionProps> {
  render(){
    // const isValid = true

    // Helper valid
    // const errorDisplay = {
    //   error: true,
    //   helperText: "error"
    // }
    // const toto = {
    //   label: "Email",
    //   value: this.props.email,
    //   onChange: (e: any) => this.props.handleChange("email", e.target.value)
    // }

    // Puis, a mettre dans le composant : pour le helper
    // {...(!isValid ? errorDisplay : {})}
    const { email, firstName, lastName } = this.props;
    return (
      <FormControl component="fieldset" fullWidth={true}>
        <FormLabel component="legend" style={{ margin: '1rem 0' }}>
          Your identity:
        </FormLabel>
        <FormGroup>
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth={true}
            value={email.value}
            onChange={(e) => this.props.handleChange("email", e.target.value)}
            {...(!email.isValid ? {error: true, helperText: email.error} : {})}
          />

          <TextField
            required
            label="Firstname"
            variant="outlined"
            fullWidth={true}
            value={firstName.value}
            onChange={(e) => this.props.handleChange("firstName", e.target.value)}
            {...(!firstName.isValid ? {error: true, helperText: firstName.error} : {})}
          />
          
          <TextField
            required
            label="Lastname"
            variant="outlined"
            fullWidth={true}
            value={lastName.value}
            onChange={(e) => this.props.handleChange("lastName", e.target.value)}
            {...(!lastName.isValid ? {error: true, helperText: lastName.error} : {})}
          />
        </FormGroup>
      </FormControl>
    )
  }
}

export default IdentitySection;