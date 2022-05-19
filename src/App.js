import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { getUser } from './services/userAPI';

class App extends React.Component {
  state = {
    userInfo: {
      name: '',
    },
    loading: false,
  }

  handleUser = () => {
    console.log('done');
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, userInfo: user });
    });
  }

  render() {
    const { userInfo, loading } = this.state;
    return (
      <section>
        <Router>
          <Switch>
            <Route
              path="/search"
              render={ (props) => (<Search
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route
              path="/album/:id"
              render={ (props) => (<Album
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route
              path="/favorites"
              render={ (props) => (<Favorites
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route
              path="/profile"
              render={ (props) => (<Profile
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route
              path="/profile/edit"
              render={ (props) => (<ProfileEdit
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route exact path="/" component={ Login } />
            <Route path="" component={ NotFound } />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
