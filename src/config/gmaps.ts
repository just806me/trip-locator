import { Loader } from '@googlemaps/js-api-loader'

let loader: Loader | undefined
let loadPromise: Promise<any>

const loadGMaps = () => {
  // avoid api to be loaded multiple times
  if (loadPromise)
    return loadPromise

  if (!loader)
    loader = new Loader({ apiKey: 'AIzaSyD1Yk18JOg2vAqv2_R1TxChcZkKgo12jpY' })

  loadPromise = loader.load().then(google => google.maps)
  return loadPromise
}

export default loadGMaps
