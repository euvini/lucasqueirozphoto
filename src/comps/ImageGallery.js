import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageGallery = ({ setSelectedImg, selectedGallery }) => {
    const { docs } = useFirestore('images');
    const preImg = require('../assets/Frame14412.png')
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (docId) => {
        setLoadedImages(prevState => ({
            ...prevState,
            [docId]: true
        }));
    };

    return (
        <div className="img-gallery">
            {selectedGallery && selectedGallery.map(doc => (
                <motion.div
                    className="img-list"
                    key={doc}
                    layout
                    whileHover={{ opacity: 1 }}
                    onClick={() => setSelectedImg(doc)}
                >
                    {loadedImages[doc] ? (
                        <motion.img
                            src={doc}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    ) : (
                        <motion.img
                            src={preImg}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: .5 }}
                        />
                    )}
                    <img
                        style={{ display: 'none' }}
                        src={doc}
                        alt="temp"
                        onLoad={() => handleImageLoad(doc)}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default ImageGallery;
