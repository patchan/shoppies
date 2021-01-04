import * as React from "react"
import { Badge, Box, Flex, Heading, Image, Select, Spacer, Stack } from '@chakra-ui/react'
import { Movie } from '../types/SearchResult';
import NominateButton from './NominateButton';
import RemoveButton from './RemoveButton';
import { orderBy } from 'lodash';

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
  if (!isNominated(m, nominations)) {
    if (nominations.length === 5) {
      return <NominateButton movie={m} setNomination={updateNominations} isDisabled />
    }
    return <NominateButton movie={m} setNomination={updateNominations} />
  } else {
    return <RemoveButton movie={m} setNomination={updateNominations} />
  }
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
          <Flex
            key={m.imdbID}
            direction='row'
            alignItems='center'
            borderRadius={8}
            boxShadow='0px 1px 2px rgb(221 221 229 / 0.9),0px 2px 4px rgb(221 221 229 / 0.9),0px 4px 8px rgb(221 221 229 / 0.9),0px 8px 16px rgb(221 221 229 / 0.5)'
            my={2}
            background='white'
          >
            <Box justifyContent='center' p={5}>
              <Image
                maxW='50px'
                src={m.Poster}
                fallbackSrc='http://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg'
              />
            </Box>
            <Box width='100%' p={1}>
              <Heading as='h3' size='sm'>{m.Title}</Heading>
              <Badge borderRadius='full' px={2}>{m.Year}</Badge>
            </Box>
            <Spacer />
            <Box flex={1} p={5}>
              {renderNominationButton(m, nominations, updateNominations)}
            </Box>
          </Flex>
        )
      })}
    </Stack>
  )
}

export default ResultList
