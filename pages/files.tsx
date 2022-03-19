import {
  ActionIcon,
  Button,
  Group,
  Progress,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import prettyBytes from 'pretty-bytes';
import React, { useState } from 'react';
import { maxFileSize } from '../constants';

interface Props {
  maxFileSize: number;
  currentFileSize: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return { props: { maxFileSize, currentFileSize: 0 } };
};

const Files: React.FC<Props> = ({ maxFileSize, currentFileSize }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);
  const clearSearchTerm = () => setSearchTerm('');

  const percentage = (currentFileSize / maxFileSize) * 100;

  return (
    <>
      <Title order={2} mb="xs">
        Files
      </Title>
      <Tooltip
        label={`${prettyBytes(currentFileSize)} / ${prettyBytes(maxFileSize)}`}
        withArrow
        gutter={0}
      >
        <Text>
          Used Storage:{' '}
          {(percentage === Number.POSITIVE_INFINITY ? 0 : percentage).toFixed(
            2
          )}
          %
        </Text>
      </Tooltip>

      <Progress size="xl" mb="md" value={percentage} />
      <Group>
        <TextInput
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search"
          sx={{ flexGrow: 1 }}
          icon={<IconSearch size={12} />}
          rightSection={
            <>
              {searchTerm.length !== 0 && (
                <ActionIcon onClick={clearSearchTerm}>
                  <IconX size={12} />
                </ActionIcon>
              )}
            </>
          }
        />
        <Button>Upload File</Button>
      </Group>
    </>
  );
};

export default Files;
