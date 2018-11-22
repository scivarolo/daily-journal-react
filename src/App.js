import React, { Component } from 'react';
import DataManager from './modules/Data'
class App extends Component {

  state = {}

  componentDidMount() {
    // get some data
  }

  render() {
    return (
      <section className="app-wrapper">
        <h1 className="site-title">Daily Journal</h1>

        <section className="grid-wrapper">
          <div className="left-column">
            <div className="sticky-wrapper">
              <section className="form-wrapper"></section>
              <section id="mood-filter" className="mood-filter"></section>
            </div>
          </div>
          <section id="entries" className="entries-wrapper"></section>
        </section>
      </section>
    );
  }
}

export default App
