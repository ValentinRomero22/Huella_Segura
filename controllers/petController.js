import {
    savePetService,
    getPetByIdService,
    getPetsByOwnerService
} from '../services/petService.js'

/* import { logger } from '../utils/logger.js' */

import { logFunction } from '../utils/loggerWrapper.js'

export const savePet = async (req, res) => {
    try {
        const result = await savePetService(req)

        if (result.error) {
            let message = ''

            if (result.error.message) {
                message = result.error.message
            } else if (result.error.details) {
                message = result.error.details[0].message
            } else {
                message = 'Se produjo un error inesperado'
            }

            return res.status(400).json({
                statusCode: 400,
                message
            })
        } else {
            return res.status(201).json({
                statusCode: 201,
                message: 'Mascota guardada con éxito'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const getPetById = logFunction(async (req, res) => {
    try {
        const { petId } = req.params

        const result = await getPetByIdService(petId)

        if (result.error) {
            let message = ''

            if (result.error.message) {
                message = result.error.message
            } else if (result.error.details) {
                message = result.error.details[0].message
            } else {
                message = 'Se produjo un error inesperado'
            }

            return res.status(400).json({
                statusCode: 400,
                message
            })
        } else {
            if (result.petFound) {
                return res.status(200).json({
                    statusCode: 200,
                    data: result.petFound,
                    message: 'Mascota encontrada'
                })
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    data: null,
                    message: 'No se encontró la mascota buscada'
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}, 'controller', 'getPetById')

export const getPetByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params

        const result = await getPetsByOwnerService(ownerId)

        if (result.error) {
            let message = ''

            if (result.error.message) {
                message = result.error.message
            } else if (result.error.details) {
                message = result.error.details[0].message
            } else {
                message = 'Se produjo un error inesperado'
            }

            return res.status(400).json({
                statusCode: 400,
                message
            })
        } else {
            if (result.petsFound.length > 0) {
                return res.status(200).json({
                    statusCode: 200,
                    data: result.petsFound,
                    message: 'Mascotas encontradas'
                })
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    data: null,
                    message: 'No se encontraron mascotas para el dueño indicado'
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}