import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import moment from 'moment';


const PlaylistPage = ({ playlist }) => {
  const router = useRouter();
  const { playlistId } = router.query;

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }


  return (
      <table className="table-auto">
        <thead>
          <tr className='text-left'>
            <th>#</th>
            <th>TITLE</th>
            <th>ALBUM</th>
            <th>DATE ADDED</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>


          {playlist &&
            playlist.items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td className="flex flex-col">
                    <p>{item.track.name}</p>
                    <p>{item.track.album.artists[0].name}</p>
                  </td>

                  <td> {item.track.album.name}</td>

                  <td>{moment(item.added_at).format("MMM D, YYYY")}</td>

                  <td>{millisToMinutesAndSeconds(item.track.duration_ms)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
  );
};

export default PlaylistPage;

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql/',
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        getPlaylistItems(playlistId: "${context.query.playlistId}") {
          items {
            added_at
            track {
              name
              duration_ms
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
    `
  });

  return {
    props: {
      playlist: data.getPlaylistItems,
    },
  };
}
