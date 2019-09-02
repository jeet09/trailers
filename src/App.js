import React from 'react';
import Layout from './components/Layout/Layout';
import Trailers from './containers/Trailers/Trailers';

import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
          <Trailers />
      </Layout>
    </div>
  );
}

export default App;
