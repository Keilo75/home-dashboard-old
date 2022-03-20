import { createStyles, Group, Loader, Text, Title } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons';
import axios from 'axios';
import { File as CustomFile } from 'models/file';
import React, { useRef, useState } from 'react';

const useStyles = createStyles((theme) => ({
  disabled: {
    backgroundColor: theme.colors.dark[6],
    borderColor: theme.colors.dark[5],
    cursor: 'not-allowed',

    '& *': {
      color: theme.colors.dark[3],
    },
  },
}));

interface UploadFileModalProps {
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  setFiles: React.Dispatch<React.SetStateAction<CustomFile[]>>;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  isUploading,
  setIsUploading,
  close,
  setFiles,
}) => {
  const { classes } = useStyles();
  const notifications = useNotifications();

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileDrop = async (files: File[]) => {
    setIsUploading(true);
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }

    try {
      const response = await axios.post('/api/files/upload', formData, {
        onUploadProgress: (e) => {
          setUploadProgress(Math.round(e.loaded * 100) / e.total);
        },
      });

      setFiles(response.data);

      notifications.showNotification({
        title: 'Uploaded file',
        message: 'Succesfully uploaded file',
        color: 'lime',
      });
    } catch {
      notifications.showNotification({
        title: 'Upload failed',
        message: 'Could not upload file.',
        color: 'red',
      });
    }

    setIsUploading(false);
    close();
  };

  return (
    <>
      <Dropzone
        onDrop={handleFileDrop}
        disabled={isUploading}
        className={isUploading && classes.disabled}
      >
        {() =>
          !isUploading ? (
            <Group>
              <IconUpload />
              <Group direction="column" spacing={0}>
                <Text>Drag files to upload them.</Text>
                <Text size="sm" color="dimmed">
                  Limit: 100 MB
                </Text>
              </Group>
            </Group>
          ) : (
            <Group>
              <Loader size="sm" />
              <Text>{uploadProgress.toFixed(2)}% </Text>
            </Group>
          )
        }
      </Dropzone>
    </>
  );
};

export default UploadFileModal;
