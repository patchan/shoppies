import * as React from "react"
import { Badge, Box, Divider, Flex, Heading, IconButton, Image, Link, Select, Spacer, Stack } from '@chakra-ui/react'
import { Movie } from '../types/SearchResult';
import NominateButton from './NominateButton';
import { orderBy } from 'lodash';
import { FiInfo } from 'react-icons/fi';

interface ResultsListProps {
  results: Movie[];
  updateNominations: (m: Movie, action: 'add'|'remove') => void;
  nominations: Movie[];
}

const isNominated = (m: Movie, nominations: Movie[]) => {
  for (let movie of nominations) {
    if (movie.imdbID === m.imdbID) {
      return true;
    }
  }
  return false;
}

const renderNominationButton = (m: Movie, nominations: Movie[], updateNominations: (m: Movie, action: 'add'|'remove') => void) => {
  if (isNominated(m, nominations) || nominations.length === 5) {
    return <NominateButton movie={m} setNomination={updateNominations} isDisabled />
  }
  return <NominateButton movie={m} setNomination={updateNominations} />
}

const ResultList: React.FC<ResultsListProps> = ({ results, updateNominations, nominations }) => {
  const DEFAULT_SORT = 'Year'
  const DEFAULT_SORT_DIR = 'desc' as 'asc' | 'desc'
  const [sortBy, setSortBy] = React.useState(DEFAULT_SORT);
  const [sortDirection, setSortDirection] = React.useState(DEFAULT_SORT_DIR);

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleSortDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDirection(e.target.value as "asc" | "desc")
  }

  return (
    <Stack alignItems='stretch' w='100%'>
      <Box my={2}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Select placeholder="Sort Order" onChange={handleSortBy}>
            <option value="Title">Title</option>
            <option value="Year">Year</option>
          </Select>
          <Select placeholder="Direction" onChange={handleSortDirection}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
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
                  fallbackSrc='http://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg'
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
        )
      })}
    </Stack>
  )
}

export default ResultList
