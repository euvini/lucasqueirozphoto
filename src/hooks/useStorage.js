import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (title, cover, files) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    // references
    const collectionRef = projectFirestore.collection('images');

    const uploadPromises = files.map(file => {
      const storageRef = projectStorage.ref(file.name);
      return storageRef.put(file);
    });

    Promise.all(uploadPromises)
      .then(async uploadSnapshots => {
        const downloadURLPromises = uploadSnapshots.map(async snapshot => {
          const url = await snapshot.ref.getDownloadURL();
          return url;
        });
        return Promise.all(downloadURLPromises);
      })
      .then(async urls => {
        const createdAt = timestamp();
        await collectionRef.add({
          title,
          cover,
          images: urls,
          createdAt
        });
        setUrls(urls);
      })
      .catch(err => {
        setError(err);
      });
    const uploadTask = projectStorage.ref(files[0].name).put(files[0]);

    const unsubscribe = uploadTask.on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    });

    return () => {
      unsubscribe();
    };
  }, [title, cover, files]);

  return { progress, urls, error };
}

export default useStorage;
