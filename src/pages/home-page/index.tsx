import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import Loader from '../../components/loader'
import LoginButton from '../../components/login-button'
import Map from '../../components/map'
import NewTripModal from '../../components/new-trip-modal'
import { auth, firestore, storage } from '../../config/firebase'
import Trip from '../../models/trip'
import './index.css'

const HomePage = () => {
  const [user, firebaseLoading] = useAuthState(auth)
  const [trips, setTrips] = useState<Trip[]>([])
  const history = useHistory()

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

  const showTrip = (_: any, trip: Trip) => history.push(`/trips/${trip.id}`)

  return <>
    <div className='home-page'>
      <Map fullscreen markers={trips.map(t => ({ ...t, key: t.id }))} onChildClick={showTrip} />

      <div className='home-page__button'>
        {user ? <NewTripModal user={user} /> : <LoginButton />}
      </div>
    </div>

    <Loader visible={firebaseLoading} />
  </>
}

export default HomePage
