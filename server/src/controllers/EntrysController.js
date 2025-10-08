import { Auth0Provider } from "@bcwdev/auth0provider";
import { entryService } from "../services/EntrysService.js";
import BaseController from "../utils/BaseController.js";
import { notebookService } from "../services/NotebooksService.js";

export class EntrysController extends BaseController { 
  constructor() {
    super('api/entries')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGeneralEntry)
      .post('', this.createEntry)
      .get('', this.getUsersEntries)
      .get(':notebookId/entries', this.getNotebookEntries)
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

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async createGeneralEntry(request, response, next) {
    try {
      const entryData = request.body
      const userinfo = request.userInfo
      entryData.creatorId = userinfo.id
      const entry = await entryService.createGeneralEntry(entryData)
      response.send(entry)
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async getUsersEntries(request, response, next) {
    try {
      const userInfo = request.userInfo
      const entries = await entryService.getUsersEntries(userInfo.id)
      response.send(entries)
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  // TODO This function should start in notebook controller and send to entry service.
  // async getNotebookEntries(request, response, next) {
  //   try {
  //     const notebookId = request.params.notebookId
  //     const notebookEntries = await notebookService.getNotebookEntries(notebookId)
  //     response.send(notebookEntries)
  //   } catch (error) {
  //     next(error);
  //   }
  // }



}