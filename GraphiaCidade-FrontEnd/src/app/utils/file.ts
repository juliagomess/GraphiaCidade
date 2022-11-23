import Compress from 'compress.js';

import { FILE_TYPE } from '~/enum/file';

export const imageExtensions = ['png', 'jpg', 'jpeg'];
export const audioExtensions = ['mp3', 'wav'];
export const videoExtensions = ['flv', 'mp4', 'wmv'];

export const compressImages = async (image: any[]) => {
  let response = null;
  try {
    const compress = new Compress();

    response =  await compress.compress(image, {
      maxHeight: 1920,
      maxWidth: 1080,
      quality: 0.9,
      size: 1,
      resize: true,
    });

    response = response ? `${response[0].prefix}${response[0].data}` : null;
  } catch (error) {
    response = error;
  }

  return response;
};

export function getFileType(extension: string) {
  let fileType = FILE_TYPE.OTHER;

  if (imageExtensions.includes(extension)) {
    fileType = FILE_TYPE.IMAGE;
  }

  if (audioExtensions.includes(extension)) {
    fileType = FILE_TYPE.AUDIO;
  }

  if (videoExtensions.includes(extension)) {
    fileType = FILE_TYPE.VIDEO;
  }

  if (extension === 'pdf') {
    fileType = FILE_TYPE.PDF;
  }

  return fileType;
}
