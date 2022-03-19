import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
  preview: {
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: theme.colors.dark[5],
  },
}));
