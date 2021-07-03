import { Button, Modal, Form, Input } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import firebase from 'firebase'
import ImagesInput from './images-input'

const NewTripModal = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<firebase.storage.Reference[]>([])
  const [form] = Form.useForm()

  const submit = () => {
    setLoading(true)
    setTimeout(() => {
      setVisible(false)
      setLoading(false)
      form.resetFields()
    }, 2000)
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
            <Input.TextArea />
          </Form.Item>

          <ImagesInput label='Images' rules={[{ required: true }]} onUpload={i => setImages([...images, i])} />

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
