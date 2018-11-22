import React, { Component } from 'react';

class Entry extends Component {

  render() {
    let entry = this.props.entry
    return (
      <article className="entry">
        <header className="entry__header">
          <h2 className="entry__title">{entry.title}</h2>
          <h3 className="entry__date">{entry.date}</h3>
          <div className="entry__concepts">
            {
              entry.concepts.map(concept => {
                return (
                  <span className="concept" key={concept.conceptId}>{concept.concept.label}</span>
                )
              })
            }
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