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

class App extends Component {
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
