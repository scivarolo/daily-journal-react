import React, { Component } from 'react';
import DataManager from './modules/Data'
import Form from './components/form/Form'
import EntriesList from "./components/entries/EntriesList";

class App extends Component {

  state = {
    entries: [],
    moods: []
  }

  componentDidMount() {
    // get some data
    let newState = {}

    DataManager.getEntries()
    .then(entries => {
      let conceptPromises = []
      // set up Promises to get concepts for each entry
      entries.forEach(entry => {
        conceptPromises.push(
          DataManager.getEntryConcepts(entry.id)
          .then(concepts => {
            entry.concepts = concepts
            return entry
          })
        )
      })
      return Promise.all(conceptPromises)
    })
    .then(entries => newState.entries = entries)
    .then(() => this.setState(newState))

    DataManager.getMoods()
    .then(moods => {
      this.setState({moods: moods})
    })
  }

  render() {
    return (
      <section className="app-wrapper">
        <h1 className="site-title">Daily Journal</h1>

        <section className="grid-wrapper">
          <div className="left-column">
            <div className="sticky-wrapper">
              <Form moods={this.state.moods} />
              <section id="mood-filter" className="mood-filter"></section>
            </div>
          </div>
          <EntriesList entries={this.state.entries} />
        </section>
      </section>
    );
  }
}

export default App
