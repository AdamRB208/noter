import { dbContext } from "../db/DbContext.js"

class NotebooksService {
  async createNotebook(notebookData) {
    const notebook = await dbContext.Notebook.create(notebookData)
    await notebook.populate('creator', 'name picture')
    // await notebook.populate('eventCount')
    return notebook
  }

  async getMyNotebooks(userId) {
    const notebooks = await dbContext.Notebook.find({ creatorId: userId }).populate('creator', 'name picture')
    return notebooks
  }


  async getNotebookById(notebookId) {
    const notebook = await dbContext.Notebook.findById(notebookId).populate('creator', 'name picture')
    return notebook
  }
}

export const notebookService = new NotebooksService()