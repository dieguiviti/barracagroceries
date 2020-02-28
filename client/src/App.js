import React, { Component } from 'react';
// STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// COMPONENTS
import AppNavbar from './components/AppNavbar';
import List from './components/List';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap';
// React-redux provider
import { Provider } from 'react-redux';
import store from './store';
// import load user action
import { LOAD_USER } from './actions/authActions';

class App extends Component {
  componentDidMount(){
    store.dispatch(LOAD_USER());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            <List/>
            <ItemModal/>
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App;
