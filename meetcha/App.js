import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './store/places-reducer';
import PlacesNavigator from './navigation/PlacesNavigator';


const store = createStore(Reducer, composeWithDevTools());

export default function App() {
  return (
        <Provider store={store}>
           <PlacesNavigator/>
        </Provider>
  )
};

