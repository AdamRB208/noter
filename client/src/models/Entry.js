export class Entry {
  constructor(data) {
    this.id = data.id 
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
    this.description = data.description
    this.img = data.img
    this.notebookId = data.notebookId
    this.creatorId = data.creatorId
    this.notebook = data.notebook
  }
}