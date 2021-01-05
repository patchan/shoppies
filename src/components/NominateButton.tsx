import React from 'react'
import { IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { Movie } from '../types/SearchResult'

interface NominateButtonProps {
  movie: Movie;
  setNomination: (movie: Movie, action: 'add'|'remove') => void;
  isDisabled?: boolean;
}

const NominateButton: React.FC<NominateButtonProps> = ({ movie, setNomination, isDisabled }) => {
  const toast = useToast()

  const handleOnClick = () => {
    setNomination(movie, 'add');
    toast({
      title: "Nomination added",
      status: "success",
      duration: 2000,
      position: "top-right",
    })
  }

  return (
    <Tooltip hasArrow label='Nominate Movie'>
      <IconButton
        aria-label='Nominate Movie'
        size='sm'
        icon={<FiPlus fontSize='20px' />}
        onClick={handleOnClick}
        isDisabled={isDisabled}
        colorScheme='teal'
        isRound
      />
    </Tooltip>
  )
}

export default NominateButton
