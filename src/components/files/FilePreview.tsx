import { Code, Text } from '@mantine/core';
import { FileType, getFileType } from 'models/file';
import React, { useMemo } from 'react';

interface FilePreviewProps {
  fileType: Omit<FileType, 'unknown'>;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileType }) => {
  return null;
};

export default FilePreview;
