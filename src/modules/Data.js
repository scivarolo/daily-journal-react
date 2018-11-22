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

}

export default new DataManager(baseURL)