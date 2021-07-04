import { EnvironmentFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import cln from 'classnames'
import GoogleMap from 'google-map-react'
import gmaps from '../../config/gmaps'
import './index.css'

interface MarkerProps {
  key: string
  title: string
  lat: number
  lng: number
}

interface MapProps {
  fullscreen?: boolean
  markers?: MarkerProps[]
}

const Marker = ({ title }: MarkerProps) => <Tooltip title={title}>
  <EnvironmentFilled className='map__marker' />
</Tooltip>

const Map = ({ fullscreen, markers }: MapProps) => (
  <div className={cln({ 'map--fullscreen': fullscreen })}>
    <GoogleMap
      googleMapLoader={gmaps}
      defaultCenter={{ lat: 49.2347128, lng: 28.3995946 }}
      defaultZoom={9}
      options={{ fullscreenControl: false, mapTypeId: 'hybrid' }}
    >
      {markers?.map(props => <Marker {...props} />)}
    </GoogleMap>
  </div>
)

export default Map
