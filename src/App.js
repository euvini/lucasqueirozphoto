import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import ImageGallery from './comps/ImageGallery';
import Modal from './comps/Modal';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  return (
    <div className="App">
      <Title />
      {/* <UploadForm /> */}
      {
        selectedGallery &&
        <ImageGallery setSelectedImg={setSelectedImg} selectedGallery={selectedGallery} />
      }
      <ImageGrid setSelectedImg={setSelectedGallery} />
      {/* {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )} */}
    </div>
  );
}

export default App;
