import axios from 'axios';

const client_credentials = require('./client_credentials');

let awaitingAuthorization;

const headers = {
  Accept: 'application/json',
  Authorization: '',
};

// const spotifyProxy = async ()  => {
const spotifyProxy = () => {
  if (awaitingAuthorization && !client_credentials.isExpired()) {
    // use existing promise, if not expired
    return awaitingAuthorization;
  }
  if (!awaitingAuthorization || client_credentials.isExpired()) {
    awaitingAuthorization = new Promise((resolve, reject) => {
      client_credentials
        .authenticate()
        .then((token) => {
          headers.Authorization = 'Bearer ' + token.access_token;
          resolve(headers);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return awaitingAuthorization;
};

const haveHeadersWithAuthToken = async () => {
  return await spotifyProxy();
};

export const resolvers = {
  Query: {
    getUserPlaylist: async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/users/thomasfrank09/playlists`,
          {
            headers: await haveHeadersWithAuthToken(),
          },
        );
        return {
          items: response.data.items,
        };
      } catch (error) {
        throw error;
      }
    },

    getPlaylistItems: async (_, { playlistId }) => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: await haveHeadersWithAuthToken(),
          },
        );
        return {
          items: response.data.tracks.items,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
