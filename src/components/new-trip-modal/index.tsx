import { Button, Modal, Form, Input, Upload } from 'antd'
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { RcFile } from 'antd/lib/upload'
import { storage } from '../../firebase-config'

const handleUpload: (file: RcFile) => Promise<string> = async (file) => {
  const fileRef = storage.ref().child(file.name)
  await fileRef.put(file)
  return await fileRef.getDownloadURL()
}

const NewTripModal = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
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

          <Form.Item
            name='images'
            label='Upload images'
            valuePropName='fileList'
            getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
          >
            <Upload multiple name='images' listType='picture' action={handleUpload} >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

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
