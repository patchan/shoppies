import React from 'react';
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { Movie } from '../types/SearchResult';
import { FiX } from 'react-icons/fi';

interface RemoveButtonProps {
  movie: Movie;
  setNomination: (movie: Movie, action: 'add'|'remove') => void
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ movie, setNomination }) => {
  const toast = useToast();
  
  const handleOnClick = () => {
    setNomination(movie, 'remove');
    toast({
      title: 'Nomination removed',
      duration: 2000,
      position: 'top-right',
    });
  };

  return (
    <Tooltip hasArrow label='Remove Nomination'>
      <IconButton
        aria-label='Remove Nomination'
        size='sm'
        icon={<FiX fontSize='20px' />}
        onClick={handleOnClick}
        colorScheme='red'
        isRound
      />
    </Tooltip>
  );
};

export default RemoveButton;
