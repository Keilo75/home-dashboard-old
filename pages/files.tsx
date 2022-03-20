import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconSearch, IconUpload, IconX } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import prettyBytes from 'pretty-bytes';
import React, { useMemo, useState } from 'react';
import { File, maxFileSize } from 'models/file';
import { getFiles } from 'lib/fileController';
import FileCard from 'components/files/FileCard';
import useModal from 'hooks/useModal';
import UploadFileModal from 'components/files/UploadFileModal';

interface Props {
  currentFiles: File[];
  maxFileSize: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currentFiles = await getFiles();

  return { props: { maxFileSize, currentFiles } };
};

const Files: React.FC<Props> = ({ maxFileSize, currentFiles }) => {
  const [files, setFiles] = useState<File[]>(currentFiles);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);
  const clearSearchTerm = () => setSearchTerm('');
  const [isUploading, setIsUploading] = useState(false);

  const uploadFileModal = useModal();

  const currentFileSize = useMemo(
    () => files.reduce((acc, cur) => acc + cur.size, 0),
    [files]
  );

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

        <Button
          onClick={uploadFileModal.show}
          leftIcon={<IconUpload size={16} />}
        >
          Upload File
        </Button>
      </Group>
      <Group direction="column" grow>
        {filteredFiles.length === 0 ? (
          <Text>No files found.</Text>
        ) : (
          filteredFiles.map((file) => <FileCard key={file.id} file={file} />)
        )}
      </Group>
      <Modal
        opened={uploadFileModal.opened}
        onClose={uploadFileModal.close}
        title="Upload File"
        centered
        withCloseButton={!isUploading}
        closeOnClickOutside={!isUploading}
        closeOnEscape={!isUploading}
      >
        <UploadFileModal
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          close={uploadFileModal.close}
          setFiles={setFiles}
        />
      </Modal>
    </>
  );
};

export default Files;
