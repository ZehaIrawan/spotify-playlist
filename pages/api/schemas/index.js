import { gql } from 'apollo-server-micro';
import { GraphQLList,} from 'graphql';

export const typeDefs = gql`
  type UserPlaylist {
    items: [Playlist]
  }

  type Playlist {
    id:String
    name: String
    images: [Images]
    external_urls: ExternalUrls
  }

  type Images {
    url: String
  }

  type ExternalUrls {
    spotify: String
  }

  type Query {
    getUserPlaylist: UserPlaylist
  }
`;
