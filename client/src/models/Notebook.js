export class Notebook {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.icon = data.icon
    this.color = data.color
    this.coverImg = data.coverImg
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.entryCount = data.entryCount
  }
}