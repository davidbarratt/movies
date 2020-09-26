import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { IntlProvider } from '@wikimedia/react.i18n';
import useReactor from '@cinematix/reactor';
import { mergeMap, map } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import AppContext from './context/app';
import Index from './pages/index';
import NotFound from './pages/not-found';
import en from '../i18n/en.json';

const initialState = {
  config: {},
};

const CONFIG_SET = 'CONFIG_SET';

function reducer(state, action) {
  switch (action.type) {
    case CONFIG_SET:
      return {
        ...state,
        config: action.payload,
      };
    default:
      throw new Error('Unknown Action');
  }
}

function reactor(value$) {
  return value$.pipe(
    mergeMap(() => (
      // @TODO Handle Request failures.
      fromFetch('/api/configuration').pipe(
        mergeMap((response) => response.json()),
        map((data) => ({
          type: CONFIG_SET,
          payload: data,
        })),
      )
    )),
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useReactor(reactor, dispatch, []);

  // @TODO support more languages.
  const messages = {
    en,
  };

  return (
    <IntlProvider messages={messages} locale="en">
      <AppContext.Provider value={[state, dispatch]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </IntlProvider>
  );
}

export default App;
