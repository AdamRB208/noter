import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Notebook } from "@/models/Notebook.js"
import { Entry } from "@/models/Entry.js"

class NotebookService {

  async getNotebookEntries(notebookId) {
    const response = await api.get(`api/notebooks/${notebookId}/entries`)
    logger.log('Got Notebook Entries', response.data)
    const notebookEntries = response.data.map(pojo => new Entry(pojo))
    AppState.entries = notebookEntries
  }

  async getNotebooks() {
    const response = await api.get('api/notebooks')
    logger.log('Got Notebooks!', response.data)
    const notebook = response.data.map(pojo => new Notebook(pojo))
    AppState.notebooks = notebook
  }

  async getNotebookById(notebookId) {
    const response = await api.get(`api/notebooks/${notebookId}`)
    logger.log('Got Notebook by Id!', response.data)
    const notebook = new Notebook(response.data)
    AppState.activeNotebook = notebook
  }

  async createNotebook(notebookData) {
    const response = await api.post('api/notebooks', notebookData)
    logger.log('Created Notebook!', response.data)
    const notebook = new Notebook(response.data)
    AppState.notebooks.unshift(notebook)
    return notebook
  }

  async deleteNotebook(notebookId) {
    logger.log('Attempting delete with notebookId:', notebookId)
    const response = await api.delete(`api/notebooks/${notebookId}`)
    logger.log('Delete response', response)
    logger.log('Deleted Notebook', response.data)
    const notebook = AppState.notebooks
    const notebookIndex = notebook.findIndex(notebook => notebook.id == notebookId)
    notebook.splice(notebookIndex, 1)
    if (AppState.activeNotebook?.id === notebookId) {
      AppState.activeNotebook = null
    }
  }
}

export const notebookService = new NotebookService()