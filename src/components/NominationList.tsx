import * as React from "react"
import { Alert, AlertIcon, AlertStatus, Badge, Box, Flex, Heading, Image, Link, Spacer, Stack } from '@chakra-ui/react'
import { Movie } from '../types/SearchResult';
import RemoveButton from './RemoveButton';

interface NominationListProps {
  movies: Movie[];
  updateNominations: (movie: Movie, action: 'add'|'remove') => void;
}

const renderAlert = (movies: Movie[]) => {
  let status: AlertStatus = 'info';
  let message = `You can nominate ${5 - movies.length} more films for The Shoppies.`
  if (movies.length === 4) {
    message = 'You can nominate 1 more film for The Shoppies.'
  }
  if (movies.length === 5) {
    status = 'success'
    message = 'Nominations complete!'
  }
  return (
    <Alert status={status} borderRadius={8}>
      <AlertIcon />
      {message}
    </Alert>
  )
}

const NominationList: React.FC<NominationListProps> = ({ movies, updateNominations }) => {
  return (
    <Stack alignItems='stretch' w='100%'>
      <Heading size='md'>Nominations</Heading>
      {renderAlert(movies)}
      {movies.map((m: Movie) => {
        return (
          <Flex
            key={m.imdbID}
            direction='row'
            alignItems='center'
            borderRadius={8}
            boxShadow='0px 1px 2px rgb(221 221 229 / 0.9),0px 2px 4px rgb(221 221 229 / 0.9),0px 4px 8px rgb(221 221 229 / 0.9),0px 8px 16px rgb(221 221 229 / 0.5)'
            my={2}
            background='white'
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
              <RemoveButton movie={m} setNomination={updateNominations} />
            </Box>
          </Flex>
        )
      })}
    </Stack>
  )
}

export default NominationList
