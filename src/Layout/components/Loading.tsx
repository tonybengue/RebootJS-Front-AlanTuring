import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';

export function Loading() {
  return (
    <Grid style={{ height: '50vh' }} container direction="column" justify="center" alignItems="center">
      <Grid item>
        <CircularProgress />
      </Grid>
      <Grid item>Loading...</Grid>
    </Grid>
  );
}
