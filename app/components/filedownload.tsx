// components/ImageWithDownloadButton.js
import React from 'react';

const ImageWithDownloadButton = ({ imageId, imageUrl, columnName }) => {
  const handleDownload = async () => {
    const response = await fetch(`/api/downloadImage?id=${imageId}&column=${columnName}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.jpg'; // You can set the image name dynamically
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div>
      <img src={imageUrl} alt="Image" />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default ImageWithDownloadButton;
