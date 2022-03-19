import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

export interface NavigationLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  url: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  icon,
  color,
  label,
  url,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(url);
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
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default NavigationLink;
