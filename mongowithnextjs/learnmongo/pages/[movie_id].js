import { ObjectId } from 'mongodb'
import Head from 'next/head'
import clientPromise from '../lib/mongodb'
// import clientPromise from '../../lib/mongodb'
// import clientPromise from './../lib/mongodb'

export default function Home({ m, isConnected }) {
    console.log(typeof m, '🍿')
    return (
        <div className="container bg-black text-white min-w-screen min-h-screen">

            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                {/* add tailwindcss */}
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" />
            </Head>

            <main>


                <div key={m._id}>
                    <h1>{m.title}</h1>
                    <p>{m.description}</p>
                    <p>
                        {m.year}
                    </p>
                    <img src={m.image} alt={m.title} />

                </div>

            </main>
        </div>
    )
}

// server side props
export async function getServerSideProps(params) {
    //     // get serve side paths netjs 
    const movieId = params.query.movie_id
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const data = await db.collection('movies').findOne({
        _id: new ObjectId(movieId)
    })
    // solve the array literal error.
    const m = JSON.parse(JSON.stringify(data))
    console.log(Array.isArray(m), 'm is not array');
    console.log(params.query.movie_id)
    return {
        props: {
            m,
            isConnected: true,
            movieId
        }
    }
}



// explain nextjs static site generation
// GENERATE PAGES AHEAD OF TIME, generating pages at build 
