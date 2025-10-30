import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Notebook } from "@/models/Notebook.js"

class NotebookService {
  async getNotebooks() {
    const response = await api.get('api/notebooks')
    logger.log('Got Notebooks!', response.data)
    const notebook = response.data.map(pojo => new Notebook(pojo))
    AppState.notebooks = notebook
  }

}

export const notebookService = new NotebookService()