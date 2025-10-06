import { dbContext } from "../db/DbContext.js"

class NotebooksService {
  async createNotebook(notebookData) {
    const notebook = await dbContext.Notebook.create(notebookData)
    await notebook.populate('creator', 'name picture')
    // await notebook.populate('eventCount')
    return notebook
  }

  async getNotebooks() {
    const notebooks = await dbContext.Notebook.find().populate('creator', 'name picture')
    return notebooks
  }


}

export const notebookService = new NotebooksService()