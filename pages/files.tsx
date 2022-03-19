import {
  ActionIcon,
  Button,
  Group,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import prettyBytes from 'pretty-bytes';
import React, { useMemo, useState } from 'react';
import { File, maxFileSize } from 'models/file';
import { getFiles } from 'lib/files/fileController';
import FileCard from 'components/files/FileCard';

interface Props {
  files: File[];
  maxFileSize: number;
  currentFileSize: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const files = await getFiles();
  const currentFileSize = files.reduce((acc, cur) => acc + cur.size, 0);

  return { props: { maxFileSize, currentFileSize, files } };
};

const Files: React.FC<Props> = ({ maxFileSize, currentFileSize, files }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);
  const clearSearchTerm = () => setSearchTerm('');

  const percentage = (currentFileSize / maxFileSize) * 100;
  const filteredFiles = useMemo(
    () => files.filter((file) => file.name.includes(searchTerm)),

    [files, searchTerm]
  );

  return (
    <>
      <Title order={2} mb="xs">
        Files
      </Title>
      <Tooltip
        label={`${prettyBytes(currentFileSize, {
          binary: true,
        })} / ${prettyBytes(maxFileSize, { binary: true })}`}
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
      <Group mb="md" align="flex-end">
        <TextInput
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search"
          sx={{ flexGrow: 1 }}
          icon={<IconSearch size={12} />}
          label="Search"
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
      <Group direction="column" grow>
        {filteredFiles.length === 0 ? (
          <Text>No files found.</Text>
        ) : (
          filteredFiles.map((file) => <FileCard key={file.id} file={file} />)
        )}
      </Group>
    </>
  );
};

export default Files;
