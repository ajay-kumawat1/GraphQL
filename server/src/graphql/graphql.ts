import { ApolloServer } from "@apollo/server";
import { graphQlSchema } from "./schema/schema.js";
import { GraphQlResolver } from "./resolver/resolver.js";

export const connectGraphQL = () => {
  const server = new ApolloServer({
    typeDefs: graphQlSchema,
    resolvers: GraphQlResolver,
  });

  return server;
};
