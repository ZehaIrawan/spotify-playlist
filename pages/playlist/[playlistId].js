import React from 'react';
import { useRouter } from 'next/router';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const PlaylistPage = ({playlist}) => {

const router = useRouter();
const { playlistId } = router.query;


// console.log(playlist.items[0]);

return (
    <div>

    { playlist && playlist.items.map((item,index) => {
      return (
        <div key={index}>
          {/* Track name:  */}
          <p>{item.track.name}</p>
          {/* Album name: */}
          <p> {item.track.album.name}</p>
          {/* <p>Artist name: {item.track.album.artists[0].name}</p> */}
          <hr />
        </div>
      );
    })}
    </div>
  );
};

export default PlaylistPage;

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql/',
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        getPlaylistItems {
          items {
            added_at
            track {
              name
              album {
                name
                artists {
                  name
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      playlist: data.getPlaylistItems,
    },
  };
}