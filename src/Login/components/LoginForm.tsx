import React, { Component } from 'react';
import { Box, Button, Container, Grid, TextField } from '@material-ui/core'; 
import { login } from '../../api/users';
import history from '../../history';
import { connect } from 'react-redux';
import { makeInitApp } from '../../Layout/actions/makeInitApp';
import { Alert } from '../../Layout/components/Alert';

interface ILoginFormState{
  // label: string;
  // helper: string;
  status: 'ready' | 'error' | 'success';
  email: string;
  password: string;
}

interface ILoginFormProps {
  initApp: () => void;
}

// class LoginForm extends Component<{}, ILoginFormState> {
  // constructor(props: {}) {
class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
  constructor(props: ILoginFormProps){
    super(props)
    this.state = {
      email: "", 
      password: "",
      status: 'ready'
    }
    // this.state = {
    //   label: '',
    //   helper: ''
    // }
  }

  // updateLabel() {
  //   this.setState({ 
  //     label: 'label',
  //   });
  // }

  // updateHelper(helper: string) {
  //   this.setState({ 
  //     helper: helper
  //   });
  // }

  handleChange = (field: "email" | "password", newValue: string) => {
    this.setState({
      ...this.state,
      [field]: newValue
    })
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // login(this.state.email, this.state.password).then((user) => alert(user.firstName));
    this.setState({
      // status: 'success'
    })

        // Redirect to the profile page
    await login(this.state.email, this.state.password)
      .then(_user => history.push('/profile'));

      // Launch the timer
      this.props.initApp();
  }

  render(){
    // return (
    //   <Fragment>
    //     <h1>Connexion</h1>
    //     {/* helper={this.updateHelper} */}
    //     <FormInput label={this.updateLabel()}/>
    //   </Fragment>
    // )
    return (
      <Container maxWidth="xs">
      <form onSubmit={this.handleSubmit}>
        <Box style={{margin: "2rem 0"}}>
          <Alert
            status={this.state.status}
            error="Enter your credentials again !"
            success="OK !"
          />
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth={true}
            style={{marginBottom: "1rem"}}
            value={this.state.email}
            onChange={(e) => this.handleChange("email", e.target.value)}
            />
          <TextField
            required
            type="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            style={{marginBottom: "1rem"}}
            value={this.state.password}
            onChange={(e) => this.handleChange("password", e.target.value)}
            />
          </Box>
          <Box style={{margin: "2rem 0"}}>
            <Grid container justify="flex-end">
              <Grid item xs={4}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  initApp: () => dispatch(makeInitApp())
})
export default connect(undefined, mapDispatchToProps)(LoginForm); 
// export default LoginForm;