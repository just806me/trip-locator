import { Button, Modal, Form, Input } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import ImagesInput from './images-input'
import LocationInput from './location-input'

interface NewTripModalProps {
  user: firebase.User
}

const NewTripModal = ({ user }: NewTripModalProps) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const submit = async () => {
    setLoading(true)
    const data = form.getFieldsValue()
    const images = data.images.map((file: any) => `${user.uid}/${file.uid}-${file.name}`)
    await firestore.collection('trips').add({ ...data, images, uid: user.uid, createdAt: new Date() })
    setVisible(false)
    setLoading(false)
    form.resetFields()
  }

  return (
    <>
      <Button size='large' icon={<PlusCircleOutlined />} onClick={() => setVisible(true)}>
        Add new trip
      </Button>

      <Modal
        title='Add new trip'
        footer={false}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form layout='vertical' form={form} onFinish={submit}>
          <Form.Item label='Title' name='title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label='Description' name='description' rules={[{ required: true }]}>
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>

          <LocationInput rules={[{ required: true }]} form={form} />

          <ImagesInput label='Images' name='images' rules={[{ required: true }]} user={user} />

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewTripModal
