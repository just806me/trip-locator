import { Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import firebase, { auth } from '../../config/firebase'

const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  await auth.signInWithPopup(provider)
}

const LoginButton = () => (
  <Button size='large' icon={<LoginOutlined />} onClick={signInWithGoogle}>
    Login
  </Button>
)

export default LoginButton
