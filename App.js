import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import React from 'react';
import Main from './components/MainComponent';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent';
<script src="http://192.168.42.26:8097"></script>

const { persistor,store } = ConfigureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate 
            loading={<Loading />}
            persistor={persistor}
          >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}