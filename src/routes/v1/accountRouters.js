import express from 'express'
import {accountController} from '../../controllers/accountController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.route('/info')
.get(authMiddleware.isAuthozied,accountController.getUserInfo)
Router.route('/update')
.put(authMiddleware.isAuthozied,accountController.updateUserInfo)
export const accountRoute = Router