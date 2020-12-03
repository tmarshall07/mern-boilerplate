import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text } from 'rebass/styled-components';
import { Store } from '../state/store';
import { register } from '../state/user/actions';
import Button from './Button';
import Input from './Input';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { dispatch } = useContext(Store);

  const history = useHistory();

  const handleRegister = async () => {
    const res = await register(dispatch, name, email, password);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      history.push('/');
    }
  };

  return (
    <Box maxWidth="400px" margin="auto">
      <Box mb="20px">
        <Box mb="20px">
          <Text mb="10px">Name</Text>
          <Input value={name} placeholder="Enter name..." onChange={(e) => setName(e.currentTarget.value)} />
        </Box>
        <Box mb="20px">
          <Text mb="10px">Email</Text>
          <Input value={email} placeholder="Enter email..." onChange={(e) => setEmail(e.currentTarget.value)} />
        </Box>
        <Box>
          <Text mb="10px">Password</Text>
          <Input
            value={password}
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Box>
      </Box>
      <Box>
        <Button width="100%" bg="green" onClick={handleRegister}>
          Sign up
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
