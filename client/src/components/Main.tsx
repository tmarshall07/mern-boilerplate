import React from 'react';

import { Box, Flex } from 'rebass/styled-components';

import Button from './Button';
import { logOut } from '../state/user/actions';

export default function Main() {
  const handleLogout = async () => {
    await logOut();
  };

  return (
    <Box>
      <Flex p="10px" justifyContent="space-between">
        <Box></Box>
        <Button bg="grey" onClick={handleLogout}>
          Log out
        </Button>
      </Flex>
      <Box p={30}>Main content</Box>
    </Box>
  );
}
