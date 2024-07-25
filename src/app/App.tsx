import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


import JokeSearch from '../searchJokes/JokeSearch'
import './App.css'

const queryClient = new QueryClient()

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <JokeSearch/>
    </QueryClientProvider>
    </>
  )
}

export default App
