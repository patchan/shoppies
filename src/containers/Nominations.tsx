import React from 'react';
import {
  VStack,
  Heading,
  Container
} from '@chakra-ui/react';
import NominationList from '../components/NominationList';
import ResultList from '../components/ResultList';
import Search from '../components/Search';
import { Movie } from '../types/SearchResult';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Nominations: React.FC = () => {
  const [results, setResults] = React.useState<Movie[]>([]);
  const [nominations, setNominations] = useLocalStorage<Movie[]>('nominations', []);

  const handleSetNominations = (m: Movie, action: 'add'|'remove') => {
    if (action === 'add') {
      if (nominations.length < 5) {
        setNominations([...nominations, m]);
      }
    } else {
      setNominations(nominations.filter((mov) => mov.imdbID !== m.imdbID));
    }
  };

  return (
    <Container>
      <VStack alignItems='flex-start' spacing={5}>
        <Heading as='h1' py={3}>The Shoppies</Heading>
        <NominationList movies={nominations} updateNominations={handleSetNominations} />
        <Search setResults={setResults} />
        {results.length > 0 && <ResultList results={results} updateNominations={handleSetNominations} nominations={nominations} />}
      </VStack>
    </Container>
  );
};

export default Nominations;
