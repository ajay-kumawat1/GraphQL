import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URL,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
