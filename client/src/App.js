import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { routes } from './config/routes';
import './styles/styles.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ height: '100%' }} >
          <Switch>
            {
              routes.map((route, index) => (
                <RouterWithSubRoutes 
                  key={ index }
                  { ...route }
                />
              ))
            }
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

const RouterWithSubRoutes = (route) => {
  return (
    <Route 
      path={ route.path }
      exact={ route.exact }
      render={ props => <route.component routes={ route.routes } { ...props } /> }
    />
  );
}

export default App;
