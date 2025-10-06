import { notebookService } from "../services/NotebooksService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class NotebooksController extends BaseController {
  constructor() {
    super('api/notebooks')
    this.router
      .get('/:notebookId', this.getNotebookById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNotebook)
      .get('', this.getMyNotebooks)
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
      notebookData.creatorId = userInfo.id
      const notebook = await notebookService.createNotebook(notebookData)
      response.send(notebook)
    }
    catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getMyNotebooks(request, response, next) {
    try {
      const userInfo = request.userInfo
      const notebooks = await notebookService.getMyNotebooks(userInfo.id)
      response.send(notebooks)
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getNotebookById(request, response, next) {
    try {
      const notebookId = request.params.notebookId
      const notebook = await notebookService.getNotebookById(notebookId)
      response.send(notebook)
    } catch (error) {
      next(error);
    }
  }

}