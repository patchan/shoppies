import * as React from 'react';
import { Alert, AlertIcon, AlertStatus, Badge, Box, Flex, Heading, Image, Link, Spacer, Stack, Text } from '@chakra-ui/react';
import { Movie } from '../types/SearchResult';
import RemoveButton from './RemoveButton';
import { BOX_SHADOW } from './constants';

interface NominationListProps {
  movies: Movie[];
  updateNominations: (movie: Movie, action: 'add'|'remove') => void;
}

const renderAlert = (movies: Movie[]) => {
  let status: AlertStatus = 'info';
  let message = `You can nominate ${5 - movies.length} more films for The Shoppies.`;
  if (movies.length === 4) {
    message = 'You can nominate 1 more film for The Shoppies.';
  }
  if (movies.length === 5) {
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

const renderSkeleton = (movies: Movie[]) => {
  if (movies.length === 0) {
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

const NominationList: React.FC<NominationListProps> = ({ movies, updateNominations }) => {
  return (
    <Stack alignItems='stretch' w='100%'>
      <Heading size='md'>Nominations</Heading>
      {renderAlert(movies)}
      {renderSkeleton(movies)}
      {movies.map((m: Movie) => {
        return (
          <Flex
            key={m.imdbID}
            direction='row'
            alignItems='center'
            borderRadius={8}
            boxShadow={BOX_SHADOW}
            my={2}
            background='white'
            _hover={{ backgroundColor: 'gray.50' }}
          >
            <Box justifyContent='center' p={5}>
              <Image
                maxW='50px'
                src={m.Poster}
                fallbackSrc='/placeholder'
              />
            </Box>
            <Box width='100%' p={1}>
              <Heading as='h3' size='sm'>
                <Link href={`https://www.imdb.com/title/${m.imdbID}`} isExternal>
                  {m.Title}
                </Link>
              </Heading>
              <Badge borderRadius='full' px={1}>{m.Year}</Badge>
            </Box>
            <Spacer />
            <Box flex={1} p={5}>
              <RemoveButton movie={m} setNomination={updateNominations} />
            </Box>
          </Flex>
        );
      })}
    </Stack>
  );
};

export default NominationList;
