import { Box, Button, Card, Group, Modal, Text, Title } from '@mantine/core';
import { File, getFileType } from 'models/file';
import prettyBytes from 'pretty-bytes';
import React, { useMemo } from 'react';
import useModal from 'hooks/useModal';
import useStyles from './FileCard.styles';
import FilePreview from './FilePreview';
import { IconDownload, IconTrash } from '@tabler/icons';
import axios from 'axios';
import { useNotifications } from '@mantine/notifications';

interface FileCard {
  file: File;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileCard: React.FC<FileCard> = ({ file, setFiles }) => {
  const { classes } = useStyles();
  const modal = useModal();
  const notifications = useNotifications();

  const fileTimestamp = useMemo(
    () => new Date(file.timestamp).toLocaleString('de-DE'),
    [file.timestamp]
  );

  const fileType = useMemo(() => {
    const format = file.name.split('.');
    return getFileType(format[format.length - 1]);
  }, [file.name]);

  const deleteFile = async () => {
    const response = await axios.delete(`/api/files/delete?id=${file.id}`);
    setFiles(response.data);
    notifications.showNotification({
      title: 'Deleted file',
      message: 'Succesfully deleted file',
      color: 'lime',
    });

    modal.close();
  };

  const downloadFile = async () => {
    window.open(`/api/files/download?id=${file.id}`);
  };

  return (
    <>
      <Card className={classes.card} tabIndex={0} onClick={modal.show}>
        <Group direction="column" spacing={0}>
          <Title order={4}>{file.name}</Title>
          <Text color="dimmed">
            {prettyBytes(file.size, { binary: true })} | {fileTimestamp}
          </Text>
        </Group>
      </Card>
      <Modal
        size="xl"
        opened={modal.opened}
        onClose={modal.close}
        title={file.name}
      >
        <Title order={5}>Preview</Title>
        <Box className={classes.preview} mb="md">
          {fileType === 'unknown' ? (
            <Text m="md">No preview available.</Text>
          ) : (
            <FilePreview fileType={fileType} />
          )}
        </Box>
        <Group position="right">
          <Button
            color="red"
            leftIcon={<IconTrash size={16} />}
            onClick={deleteFile}
          >
            Delete
          </Button>
          <Button
            color="teal"
            leftIcon={<IconDownload size={16} />}
            onClick={downloadFile}
          >
            Download
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default FileCard;
