import { ObjectId } from "mongodb"
import clientPromise from "../../lib/mongodb"



export default async function handler(req, res, next) {
    const query = req.query.moviedetails
    console.log(query, 'queryid')
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const data = await db.collection('movies').findOne({
        _id: new ObjectId(query)
    })
    res.json({
        data
    })
}