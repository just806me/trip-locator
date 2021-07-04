import { useState } from 'react'
import { Rule } from 'antd/lib/form'
import { Form, Input, Row, Col, Select } from 'antd'
import { OptionData, OptionGroupData } from 'rc-select/lib/interface'
import pDebounce from 'p-debounce'
import gmaps from '../../config/gmaps'
import { FormInstance } from 'antd/lib/form/Form'
import Map, { MarkerProps } from '../map'

type Option = OptionData | OptionGroupData

interface LatLng {
  lat: number
  lng: number
}

interface GeocoderResult {
  results: {
    formatted_address: string
    geometry: { location: { toJSON: () => LatLng } }
  }[]
}

interface LocationInputProps {
  rules: Rule[]
  form: FormInstance
}

const geocode: (value: string) => Promise<Option[]> = pDebounce(
  async (value) => {
    try {
      const maps = await gmaps()
      const geocoder = new maps.Geocoder()
      const response = await geocoder.geocode({ address: value }) as GeocoderResult
      return response.results.map(r => ({
        label: r.formatted_address,
        value: JSON.stringify(r.geometry.location.toJSON()),
      }))
    } catch (e) {
      console.error(e)
      return []
    }
  },
  250
)

const LocationInput = ({ rules, form }: LocationInputProps) => {
  const [searchResult, setSearchResult] = useState<Option[]>([])
  const [markers, setMarkers] = useState<MarkerProps[]>([])

  const search = async (value: string) => setSearchResult(await geocode(value))

  const select = (value: LatLng) => {
    form.setFieldsValue(value)
    setMarkers([{ ...value, key: '0', title: 'Selected location' }])
  }

  return <Row gutter={16}>
    <Col span={12}>
      <Form.Item rules={rules} label='Latitude' name='lat'>
        <Input type='number' readOnly />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item rules={rules} label='Longitude' name='lng'>
        <Input type='number' readOnly />
      </Form.Item>
    </Col>

    <Col span={24}>
      <Form.Item label='Location'>
        <Select
          showSearch
          onSearch={search}
          onSelect={(value: string) => select(JSON.parse(value))}
          options={searchResult}
          filterOption={false}
        />
      </Form.Item>
    </Col>

    <Col span={24} style={{ height: '200px' }}>
      <Map
        markers={markers}
        center={markers[0]}
        zoom={markers.length && 13}
        onClick={select}
      />
    </Col>
  </Row>
}

export default LocationInput
