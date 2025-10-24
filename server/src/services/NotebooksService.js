import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotebooksService {
  async createNotebook(notebookData) {
    const notebook = await dbContext.Notebook.create(notebookData)
    await notebook.populate('creator', 'name picture')
    await notebook.populate('entryCount')
    return notebook
  }

  async getMyNotebooks(userId) {
    const notebooks = await dbContext.Notebook.find({ creatorId: userId }).populate('creator', 'name picture').populate('entryCount')
    return notebooks
  }


  async getNotebookById(notebookId) {
    const notebook = await dbContext.Notebook.findById(notebookId).populate('creator', 'name picture').populate('entryCount')
    return notebook
  }

  async editNotebook(notebookId, userInfo, updateData) {
    const notebookToUpdate = await dbContext.Notebook.findById(notebookId)
    if (notebookToUpdate == null) {
      throw new BadRequest(`Invalid Notebook Id: ${notebookId}.`)
    }
    if (notebookToUpdate.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT EDIT ANOTHER USERS NOTEBOOK ${userInfo.name.toUpperCase()}!`);
    }
    notebookToUpdate.title = updateData.title
    notebookToUpdate.icon = updateData.icon
    notebookToUpdate.color = updateData.color
    notebookToUpdate.coverImg = updateData.coverImg
    await notebookToUpdate.save()
    return notebookToUpdate
  }

  async deleteNotebook(notebookId, userInfo) {
    const notebook = await dbContext.Notebook.findById(notebookId)
    if (notebook?.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE ANOTHER USERS NOTEBOOK ${userInfo.name.toUpperCase()}!`);
    }
    await notebook?.save()
    return notebook
  }


}

export const notebookService = new NotebooksService()