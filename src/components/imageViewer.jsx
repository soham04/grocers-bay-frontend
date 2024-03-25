import React, { useState } from 'react';
import '../styles/components/ImageViewer.scss'; // Import the SCSS file

const ImageViewer = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].url);

  const handleThumbnailClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div className="image-viewer">
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Thumbnail ${index}`}
            className="thumbnail"
            onClick={() => handleThumbnailClick(image.url)}
          />
        ))}
      </div>
      <div className="main-image-container">
        <img src={selectedImage} alt="Main" className="main-image" />
      </div>
    </div>
  );
};

export default ImageViewer;
