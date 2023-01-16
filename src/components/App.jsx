import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Text } from './App.styled';

const App = () => {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);

  useEffect(() => {
    if (!input) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);

        const foundImages = await fetchImages(input, page);

        setImages(prevImages => [...prevImages, ...foundImages.hits]);
        setLoading(false);
        setVisibleLoadMore(!(page * 12 >= foundImages.totalHits));

        if (foundImages.hits.length === 0) {
          toast.warning('No pictures with this title');
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong. Try again later.');
      }
    }
    fetchData();
  }, [input, page]);

  function handleFormSubmit(input) {
    setImages([]);
    setInput(input);
    setPage(1);
  }

  function loadMore() {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {!input && <Text>Enter image name, please!</Text>}

      {images && <ImageGallery images={images} />}

      {loading && <Loader loading={loading} />}

      {visibleLoadMore && !loading && <Button onClick={loadMore} />}

      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
