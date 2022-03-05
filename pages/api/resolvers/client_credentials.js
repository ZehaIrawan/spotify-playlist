
const fetch = require('node-fetch');


const authorizationHeader = () =>
  'Basic ' +
  new Buffer(process.env.NEXT_PUBLIC_CLIENT_ID + ':' +process.env.NEXT_PUBLIC_CLIENT_SECRET).toString(
    'base64',
  );

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
};

//
let expireTime = 0;

module.exports = {
  isExpired: () => {
    if (expireTime) {
      return Date.now() > expireTime;
    }
    return false;
  },
  authenticate: () => {
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: authorizationHeader(),
      },
      method: 'POST',
      body: 'grant_type=client_credentials',
    };

    return fetch(authOptions.url, options)
      .then((response) => {
        return response.json();
      })
      .then((token) => {
        const time = Date.now();
        const expires_in = Number.parseInt(token.expires_in, 10);

        expireTime = time + expires_in * 1000; //

        return token;
      });
  },
};
