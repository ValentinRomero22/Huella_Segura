import {
    savePetDao,
    getPetByIdDao,
    getPetsByOwnerDao
} from '../daos/petDao.js'

import { idValidator } from '../middlewares/idValidator.js'

import { logFunction } from '../utils/loggerWrapper.js'

export const savePetService = async (req) => {
    const result = {}

    try {
        const isValid = idValidator(req.body.owner)

        if (!isValid) {
            result.error = { message: 'El dueño de la mascota indicado no es válido' }
            return result
        }

        const newPet = {
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            chip: req.body.chip,
            colour: req.body.colour,
            size: req.body.size,
            weight: req.body.weight,
            vaccinated: req.body.vaccinated,
            neutered: req.body.neutered,
            observations: req.body.observations,
            behavaior: req.body.behavaior,
            training: req.body.training,
            photos: req.body.photos,
            owner: req.body.owner
        }

        if (req.body.birthdate) {
            newPet.birthdate = req.body.birthdate

            const today = new Date()

            const age = today.getFullYear() - req.body.birthdate.getFullYear()

            const month = today.getMonth() - req.body.birthdate.getMonth()
            const day = today.getDay() - req.body.birthdate.getDay()

            if (month < 0 || (month === 0 && day < 0)) age--

            newPet.age = age
        } else {
            newPet.age = req.body.age
        }

        const petAdded = await savePetDao(newPet)
        result.petAdded = petAdded

        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const getPetByIdService = logFunction(async (petId) => {
    const result = {}

    try {
        const isValid = idValidator(petId)

        if (!isValid) {
            result.error = { message: 'El identificador indicado no es válido' }
            return result
        }

        const petFound = await getPetByIdDao(petId)

        result.petFound = petFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}, 'service', 'getPetByIdService')

export const getPetsByOwnerService = async (ownerId) => {
    const result = {}

    try {
        const isValid = idValidator(ownerId)

        if (!isValid) {
            result.error = { message: 'El identificador indicado no es válido' }
            return result
        }

        const petsFound = await getPetsByOwnerDao(ownerId)

        result.petsFound = petsFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}