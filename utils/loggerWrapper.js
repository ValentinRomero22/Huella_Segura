import { logger } from './logger.js'

import stringify from 'json-stringify-safe'

export const logFunction = (fn, layerName = 'layer', functionName = fn.name) => {
    return async function (...args) {
        logger.info({
            layer: layerName,
            event: `Inicio ${functionName}`,
            args: stringify(args)
        })

        try {
            const result = await fn(...args)
            logger.info({
                layer: layerName,
                event: `Fin ${functionName}`,
                result: stringify(result)
            })

            return result
        } catch (error) {
            logger.error({
                layer: layerName,
                event: `Error en ${functionName}`,
                error: error.message,
                stack: error.stack
            })

            throw error
        }
    }
}