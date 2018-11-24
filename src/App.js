import React, { Component } from 'react';
import DataManager from './modules/Data'
import Form from './components/form/Form'
import MoodFilter from './components/entries/MoodFilter'
import EntriesList from "./components/entries/EntriesList"
import Filter from "./modules/Filter"
import SubmitEntry from './modules/Submit';
class App extends Component {

  state = {
    entries: [],
    moods: []
  }

  componentDidMount() {
    // get some data
    let newState = {}

    DataManager.getEntries()
    .then(entries => newState.entries = entries)
    .then(() => this.setState(newState))

    DataManager.getMoods()
    .then(moods => {
      this.setState({moods: moods})
    })
  }

  filterEntries = (e) => {
    return Filter(e)
    .then(entries => this.setState({entries: entries}))
  }

  handleSubmit = (e) => {
    return SubmitEntry(e)
    .then(entries => this.setState({entries: entries}))
  }

  render() {
    return (
      <section className="app-wrapper">
        <h1 className="site-title">Daily Journal</h1>

        <section className="grid-wrapper">
          <div className="left-column">
            <div className="sticky-wrapper">
              <Form moods={this.state.moods} handleSubmit={this.handleSubmit}/>
              <MoodFilter moods={this.state.moods} filterEntries={this.filterEntries} />
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
