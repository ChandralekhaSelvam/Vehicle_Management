import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

type Props = { title: string };

export const Header = ({ title = 'Title' }: Props): JSX.Element => {
  return (
    <Box data-testid="header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">{title}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
