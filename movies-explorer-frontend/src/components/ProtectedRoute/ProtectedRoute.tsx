import { Navigate } from 'react-router-dom'

interface Props {
  component: React.ComponentType,
  loggedIn: boolean
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...props }) => {
  if (props.loggedIn) {
    return <Component {...props} />
  }
  return <Navigate to="/" />
}

export default ProtectedRoute
