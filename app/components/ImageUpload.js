import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useUser } from '../components/UserContext.js';

const ImageUploadComponent = ({ onUploadSuccess }) => {
  const { userId } = useUser();
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try {
      const token = localStorage.getItem('TMtoken')
      const response = await axios.post('http://localhost:3001/api/imageupload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add your JWT token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.data.imageUrl);
        console.log(response.data.imageUrl);
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
            <p>Drag 'n' drop Image here, or click to select Image</p>
        }
      </div>
    </section>
  );
};

export default ImageUploadComponent;
