import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImgApiService } from './services/api';
import { Button } from './Button';
import { Loader } from 'components/Loader';
import { Modal } from './Modal';

const imgApiService = new ImgApiService();

export const App = () => {
  const [imageArr, setImageArr] = useState([]);
  const [query, setQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    imgApiService.query = query;
    onFetchImage();
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    onLoadImage();
  }, [page]);

  const onSearch = newQuery => {
    imgApiService.resetPage();
    setQuery(newQuery);
  };

  const onToggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickImg = event => {
    setLargeImageURL(
      imageArr.find(img => img.webformatURL === event.target.src).largeImageURL
    );
  };

  const onFetchImage = async () => {
    setIsLoading(true);

    try {
      const imageArr = await imgApiService.fetchImage();
      setImageArr(
        imageArr.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }))
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadImage = async () => {
    setIsLoading(true);

    try {
      const imageArr = await imgApiService.fetchImage();
      setImageArr(prevState => [
        ...prevState,
        ...imageArr.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })),
      ]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <>
      <Searchbar onSubmit={onSearch} />

      {imageArr.length >= 12 && (
        <ImageGallery
          onClickImg={onClickImg}
          images={imageArr}
          onToggleModal={onToggleModal}
        />
      )}

      {showModal && <Modal onToggleModal={onToggleModal} img={largeImageURL} />}

      {isLoading && <Loader />}

      {imageArr.length >= 12 && !isLoading && (
        <Button onLoadMore={onLoadMore} />
      )}
    </>
  );
};
