import React from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Movie, SearchResponse } from '../types/SearchResult';
import axios from 'axios';
import { SearchIcon } from '@chakra-ui/icons';
import { OMDB_API_KEY } from './constants';

interface SearchProps {
  setResults: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const getApiEndpoint = (text: string) => {
  return `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${text}&type=movie`;
};

const handleSearchTitle = async (text: string) => {
  const response = await axios.get(getApiEndpoint(text));
  return response.data as SearchResponse;
};

const Search: React.FC<SearchProps> = ({ setResults }) => {
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchResponse = await handleSearchTitle(e.target.value);

    if (searchResponse?.Response === 'True') {
      setResults(searchResponse.Search);
    } else {
      setResults([]);
    }
  };

  return (
    <FormControl>
      <FormLabel>Search Movies</FormLabel>
      <InputGroup>
        <InputLeftElement children={<SearchIcon />} />
        <Input
          type='text'
          placeholder='Movie Title'
          onChange={handleOnChange}
        />
      </InputGroup>
    </FormControl>
  );
};

export default Search;
