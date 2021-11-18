
import {
  ApolloClient, ApolloProvider, InMemoryCache,
  createHttpLink
} from '@apollo/client';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './util/PrivateRoute'
import { setContext } from "@apollo/client/link/context"
import SinglePost from './components/SinglePost'

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return{
      headers: {
          Authorization: token ? `Bear ${token}` : ""
      }
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={
            <Home />
          } />
          <Route path='login' element={<Login />} />
          <Route
            path="register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route path='post/:postId' element={<SinglePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
