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


}

export const entrysService = new EntrysService()