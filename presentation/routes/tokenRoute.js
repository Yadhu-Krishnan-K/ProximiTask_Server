import {Router} from 'express'
import { refreshAccessToken } from '../../interface/controllers/Users/AccessTokenControll.js'

const router = Router()

router.route('/access-token')
.post(refreshAccessToken)


export default router