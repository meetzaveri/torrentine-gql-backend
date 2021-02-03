const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const { getData, postData } = require('./helpers');

const typeDefs = gql`
  type Movie {
    _id: String!
    imdb_id: String!
    title: String!
    year: Int!
  }

  type Query {
    getMovie(imdb_id: String!): Movie
    movies(): [Movie]
  }
 
`;

// replace with actual REST endpoint
const restAPIEndpoint = 'https://movies-v2.api-fetch.sh';

const resolvers = {
  Query: {
    getMovie: async (_, { imdb_id }) => {
      return await getData(restAPIEndpoint + '/movie/' + imdb_id);
    },

    movies: async (_, { name }) => {
      var nameParams = '';
      if (name) {
        nameParams = '?name=' + name;
      }
      return await getData(restAPIEndpoint + '/movies' + nameParams);
    },
  },
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
