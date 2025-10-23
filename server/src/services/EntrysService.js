import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

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

  async getNotebookEntries(notebookId, userId) {
    const notebookEntries = await dbContext.Notebook.find({ _id: notebookId, creatorId: userId }).populate('notebook')
    if (notebookEntries.creatorId != userId) {
      throw new Forbidden(`YOU ARE NOT ALLOWED TO VIEW ANOTHER USERS ENTRIES ${userId.name.toUpperCase()}!`);
    }
    const entries = await dbContext.Entry.find({ notebookId: notebookId })
    return entries
  }

}

export const entryService = new EntrysService()