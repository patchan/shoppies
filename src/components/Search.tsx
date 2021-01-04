import React from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Movie, SearchResponse } from '../types/SearchResult'
import axios from 'axios'
import { SearchIcon } from '@chakra-ui/icons'

interface SearchProps {
  setResults: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const OMDB_API_KEY = '8e04d99'

const handleSearchTitle = async (text: string) => {
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${text}&type=movie`)
  return response.data as SearchResponse
}

const Search: React.FC<SearchProps> = ({ setResults }) => {
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchResponse = await handleSearchTitle(e.target.value)
    console.log(searchResponse);
    if (searchResponse?.Response === 'True') {
      setResults(searchResponse.Search)
    } else {
      setResults([])
    }
  }

  return (
    <FormControl>
      <FormLabel>Search Movies</FormLabel>
      <InputGroup>
        <InputLeftElement
          children={<SearchIcon />}
        />
        <Input
          type="text"
          placeholder="Movie Title"
          onChange={handleOnChange}
        />
      </InputGroup>
    </FormControl>
  )
}

export default Search
