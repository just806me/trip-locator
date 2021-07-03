import { Button, Modal, Form, Input, Upload } from 'antd'
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { storage } from '../../firebase-config'
import firebase from 'firebase'

const handleUpload = (addRef: (ref: firebase.storage.Reference) => void, options: UploadRequestOption) => {
  if (!(options.file instanceof Blob)) {
    console.error('received unexpected file', options.file)
    return
  }

  const fileRef = storage.ref().child(`${new Date().getTime()}-${options.filename}`)

  fileRef.put(options.file).on('state_changed',
    snapshot => options.onProgress?.({ percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 } as any),
    error => options.onError?.(error),
    () => {
      options.onSuccess?.(undefined, undefined!)
      addRef(fileRef)
    }
  )
}

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

          <Form.Item
            label='Images'
            valuePropName='fileList'
            getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
            rules={[{ required: true }]}
          >
            <Upload
              multiple
              listType='picture'
              customRequest={options => handleUpload(ref => setImages([...images, ref]), options)}
            >
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
