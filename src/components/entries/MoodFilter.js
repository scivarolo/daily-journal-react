import React, { Component } from 'react';

class MoodFilter extends Component {

  render() {
    const moods = this.props.moods

    return (


      <section id="mood-filter" className="mood-filter">
        <fieldset>
          <legend>Filter Posts by Mood</legend>
          <div className="radio-group">
            {
              moods.map(mood => {
                return (
                  <div className="radio-wrapper" key={mood.id}>
                    <input type="radio" name="moodFilter" value={mood.label} onClick={e => this.props.filterEntries(e)} />
                    <label htmlFor={`moodFilter-${mood.label}`} >{mood.label}</label>
                  </div>
                )
              })
            }
            <div className="radio-wrapper" key="999">
              <input type="radio" name="moodFilter" value="All" onClick={e => this.props.filterEntries(e)} />
              <label htmlFor="moodFilter-All">All</label>
            </div>
          </div>
        </fieldset>
      </section>
    )
  }

}

export default MoodFilter