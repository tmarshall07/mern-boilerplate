import React, { useContext, useState } from 'react';
import { Box, Text } from 'rebass/styled-components';
import { Store } from '../state/store';
import { login } from '../state/user/actions';
import Button from './Button';
import Input from './Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { dispatch } = useContext(Store);

  const handleLogin = async () => {
    const res = await login(dispatch, email, password);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      // Reload
    }
  };

  return (
    <Box margin="auto" maxWidth="400px">
      <Box mb="20px">
        <Box mb="20px">
          <Text mb="10px">Email</Text>
          <Input value={email} placeholder="Enter email..." onChange={(e) => setEmail(e.currentTarget.value)} />
        </Box>
        <Box>
          <Text mb="10px">Password</Text>
          <Input
            value={password}
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Box>
      </Box>
      <Box>
        <Button width="100%" bg="green" onClick={handleLogin}>
          Sign in
        </Button>
      </Box>
      <Box>
        {errorMessage && (
          <Box p="10px" bg="#ff9f9f" color="darkred" mt="20px" sx={{ borderRadius: 5 }}>
            {errorMessage}
          </Box>
        )}
      </Box>
    </Box>
  );
}
