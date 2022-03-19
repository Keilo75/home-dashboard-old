import React, { useState } from 'react';
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconDashboard, IconFiles, IconHome } from '@tabler/icons';
import NavigationLink, { NavigationLinkProps } from './NavigationLink';

const pages: NavigationLinkProps[] = [
  { label: 'Home', color: 'blue', icon: <IconHome size={16} />, url: '/' },
  {
    label: 'Files',
    color: 'teal',
    icon: <IconFiles size={16} />,
    url: '/files',
  },
];

export const Navigation: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 400 }}
        >
          {pages.map((page) => (
            <NavigationLink key={page.label} {...page} />
          ))}
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <IconDashboard />
            <Text ml="xs">Home Dashboard</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
