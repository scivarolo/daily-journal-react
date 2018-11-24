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
    return this.getConcepts()
    .then(dbConcepts => {
      // Set up an array for promises
      let promises = []
      conceptsArray.forEach(concept => {
        //check if concept already exists
        let existingConcept = dbConcepts.find(dbConcept => concept.toLowerCase() === dbConcept.label.toLowerCase())
        //if exists, only create an entry_concepts entry
        if(existingConcept) {
          let entry_conceptsObj = {
            entryId: entryId,
            conceptId: existingConcept.id
          }
          //save the promise
          promises.push(this.saveData(entry_conceptsObj, "entry_concepts"))
        } else {
          // if not, create an entry in concepts then create a new entry in entry_concepts
          let object = {
            label: concept
          }
          promises.push(this.saveData(object, "concepts")
          .then(newConcept => {
            let entry_conceptsObj = {
              entryId: entryId,
              conceptId: newConcept.id
            }
            //save the promise
            return this.saveData(entry_conceptsObj, "entry_concepts")
          }))
        }
      })
      // save all of the concepts from the new entry
      return Promise.all(promises)
    })
  }

}

export default new DataManager(baseURL)