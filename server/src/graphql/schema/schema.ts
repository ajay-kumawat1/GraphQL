export const graphQlSchema = `#graphql

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        isAdmin: Boolean!
    }

    type Course {
        _id: ID!
        title: String!
        description: String!
        instructor: User!
        price: Float!
        rating: Float!
        image: String!
    }

    type SampleUser {
        name: String!
        email: String!
        password: String!
        isAdmin: Boolean!
    }

    type Query {
        users: [User]
        courses: [Course]
        course(_id: ID!): Course
        sampleUsers: [SampleUser] 
    }

    type Mutation {
        newUser(name: String!, email: String!, password: String!, isAdmin: Boolean!): String
    }
`;
