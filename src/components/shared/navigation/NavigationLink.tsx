import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

export interface INavigationLink {
  icon: React.ReactNode;
  color: string;
  label: string;
  url: string;
}

interface NavigationLinkProps {
  link: INavigationLink;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ link, setOpened }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpened(false);
    router.push(link.url);
  };

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={handleClick}
    >
      <Group>
        <ThemeIcon color={link.color} variant="light">
          {link.icon}
        </ThemeIcon>
        <Text size="sm">{link.label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default NavigationLink;
