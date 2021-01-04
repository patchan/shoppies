import React from 'react'
import {
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react'
import NominationList from '../components/NominationList'
import ResultList from '../components/ResultList'
import Search from '../components/Search'
import { Movie } from '../types/SearchResult'

const Home: React.FC = () => {
  const [results, setResults] = React.useState([] as Movie[])
  const [nominations, setNominations] = React.useState([] as Movie[])
  const toast = useToast()

  const handleSetNominations = (m: Movie, action: 'add'|'remove') => {
    if (action === 'add') {
      if (nominations.length < 5) {
        if (nominations.length === 4) {
          toast({
            title: "Nominations complete.",
            description: "You have reached the maximum of 5 nominees.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          })
        }
        setNominations([...nominations, m])
      }
    } else {
      setNominations(nominations.filter((mov) => mov.imdbID !== m.imdbID));
    }
  }

  return (
    <VStack alignItems='flex-start' spacing={8}>
      <Heading as='h1'>Shoppies</Heading>
      <NominationList movies={nominations} updateNominations={handleSetNominations} />
      <Search setResults={setResults} />
      {results.length > 0 && <ResultList results={results} updateNominations={handleSetNominations} nominations={nominations} />}
    </VStack>
  )
}

export default Home
