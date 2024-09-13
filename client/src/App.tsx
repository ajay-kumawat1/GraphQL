import './App.css'
import { getUser } from './graphql/query/query'
import { gql, useQuery } from '@apollo/client'

function App() {
  const { data, loading, error } = useQuery(gql(getUser))
  if(error) return <h1>Error</h1>
  console.log(data);
  
  return loading ? <h1>Loading...</h1> : (
    <>
      <h1>User retrived successfully</h1>
      <h3>{data.users[0].name}</h3>
    </>
  )
}

export default App
