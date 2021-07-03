import GoogleMap from 'google-map-react'
import './index.css'

const Map = () => (
  <div className='map'>
    <GoogleMap
      bootstrapURLKeys={{ key: 'AIzaSyCL6mCM50FVzVM_cbXJWwLhrYxsGlFweVw' }}
      defaultCenter={{ lat: 49.2347128, lng: 28.3995946 }}
      defaultZoom={9}
      options={{ fullscreenControl: false, mapTypeId: 'hybrid' }}
    />
  </div>
)

export default Map
