import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import StreamAdd from './StreamAdd';
import StreamDelete from './StreamDelete';
import StreamEdit from './StreamEdit';
import StreamList from './StreamList';
import StreamShow from './StreamShow';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <Router history={ history }>
        <div>
          <Header/>
            <Switch>
              <Route path="/" exact component={ StreamList }></Route>
              <Route path="/streams/add" component={ StreamAdd }></Route>
              <Route path="/streams/delete/:id" component={ StreamDelete }></Route>
              <Route path="/streams/edit/:id" component={ StreamEdit }></Route>
              <Route path="/streams/:id" component={ StreamShow }></Route>
            </Switch>
       </div>
      </Router>
    </div>
  );
}

export default App;
