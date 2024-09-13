import { gql } from "@apollo/client"

export const getUser = gql(`
query Query {
  sampleUsers {
    name
    email
  }
}
`)

export const addUser = gql(`
mutation Mutation($name: String!, $email: String!, $password: String!, $isAdmin: Boolean!) {
  newUser(name: $name, email: $email, password: $password, isAdmin: $isAdmin)
}
`)