import React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '30vh' }}
  >
    <Grid item xs={3}>
      <CircularProgress size="10vh" thickness={2.5} />
    </Grid>
  </Grid>
);

export default LoadingIndicator;
