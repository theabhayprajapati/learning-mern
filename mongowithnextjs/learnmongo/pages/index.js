import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export default function Home({ movies, isConnected }) {
  console.log(movies.length, '🍿')
  return (
    <div className="text-white bg-black ">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        {/* add tailwindcss */}
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" />
      </Head>

      <main>

        <div>
          {
            movies && movies.map(m => (
              <div key={m._id}>
                <p>
                  {m._id}
                </p>
                <h1>{m.title}</h1>
                <p>{m.description}</p>
                <p>
                  {m.year}
                </p>
                <img src={m.image} alt={m.title} />

              </div>
            ))
          }
        </div>
      </main>
    </div>
  )
}

// server side props
export async function getServerSideProps() {

  const client = await clientPromise
  const db = client.db('sample_mflix')
  const data = await db.collection('movies').find({
    year: 1990
  }).limit(20).toArray()
  // solve the array literal error.
  const movies = JSON.parse(JSON.stringify(data))
  console.log(movies);
  return {
    props: {
      movies,
      isConnected: true
    }
  }
}