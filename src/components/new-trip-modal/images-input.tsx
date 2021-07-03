import { Rule } from 'antd/lib/form'
import { Button, Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import firebase from 'firebase'
import { storage } from '../../config/firebase'

const handleUpload = (callback: (ref: firebase.storage.Reference) => void, options: UploadRequestOption) => {
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
      callback(fileRef)
    }
  )
}

interface ImagesInputProps {
  label: string
  rules: Rule[]
  onUpload: (ref: firebase.storage.Reference) => void
}

const ImagesInput = ({ label, rules, onUpload }: ImagesInputProps) => (
  <Form.Item
    label={label}
    rules={rules}
    valuePropName='fileList'
    getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
  >
    <Upload
      multiple
      listType='picture'
      customRequest={options => handleUpload(onUpload, options)}
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  </Form.Item>
)

export default ImagesInput
