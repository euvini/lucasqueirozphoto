import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');
  const preImg = require('../assets/Frame14412.png');
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (docId) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [docId]: true,
    }));
  };

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div>
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={() => setSelectedImg(doc.images)}
            >
              <div className="image-container">
                {loadedImages[doc.id] ? (
                  <>
                    <motion.img
                      src={doc.url}
                      alt="uploaded pic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    />
                  </>
                ) : (
                  <>
                    <motion.img
                      src={preImg}
                      alt="uploaded pic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    />
                  </>
                )}
              </div>
              <img
                style={{ display: 'none' }}
                src={doc.url}
                alt="temp"
                onLoad={() => handleImageLoad(doc.id)}
              />
            </motion.div>
            <div className="image-title">{doc.title}</div>
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
