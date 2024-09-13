import { ApolloServer } from "@apollo/server";
import { graphQlSchema } from "./schema/schema.js";
import { GraphQlResolver } from "./resolver/resolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";

export const connectGraphQL = (port: number, envMode: string) => {
  const server = new ApolloServer({
    typeDefs: graphQlSchema,
    resolvers: GraphQlResolver,
  });

  startStandaloneServer(server, {
    listen: {
      port,
    },
  })
    .then(() => {
      console.log(`Server is working on Port: ${port} in ${envMode} Mode.`);
    })
    .catch((error) => {
      console.error(error);
    });
};
