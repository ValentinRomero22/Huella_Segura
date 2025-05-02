import { Router } from 'express'

import {
    savePet,
    getPetById,
    getPetByOwner
} from '../controllers/petController.js'

export const petRouter = Router()

petRouter.post('/pet/savePet/', savePet)
petRouter.get('/pet/:petId/', getPetById)
petRouter.get('/pet/owner/:ownerId', getPetByOwner)