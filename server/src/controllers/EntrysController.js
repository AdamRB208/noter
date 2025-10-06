import { Auth0Provider } from "@bcwdev/auth0provider";
import { entryService } from "../services/EntrysService.js";
import BaseController from "../utils/BaseController.js";

export class EntrysController extends BaseController { 
  constructor() {
    super('api/entries')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEntry)
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
      const entry = await entryService.createEntry(entryData)
      response.send(entry)
    } catch (error) {
      next(error);
    }
  }
}