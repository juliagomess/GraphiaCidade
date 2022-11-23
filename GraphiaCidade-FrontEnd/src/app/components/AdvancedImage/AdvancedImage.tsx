import React, { useState } from 'react';
import { Modal } from 'antd';

interface IAdvancedImageProps {
  src: string;
  alt: string;
};

const AdvancedImage = ({
  src,
  alt,
}: IAdvancedImageProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="advanced-image">
      <div className="advanced-image__preview">
        <img 
          className="advanced-image__preview__img"
          src={src} 
          alt={alt}
          onClick={() => setVisible(true)}
        />
      </div>
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <img 
          className="advanced-image__modal"
          src={src} 
          alt={alt} 
        />
      </Modal>
    </div>
  );
}

export default AdvancedImage;