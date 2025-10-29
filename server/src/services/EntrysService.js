import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  // TODO check to see what data comes back as the userId and ensure its correct.

  async getNotebookEntries(notebookId, userId) {
    const notebookEntries = await dbContext.Notebook.find({ _id: notebookId, creatorId: userId }).populate('notebook')
    if (notebookEntries.creatorId != userId) {
      throw new Forbidden(`YOU ARE NOT ALLOWED TO VIEW ANOTHER USERS ENTRIES ${userId.name.toUpperCase()}!`);
    }
    const entries = await dbContext.Entry.find({ notebookId: notebookId })
    return entries
  }

  async editEntry(entryId, userInfo, updateData) {
    const entryToUpdate = await dbContext.Entry.findById(entryId)
    if (entryToUpdate == null) {
      throw new BadRequest(`Invalid Entry Id: ${entryId}.`)
    }
    if (entryToUpdate.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT EDIT ANOTHER USERS ENTRY ${userInfo.name.toUpperCase()}!`);
    }
    if (updateData.description !== undefined) {
      entryToUpdate.description = updateData.description
    }
    if (updateData.img !== undefined) {
      entryToUpdate.img = updateData.img
    }
    await entryToUpdate.save()
    return entryToUpdate
  }

  async editEntriesNotebookLocation(entryId, userInfo, updateData) {
    const entryToUpdate = await dbContext.Entry.findById(entryId)
    if (entryToUpdate == null) {
      throw new BadRequest(`Invalid Entry Id: ${entryId}.`)
    }
    if (entryToUpdate.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT MOVE ANOTHER USERS ENTRY ${userInfo.name.toUpperCase()}!`)
    }
    entryToUpdate.notebookId = updateData.notebookId
    await entryToUpdate.save()
    return entryToUpdate
  }

  async deleteEntry(entryId, userInfo) {
    const entry = await dbContext.Entry.findById(entryId)
    if (entry?.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE ANOTHER USERS ENTRY ${userInfo.name.toUpperCase()}!`);
    }
    await entry?.save()
    return entry
  }
}

export const entryService = new EntrysService()