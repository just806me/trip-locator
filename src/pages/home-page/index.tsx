import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import Map from '../../components/map'
import Loader from '../../components/loader'
import LoginButton from '../../components/login-button'
import NewTripModal from '../../components/new-trip-modal'
import './index.css'

const HomePage = () => {
  const [user, firebaseLoading] = useAuthState(auth)

  return <>
    <div className='home-page'>
      <Map />

      <div className='home-page__button'>
        {user ? <NewTripModal user={user} /> : <LoginButton />}
      </div>
    </div>

    <Loader visible={firebaseLoading} />
  </>
}

export default HomePage
