import { Text } from '@mantine/core';
import { getFileType } from 'models/file';
import React, { useMemo } from 'react';

interface FilePreviewProps {
  name: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ name }) => {
  const fileType =
    'unknown' ||
    useMemo(() => {
      const format = name.split('.').at(-1);
      return getFileType(format);
    }, [name]);

  if (fileType === 'unknown') return <Text m="md">No preview available.</Text>;

  return null;
};

export default FilePreview;
