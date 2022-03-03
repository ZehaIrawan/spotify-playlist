import React from 'react'

const Playlist = ({item}) => {
  return (
    <a
      href={item.external_urls.spotify}
      key={item.id}
      target="_blank"
      rel="noreferrer"
      className="rounded-lg border"
    >
      <div className="px-4 py-2 truncate">{item.name}</div>
      <img src={item.images[0].url} alt={item.name} />
    </a>
  );
}

export default Playlist