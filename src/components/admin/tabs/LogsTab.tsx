import { Card, Group, Text, Tooltip } from '@mantine/core';
import { LogMessage } from 'lib/logController';
import React, { useMemo } from 'react';

interface LogsTabProps {
  logs: LogMessage[];
}

const LogsTab: React.FC<LogsTabProps> = ({ logs }) => {
  const dates = useMemo(
    () =>
      logs.map((log) => {
        const date = new Date(log.timestamp);
        return {
          string: date.toLocaleString('de-DE'),
          timeString: date.toLocaleTimeString('de-DE'),
        };
      }),
    [logs]
  );

  return (
    <Card>
      <Group direction="column" spacing={0}>
        {logs.map((log, index) => (
          <Group key={index} spacing="xs">
            <Tooltip label={dates[index].string}>
              <Text color="dimmed">[{dates[index].timeString}]</Text>
            </Tooltip>
            <Text color={log.color} weight={700}>
              {log.type.toUpperCase()}
            </Text>
            <Text>{log.message}</Text>
          </Group>
        ))}
      </Group>
    </Card>
  );
};

export default LogsTab;
