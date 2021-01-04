import React from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { Movie } from '../types/SearchResult'
import { FiMinusCircle } from 'react-icons/fi'

interface RemoveButtonProps {
  movie: Movie;
  setNomination: (movie: Movie, action: 'add'|'remove') => void
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ movie, setNomination }) => {
  const handleOnClick = () => {
    setNomination(movie, 'remove');
  }

  return (
    <Tooltip hasArrow label='Remove Nomination'>
      <IconButton
        aria-label='Remove Nomination'
        icon={<FiMinusCircle />}
        size='sm'
        onClick={handleOnClick}
        colorScheme='red'
      />
    </Tooltip>
  )
}

export default RemoveButton
