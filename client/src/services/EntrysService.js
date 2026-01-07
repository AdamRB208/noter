import { Entry } from "@/models/Entry.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"


class EntrysService {

  async createEntry(formData) {
    formData.notebookId = AppState.activeNotebook.id
    const response = await api.post('api/entries', formData)
    console.log("Created Entry", response.data)
    const createdEntry = new Entry(response.data)
    AppState.entries.push(createdEntry)
  }

  async editEntry(entryId, updateData) {
    const res = await api.put(`api/entries/${entryId}`, updateData)
    const updated = new Entry(res.data)
    const idx = AppState.entries.findIndex(e => e.id === updated.id || e._id === updated._id)
    if (idx >= 0) {
      AppState.entries.splice(idx, 1, updated)
    }
    return updated
  }


}

export const entrysService = new EntrysService()