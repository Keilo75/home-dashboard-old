import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconCloudDownload, IconServer } from '@tabler/icons';
import axios from 'axios';
import { LogMessage } from 'lib/logController';
import { Commit } from 'models/commit';
import React, { useEffect, useMemo, useState } from 'react';

const DeployTab: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [commit, setCommit] = useState<Commit>();

  const fetchLatestCommit = async () => {
    setIsFetching(true);

    const response = await axios.get(`/api/admin/commit`);
    setIsFetching(false);
    setCommit({
      ...response.data,
      date: new Date(response.data.date).toLocaleString('de-DE'),
    });
  };

  return (
    <>
      <Title order={4}>Latest commit</Title>
      <Card>
        {commit === undefined ? (
          <Button
            onClick={fetchLatestCommit}
            loading={isFetching}
            leftIcon={<IconCloudDownload size={16} />}
          >
            Fetch latest commit
          </Button>
        ) : (
          <>
            <Group spacing={5}>
              <Text color="dimmed" weight={600}>
                Author:
              </Text>
              <Text>{commit.author}</Text>
            </Group>
            <Group spacing={5}>
              <Text color="dimmed" weight={600}>
                Date:
              </Text>
              <Text>{commit.date}</Text>
            </Group>
            <Group spacing={5}>
              <Text color="dimmed" weight={600}>
                Message:
              </Text>
              <Text>{commit.message}</Text>
            </Group>
            <Group spacing={5}>
              <Text color="green">{commit.additions} Additions</Text>
              <Text color="dimmed">/</Text>
              <Text color="red">{commit.deletions} Deletions</Text>
            </Group>
            <Button leftIcon={<IconServer size={16} />} mt="xs">
              Deploy
            </Button>
          </>
        )}
      </Card>
    </>
  );
};

export default DeployTab;
