import React, { Component } from 'react';

class Entry extends Component {

  state = {
    concepts: []
  }

  componentDidMount() {
    // TODO: Get concepts from database and save in state
  }

  render() {
    let entry = this.props.entry
    return (
      <article className="entry">
        <header className="entry__header">
          <h2 className="entry__title">{entry.title}</h2>
          <h3 className="entry__date">{entry.date}</h3>
          <div className="entry__concepts">
            <span className="concept">Fetch Concepts</span>
          </div>
        </header>
        <div className="entry__content">
          <p>{entry.content}</p>
        </div>
        <footer className="entry__footer">
          <div className="entry__mood">Mood: {entry.mood.label}</div>
        </footer>
      </article>
    )
  }
}

export default Entry