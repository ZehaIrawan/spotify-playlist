import { gql } from 'apollo-server-micro';
import { GraphQLList } from 'graphql';

export const typeDefs = gql`
  type UserPlaylist {
    items: [Playlist]
  }

  type Playlist {
    id: String
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

  type PlayListDetails {
    name: String
    id: String
    added_at: String
    track: Track
  }

  type Track {
    album: Album
    name: String
  }

  type Album {
    name: String
    artists: [Artists]
  }

  type Artists {
    name: String
  }

  type Tracks {
    items: [PlayListDetails]
  }

  type Query {
    getUserPlaylist: UserPlaylist
    getPlaylistItems: Tracks
  }
`;
