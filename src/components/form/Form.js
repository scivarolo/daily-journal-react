import React, { Component } from 'react'

class Form extends Component {

  render() {
    return (
      <section className="form-wrapper">
        <form className="entry-form">
          <fieldset>
            <div className="field-wrapper">
              <label htmlFor="entryTitle">Entry Title</label>
              <input type="text" id="entryTitle" name="entryTitle" required />
            </div>
            <div className="field-wrapper field__entry">
              <label htmlFor="entryContent">Entry Title</label>
              <textarea name="entryContent" id="entryContent" cols="30" rows="10" required />
            </div>
            <div className="field-group field-group__3col">
              <div className="field-wrapper field__date">
                <label htmlFor="entryDate">Entry Date</label>
                <input type="date" id="entryDate" name="entryDate" required/>
              </div>
              <div className="field-wrapper field__concepts">
                <label htmlFor="entryConcepts">Entry Concepts</label>
                <input type="text" id="entryConcepts" name="entryConcepts" required/>
              </div>
              <div className="field-wrapper field__mood">
                <label htmlFor="entryMood">Entry Mood</label>
                <select name="entryMood" id="entryMood" required>
                  {
                    this.props.moods.map(mood => {
                      return (
                        <option value={mood.label} key={`mood-${mood.id}`} id={`mood-${mood.id}`}>{mood.label}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <button className="submit-entry" type="submit">Save Journal Entry</button>
          </fieldset>
        </form>
      </section>
    )
  }

}

export default Form