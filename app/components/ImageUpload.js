import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUploadComponent = ({ onUploadSuccess }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:3001/api/imageupload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add your JWT token in the Authorization header
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTIzNzA5MzExMjY4NzgxZTFjNTlkYiIsInJvbGUiOiJ2ZW5kb3IiLCJuYW1lIjoiUHJhbW9kIEtlc2Fya2FyIiwiY29tcGFueU5hbWUiOiJDb21wYW55IE5hbWUiLCJpYXQiOjE3MDA3MzE2MzMsImV4cCI6MTcwMDgxODAzM30.Fena9yLCRbXvkNpAwybOi6LlW-9039pSY33uq-VIkpA`,
        },
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.data.imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <section className='border-2 border-gray-300 border-dashed h-full p-4'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    </section>
  );
};

export default ImageUploadComponent;
