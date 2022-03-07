import Link from 'next/link';
import React from 'react'

const Playlist = ({item}) => {

  const playlistId = item.external_urls.spotify.split('/playlist/')[1]


  return (
    <Link
      href={`/playlist/${playlistId}`}
      key={item.id}
      target="_blank"
      rel="noreferrer"
      passHref={true}
    >
      <div className="rounded-lg border hover:cursor-pointer">
        <div className="px-4 py-2 truncate">{item.name}</div>
        <img src={item.images[0].url} alt={item.name} />
      </div>
    </Link>
  );
}

export default Playlist