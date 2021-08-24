import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamAdd from './StreamAdd';
import StreamDelete from './StreamDelete';
import StreamEdit from './StreamEdit';
import StreamList from './StreamList';
import StreamShow from './StreamShow';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter forceRefresh={ true }>
        <div>
          <Header/>
          <Route path="/" exact component={ StreamList }></Route>
          <Route path="/streams/add" component={ StreamAdd }></Route>
          <Route path="/streams/delete/:id" component={ StreamDelete }></Route>
          <Route path="/streams/edit/:id" component={ StreamEdit }></Route>
          <Route path="/streams/show" component={ StreamShow }></Route>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
