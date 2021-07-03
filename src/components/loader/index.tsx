import { Spin } from 'antd'
import './index.css'

interface LoaderProps {
  visible: boolean
}

const Loader = ({ visible }: LoaderProps) => visible ? <Spin size='large' className='loader' /> : null

export default Loader
