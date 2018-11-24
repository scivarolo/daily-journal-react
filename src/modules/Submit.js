import DataManager from "./Data"

const SubmitEntry = (e) => {
  const form = e.target
    e.preventDefault()

    if(!form.checkValidity()) {
      alert("There are some empty fields")
      return
    }
    const data = new FormData(form)

    let entryObj = {
      title: data.get("entryTitle"),
      content: data.get("entryContent"),
      date: data.get("entryDate"),
      moodId: data.get("entryMood")
    }

    let concepts = data.get("entryConcepts").split(", ")

    return DataManager.saveData(entryObj)
    .then(() => {
      form.reset()
      return DataManager.getLatestEntry()
    })
    .then(entry => DataManager.saveConcepts(concepts, entry[0].id))
    .then(() => DataManager.getEntries())

}

export default SubmitEntry