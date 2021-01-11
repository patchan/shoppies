import React, { useState } from 'react';
import { Box, Divider, Select, Stack } from '@chakra-ui/react';
import { Movie } from '../../types/SearchResult';
import { orderBy } from 'lodash';
import MovieResult from './MovieResult';

interface ResultsListProps {
  results: Movie[];
  updateNominations: (m: Movie, action: 'add'|'remove') => void;
}

const ResultList: React.FC<ResultsListProps> = ({ results, updateNominations }) => {
  const DEFAULT_SORT = 'Year';
  const DEFAULT_SORT_DIR = 'desc' as 'asc' | 'desc';
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIR);

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
            <MovieResult movie={m} setNomination={updateNominations} />
            <Divider borderColor='gray.400' />
          </>
        );
      })}
    </Stack>
  );
};

export default ResultList;
