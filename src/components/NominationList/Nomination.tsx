import React from 'react';
import { Badge, Box, Flex, Image, Heading, Link, Spacer } from '@chakra-ui/react';
import RemoveButton from './RemoveButton';
import { Movie } from '../../types/SearchResult';
import { BOX_SHADOW } from '../constants';

interface NominationProps {
  movie: Movie;
  setNomination: (movie: Movie, action: 'add'|'remove') => void
}

const Nomination: React.FC<NominationProps> = ({ movie: m, setNomination }) => {
  return (
    <Flex
      key={m.imdbID}
      direction='row'
      alignItems='center'
      borderRadius={8}
      boxShadow={BOX_SHADOW}
      minH='110px'
      my={2}
      background='white'
      _hover={{ backgroundColor: 'gray.50' }}
    >
      <Box justifyContent='center' p={5}>
        <Image
          maxW='50px'
          src={m.Poster}
          fallbackSrc='/placeholder.png'
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
        <RemoveButton movie={m} setNomination={setNomination} />
      </Box>
    </Flex>
  );
};

export default Nomination;
