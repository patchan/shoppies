import React, { useContext } from 'react';
import { Badge, Box, Flex, Image, Heading, Link, Spacer } from '@chakra-ui/react';
import { Movie } from '../../types/SearchResult';
import NominateButton from './NominateButton';
import { NominationsContext } from '../../containers/Nominations';

interface MovieResultProps {
  movie: Movie;
  setNomination: (movie: Movie, action: 'add'|'remove') => void
}

const isNominated = (m: Movie, nominations: Movie[]) => {
  for (const movie of nominations) {
    if (movie.imdbID === m.imdbID) {
      return true;
    }
  }
  return false;
};

const renderNominationButton = (
  m: Movie,
  nominations: Movie[],
  setNominations: (m: Movie, action: 'add'|'remove') => void
) => {
  if (isNominated(m, nominations) || nominations.length === 5) {
    return <NominateButton movie={m} setNomination={setNominations} isDisabled />;
  }
  return <NominateButton movie={m} setNomination={setNominations} />;
};


const MovieResult: React.FC<MovieResultProps> = ({ movie: m, setNomination }) => {
  const nominations = useContext(NominationsContext);

  return (
    <Flex
      key={m.imdbID}
      direction='row'
      alignItems='center'
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
        {renderNominationButton(m, nominations, setNomination)}
      </Box>
    </Flex>
  );
};

export default MovieResult;
