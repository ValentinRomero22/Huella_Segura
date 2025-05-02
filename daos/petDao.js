import petModel from '../models/petModel.js'

import { logFunction } from '../utils/loggerWrapper.js'

export const savePetDao = async (newPet) => {
    try {
        const result = await petModel.create(newPet)
        return result
    } catch (error) {
        throw error
    }
}

export const getPetByIdDao = logFunction(async (petId) => {
    try {
        const petFound = await petModel.findById(petId)
        return petFound
    } catch (error) {
        throw error
    }
}, 'dao', 'getPetByIdDao')

export const getPetsByOwnerDao = async (ownerId) => {
    try {
        const petsFound = await petModel.find({
            owner: ownerId
        })
        return petsFound
    } catch (error) {
        throw error
    }
}