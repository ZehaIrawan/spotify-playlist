import React from 'react';

import { render, screen } from '@testing-library/react';
import Playlist from '@components/Playlist';

const playListData = {
  collaborative: false,
  description:
    'Pick a task, set a timer, hit play, and get your work done. This is my personal collection of music that I use for focused, deep work.',
  external_urls: {
    spotify: 'https://open.spotify.com/playlist/4ETfiRPHVmUFLF6q0g8Fux',
  },
  href: 'https://api.spotify.com/v1/playlists/4ETfiRPHVmUFLF6q0g8Fux',
  id: '4ETfiRPHVmUFLF6q0g8Fux',
  images: [
    {
      height: null,
      url: 'https://i.scdn.co/image/ab67706c0000bebbc61df3df6bb766dbf3f89d15',
      width: null,
    },
  ],
  name: "Sunday Study - Thomas Frank's Study Music Selections",
  owner: {
    display_name: 'Thomas Frank',
    external_urls: {
      spotify: 'https://open.spotify.com/user/thomasfrank09',
    },
    href: 'https://api.spotify.com/v1/users/thomasfrank09',
    id: 'thomasfrank09',
    type: 'user',
    uri: 'spotify:user:thomasfrank09',
  },
  primary_color: null,
  public: true,
  snapshot_id: 'MzEyLDMwZDFmMGRmMzkwYjA4N2NmOTk4Mzg1MGVjMjhkNTRmOWFiMjIwYTM=',
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/4ETfiRPHVmUFLF6q0g8Fux/tracks',
    total: 200,
  },
  type: 'playlist',
  uri: 'spotify:playlist:4ETfiRPHVmUFLF6q0g8Fux',
};

describe('Playlist', () => {
  it('should render Playlist title', () => {
    render(<Playlist item={playListData} />);

    const heading = screen.getByText(
      /Sunday Study - Thomas Frank's Study Music Selections/i,
    );
    expect(heading).toBeInTheDocument();
  });
});

describe('Playlist', () => {
  it('should render Playlist image and alt', () => {
    render(<Playlist item={playListData} />);

  const playListImage = screen.getByRole('img');
  expect(playListImage).toHaveAttribute(
    'src',
    'https://i.scdn.co/image/ab67706c0000bebbc61df3df6bb766dbf3f89d15',
  );
  expect(playListImage).toHaveAttribute('alt', "Sunday Study - Thomas Frank's Study Music Selections");
  });
});
