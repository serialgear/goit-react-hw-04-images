import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ webformatURL, largeImageURL, description }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <GalleryItem>
        <GalleryImage
          src={webformatURL}
          alt={description}
          onClick={toggleModal}
        />

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            description={description}
            onClose={toggleModal}
          />
        )}
      </GalleryItem>
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
