import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));
