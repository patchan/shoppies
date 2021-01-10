import React, { useContext, useState } from 'react';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Select,
  Spacer,
  Stack
} from '@chakra-ui/react';
import { Movie } from '../types/SearchResult';
import NominateButton from './NominateButton';
import { orderBy } from 'lodash';
import { NominationsContext } from '../containers/Nominations';

interface ResultsListProps {
  results: Movie[];
  updateNominations: (m: Movie, action: 'add'|'remove') => void;
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
  updateNominations: (m: Movie, action: 'add'|'remove') => void
) => {
  if (isNominated(m, nominations) || nominations.length === 5) {
    return <NominateButton movie={m} setNomination={updateNominations} isDisabled />;
  }
  return <NominateButton movie={m} setNomination={updateNominations} />;
};

const ResultList: React.FC<ResultsListProps> = ({ results, updateNominations }) => {
  const DEFAULT_SORT = 'Year';
  const DEFAULT_SORT_DIR = 'desc' as 'asc' | 'desc';
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIR);

  const nominations = useContext(NominationsContext);

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSortDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDirection(e.target.value as 'asc' | 'desc');
  };

  return (
    <Stack alignItems='stretch' w='100%'>
      <Box my={2}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Select placeholder='Sort By' onChange={handleSortBy}>
            <option value='Title'>Title</option>
            <option value='Year'>Year</option>
          </Select>
          <Select placeholder='Direction' onChange={handleSortDirection}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </Select>
        </Stack>
      </Box>
      {orderBy(results, sortBy, sortDirection).map((m: Movie) => {
        return (
          <>
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
                {renderNominationButton(m, nominations, updateNominations)}
              </Box>
            </Flex>
            <Divider borderColor='gray.400' />
          </>
        );
      })}
    </Stack>
  );
};

export default ResultList;
