/* Filters posts by mood */

import DataManager from "./Data"

export default (e) => {
  let mood = e.target.value
  if (mood === "All") {
    return DataManager.getEntries()
  } else {
    return DataManager.getEntries()
    .then(entries => entries.filter(entry => entry.mood.label.toLowerCase() === mood.toLowerCase()))
  }
}