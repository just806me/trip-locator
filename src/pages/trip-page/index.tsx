import { Image, Carousel } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader'
import { firestore, storage } from '../../config/firebase'
import Trip from '../../models/trip'
import './index.css'

const TripPage = () => {
  const { id } = useParams<{ id: string }>()
  const [trip, setTrip] = useState<Trip>()

  useEffect(() => {
    (async function () {
      const doc = await firestore.collection('trips').doc(id).get()
      const imageRefs = doc.get('images') as string[]
      const images = await Promise.all(imageRefs.map(image => storage.ref().child(image).getDownloadURL()))
      setTrip({
        title: doc.get('title'),
        description: doc.get('description'),
        lat: doc.get('lat'),
        lng: doc.get('lng'),
        id,
        images
      })
    })()
  }, [id])

  if (!trip)
    return <Loader visible />

  console.log(trip)

  return <div className='trip-page'>
    <h1>{trip.title}</h1>

    <p>{trip.description}</p>

    <Carousel arrows>
      {trip.images?.map((image, index) => <Image className='trip-page__image' key={index} src={image} />)}
    </Carousel>
  </div>
}

export default TripPage
