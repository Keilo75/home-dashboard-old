import {
  Button,
  createStyles,
  Group,
  PasswordInput,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import React from 'react';

const useStyles = createStyles((theme) => ({
  passwordInput: {
    flexGrow: 1,
  },
}));

const initialValues = { password: '' };

interface LogInFormProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogInForm: React.FC<LogInFormProps> = ({ setLoggedIn }) => {
  const { classes } = useStyles();

  const passwordForm = useForm({ initialValues });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await axios.get(`/api/admin/password?p=${values.password}`, {
        responseType: 'text',
      });

      setLoggedIn(true);
    } catch {
      passwordForm.setErrors({ password: 'Wrong password' });
    }
  };

  return (
    <>
      <Text>This page requires authentification.</Text>
      <Text size="sm">Password</Text>
      <form onSubmit={passwordForm.onSubmit(handleSubmit)}>
        <Group align="flex-start">
          <PasswordInput
            className={classes.passwordInput}
            {...passwordForm.getInputProps('password')}
          />
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};

export default LogInForm;
