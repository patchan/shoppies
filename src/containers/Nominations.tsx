import React, { useState } from 'react';
import {
  Container,
  Heading,
  VStack
} from '@chakra-ui/react';
import NominationList from '../components/NominationList';
import ResultList from '../components/ResultList';
import Search from '../components/Search';
import { Movie } from '../types/SearchResult';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Emoji from '../components/Emoji';

export const NominationsContext = React.createContext<Movie[]>([]);

const Nominations: React.FC = () => {
  const [results, setResults] = useState<Movie[]>([]);
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
        <Heading as='h1' py={3}>The Shoppies <Emoji symbol='🏆' label='trophy'/></Heading>
        <NominationList nominations={nominations} updateNominations={handleSetNominations} />
        <Search setResults={setResults} />
        <NominationsContext.Provider value={nominations}>
          {results.length > 0 && <ResultList results={results} updateNominations={handleSetNominations} />}
        </NominationsContext.Provider>
      </VStack>
    </Container>
  );
};

export default Nominations;
