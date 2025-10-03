import { notebookService } from "../services/NotebooksService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class NotebooksController extends BaseController {
  constructor() {
    super('api/notebooks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNotebook)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createNotebook(request, response, next) {
    try {
      const notebookData = request.body
      const userInfo = request.userInfo
      notebookData.creatorId = userInfo._id
      const notebook = await notebookService.createNotebook(notebookData)
      response.send(notebook)
    }
    catch (error) {
      next(error);
    }
  }

}