import React from 'react';
import { useRouter } from 'next/router';

const PlaylistPage = () => {

const router = useRouter();
const { playlistId } = router.query;


return (
    <div>

    {playlistId && <h1>{playlistId}</h1>}
    </div>
  );
};

export default PlaylistPage;
