import BaseController from "../utils/BaseController.js";

export class EntrysController extends BaseController { 
  constructor() {
    super('api/events')
    this.router

  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createEntry(request, response, next) {
    try {
      const entryData = request.body
      const userInfo = request.userInfo
      entryData.creatorId = userInfo.id
      const entry = await 
    } catch (error) {
      next(error);
    }
  }
}