import { dbContext } from "../db/DbContext.js"

class EntrysService {

  async createEntry(entryData) {
    const entry = await dbContext.Entry.create(entryData)
    await entry.populate('notebook')
    return entry
  }
  
  async createGeneralEntry(entryData) {
    const entry = await dbContext.Entry.create(entryData)
    return entry
  }

  async getUsersEntries(userId) {
    const entries = await dbContext.Entry.find({ creatorId: userId }).populate('notebook')
    return entries
  }

  async getNotebookEntries(notebookId) {
    const notebookEntries = await dbContext.Notebook.find({ _id: notebookId }).populate('entry')
    return notebookEntries
  }

}

export const entryService = new EntrysService()