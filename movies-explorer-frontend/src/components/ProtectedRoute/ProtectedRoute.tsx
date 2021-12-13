import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<any> = ({ component: Component, loggedIn: loggedIn, ...props}) => {
  if (loggedIn) {
    return <Component {...props}/>
  }
  return <Navigate to="/" />
}

export default ProtectedRoute
