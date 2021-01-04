import React from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { FiPlusCircle } from 'react-icons/fi'
import { Movie } from '../types/SearchResult'

interface NominateButtonProps {
  movie: Movie;
  setNomination: (movie: Movie, action: 'add'|'remove') => void;
  isDisabled?: boolean;
}

const NominateButton: React.FC<NominateButtonProps> = ({ movie, setNomination, isDisabled }) => {
  const handleOnClick = () => {
    setNomination(movie, 'add');
  }

  return (
    <Tooltip hasArrow label='Nominate Movie'>
      <IconButton
        aria-label='Nominate Movie'
        icon={<FiPlusCircle />}
        size='sm'
        onClick={handleOnClick}
        isDisabled={isDisabled}
      />
    </Tooltip>
  )
}

export default NominateButton
