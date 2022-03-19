import { Box, Card, Group, Modal, Text, Title } from '@mantine/core';
import { File } from 'models/file';
import prettyBytes from 'pretty-bytes';
import React from 'react';
import useModal from 'hooks/useModal';
import useStyles from './FileCard.styles';
import FilePreview from './FilePreview';

interface FileCard {
  file: File;
}

const FileCard: React.FC<FileCard> = ({ file }) => {
  const { classes } = useStyles();
  const modal = useModal();

  return (
    <>
      <Card className={classes.card} tabIndex={0} onClick={modal.show}>
        <Group direction="column" spacing={0}>
          <Title order={4}>{file.name}</Title>
          <Text>{prettyBytes(file.size, { binary: true })}</Text>
        </Group>
      </Card>
      <Modal
        size="xl"
        opened={modal.opened}
        onClose={modal.close}
        title={file.name}
      >
        <Title order={5}>Preview</Title>
        <Box className={classes.preview}>
          <FilePreview name={file.name} />
        </Box>
      </Modal>
    </>
  );
};

export default FileCard;
