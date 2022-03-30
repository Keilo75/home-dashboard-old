import { Tabs, Title } from '@mantine/core';
import { IconClipboard, IconServer } from '@tabler/icons';
import LogInForm from 'components/admin/LogInForm';
import DeployTab from 'components/admin/tabs/DeployTab';
import LogsTab from 'components/admin/tabs/LogsTab';
import { getLogs, LogMessage } from 'lib/logController';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

interface Props {
  logs: LogMessage[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const logs = await getLogs();

  return { props: { logs } };
};

const Admin: React.FC<Props> = ({ logs }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Title order={2} mb="xs">
        Admin
      </Title>
      {!loggedIn ? (
        <LogInForm setLoggedIn={setLoggedIn} />
      ) : (
        <Tabs>
          <Tabs.Tab label="Deploy" icon={<IconServer size={16} />}>
            <DeployTab />
          </Tabs.Tab>
          <Tabs.Tab label="Logs" icon={<IconClipboard size={16} />}>
            <LogsTab logs={logs} />
          </Tabs.Tab>
        </Tabs>
      )}
    </>
  );
};

export default Admin;
