import { dbContext } from "../db/DbContext.js"

class EntrysService {
  async createEntry(entryData) {
    const entry = await dbContext.Entry.create(entryData)
    await entry.populate('notebook')
    return entry
  }
  
}

export const entryService = new EntrysService()