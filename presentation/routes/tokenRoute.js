import {Router} from 'express'
import { refreshAccessToken } from '../../interface/controllers/AccessTokenControll.js'

const router = Router()

router.route('/access-token')
.post(refreshAccessToken)


export default router