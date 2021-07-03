import { Rule } from 'antd/lib/form'
import { Button, Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import firebase from 'firebase'
import { storage } from '../../config/firebase'

const handleUpload = (user: firebase.User, options: UploadRequestOption) => {
  if (!(options.file instanceof File)) {
    console.error('received unexpected file', options.file)
    return
  }

  const filename = `${user.uid}/${options.file.uid}-${options.file.name}`
  storage.ref().child(filename).put(options.file).on('state_changed',
    s => options.onProgress?.({ percent: (s.bytesTransferred / s.totalBytes) * 100 } as any),
    e => options.onError?.(e),
    () => options.onSuccess?.(undefined, undefined!)
  )
}

interface ImagesInputProps {
  label: string
  name: string
  rules: Rule[]
  user: firebase.User
}

const ImagesInput = ({ label, name, rules, user }: ImagesInputProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    valuePropName='fileList'
    getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
  >
    <Upload
      accept='image/*'
      multiple
      listType='picture'
      customRequest={options => handleUpload(user, options)}
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  </Form.Item>
)

export default ImagesInput
