import Head from 'next/head';
import playListJson from '../mockup-json/playlist.json'
import Playlist from '@components/Playlist';

export default function Home() {

  return (
    <div>
      <Head>
        <title>Spotify Playlist</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='text-center mt-12 text-2xl font-semibold'>Spotify Playlist</h1>
        <div className="grid grid-cols-4 mx-auto gap-y-6 gap-x-6 my-12 w-2/3">
          {playListJson.items.map((item) => (
            <Playlist key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
