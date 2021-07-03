import { EnvironmentFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import GoogleMap from 'google-map-react'
import { useEffect, useState } from 'react'
import { firestore, storage } from '../../config/firebase'
import gmaps from '../../config/gmaps'
import './index.css'

interface Trip {
  id: string
  title: string
  description: string
  images: string[]
  lat: number
  lng: number
}

interface MarkerProps {
  title: string
  lat: number
  lng: number
}

const Marker = ({ title }: MarkerProps) => <Tooltip title={title}>
  <EnvironmentFilled className='map__marker' />
</Tooltip>

const Map = () => {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => firestore.collection('trips').onSnapshot(async snapshot => {
    const data = snapshot.docs.map(async doc => {
      const imageRefs = doc.get('images') as string[]
      const images = await Promise.all(imageRefs.map(image => storage.ref().child(image).getDownloadURL()))
      return {
        id: doc.id,
        title: doc.get('title'),
        description: doc.get('description'),
        lat: doc.get('lat'),
        lng: doc.get('lng'),
        images
      }
    })
    setTrips(await Promise.all(data))
  }), [])

  return <div className='map'>
    <GoogleMap
      googleMapLoader={gmaps}
      defaultCenter={{ lat: 49.2347128, lng: 28.3995946 }}
      defaultZoom={9}
      options={{ fullscreenControl: false, mapTypeId: 'hybrid' }}
    >
      {trips.map(trip => <Marker key={trip.id} lat={trip.lat} lng={trip.lng} title={trip.title} />)}
    </GoogleMap>
  </div>
}

export default Map
