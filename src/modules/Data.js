/*
  Purpose: Interact with the API
  Contains an API object with methods for interacting with the API
*/

const baseURL = "http://localhost:5002"

class DataManager {
  constructor(baseURL) {
    this.urls = {
      base: baseURL,
      entries: `${baseURL}/entries?_expand=mood`,
      moods: `${baseURL}/moods`,
      entryConcepts: `${baseURL}/entry_concepts`,
      concepts: `${baseURL}/concepts`
    }
  }

  getEntries() {
    return fetch(this.urls.entries)
      .then(response => response.json())
      .then(entries => {
        let conceptPromises = []
        // set up Promises to get concepts for each entry
        entries.forEach(entry => {
          conceptPromises.push(
            this.getEntryConcepts(entry.id)
            .then(concepts => {
              entry.concepts = concepts
              return entry
            })
          )
        })
        return Promise.all(conceptPromises)
      })
  }

  saveData(entry, resource) {
    let url = this.urls.entries
    if(resource) { url = `${this.urls.base}/${resource}`}
    return fetch(url, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
    .then(response => response.json())
  }

  postThenGet(entry) {
    return this.saveData(entry)
      .then(() => this.getEntries())
  }

  getLatestEntry() {
    let latestUrl = `${this.urls.base}/entries?_sort=id&_order=desc&_limit=1`
    return fetch(latestUrl)
      .then(response => response.json())
  }

  getMoods() {
    return fetch(this.urls.moods)
      .then(response => response.json())
  }

  getEntryConcepts(entryId) {
    let url = `${this.urls.entryConcepts}/?entryId=${entryId}&_expand=concept`
    return fetch(url)
    .then(response => response.json())
  }

  getConcepts(entryId) {
    let url = this.urls.concepts
    if(entryId) {
      url = `${this.urls.concepts}/?entryId=${entryId}`
    }
    return fetch(url)
    .then(response => response.json())
  }

  saveConcepts(conceptsArray, entryId) {
    this.getConcepts()
    .then(dbConcepts => {
      conceptsArray.forEach(concept => {
        //check if concept already exists
        let existingConcept = dbConcepts.find(dbConcept => concept.toLowerCase() === dbConcept.label.toLowerCase())
        //if exists, only create an entry_concepts entry
        if(existingConcept) {
          let entry_conceptsObj = {
            entryId: entryId,
            conceptId: existingConcept.id
          }
          return this.saveData(entry_conceptsObj, "entry_concepts")
        } else {
          // if not, create an entry in concepts then create a new entry in entry_concepts
          let object = {
            label: concept
          }
          this.saveData(object, "concepts")
          .then(newConcept => {
            let entry_conceptsObj = {
              entryId: entryId,
              conceptId: newConcept.id
            }
            return this.saveData(entry_conceptsObj, "entry_concepts")
          })
        }
      })
    })
  }

}

export default new DataManager(baseURL)