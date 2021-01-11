import * as React from 'react';
import {
  Alert,
  AlertIcon,
  AlertStatus,
  Flex,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react';
import { Movie } from '../../types/SearchResult';
import { BOX_SHADOW } from '../constants';
import Nomination from './Nomination';

interface NominationListProps {
  nominations: Movie[];
  updateNominations: (movie: Movie, action: 'add'|'remove') => void;
}

const renderAlert = (nominations: Movie[]) => {
  let status: AlertStatus = 'info';
  let message = `You can nominate ${5 - nominations.length} more films for The Shoppies.`;
  if (nominations.length === 4) {
    message = 'You can nominate 1 more film for The Shoppies.';
  }
  if (nominations.length === 5) {
    status = 'success';
    message = 'Nominations complete!';
  }
  return (
    <Alert status={status} borderRadius={8}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

const renderSkeleton = (nominations: Movie[]) => {
  if (nominations.length === 0) {
    return (
      <Flex
        backgroundColor='gray.100'
        alignItems='center'
        my={2}
        justifyContent='center'
        boxShadow={BOX_SHADOW}
        borderRadius={8}
        h='110px'
      >
        <Text color='gray.600'>No nominations.</Text>
      </Flex>
    );
  }
  return null;
};

const NominationList: React.FC<NominationListProps> = ({ nominations, updateNominations }) => {
  return (
    <Stack alignItems='stretch' w='100%'>
      <Heading size='md'>Nominations</Heading>
      {renderAlert(nominations)}
      {renderSkeleton(nominations)}
      {nominations.map((m: Movie) => {
        return (<Nomination movie={m} setNomination={updateNominations} />);
      })}
    </Stack>
  );
};

export default NominationList;
