import { useState } from 'react'
import { Rule } from 'antd/lib/form'
import { Form, Input, Row, Col, Select } from 'antd'
import { OptionData, OptionGroupData } from 'rc-select/lib/interface'
import pDebounce from 'p-debounce'
import gmaps from '../../config/gmaps'
import { FormInstance } from 'antd/lib/form/Form'

type Option = OptionData | OptionGroupData

interface GeocoderResult {
  results: {
    formatted_address: string
    geometry: { location: { toJSON: () => { lat: number, lng: number } } }
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

  const search = async (value: string) => setSearchResult(await geocode(value))

  const select = (value: string) => form.setFieldsValue(JSON.parse(value))

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
          onSelect={select}
          options={searchResult}
          filterOption={false}
        />
      </Form.Item>
    </Col>
  </Row>
}

export default LocationInput
