import React, { Component } from 'react'
import Entry from './Entry'

class EntriesList extends Component {

  render() {
    return (
      <section id="entries" className="entries-wrapper">
        {
          this.props.entries.map(entry => {
            return (
              <Entry entry={entry} key={entry.id} />
            )
          })
        }
      </section>
    )
  }

}

export default EntriesList