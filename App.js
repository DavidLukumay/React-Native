import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import React from 'react';
import Main from './components/MainComponent';
<script src="http://192.168.42.26:8097"></script>

const store = ConfigureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}