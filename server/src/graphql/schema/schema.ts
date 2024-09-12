export const schema = `#graphql

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

    type Query {
        users: [User]
        courses: [Course]
        course(_id: ID!): Course
    }
`;
