import express, { Router } from 'express'
import { createServer } from 'http'
import cors from 'cors'

import { mongoConnect } from './utils/mongoConnect.js'

import {
    petRouter
} from './routes/main.routes.js'

import { logWriting } from './utils/logWriting.js'

const app = express()
app.use(express.json())
app.use(cors())

const httpServer = createServer(app)

mongoConnect()

app.use('/', petRouter)

app.use(logWriting)

httpServer.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'))
httpServer.on('error', () => console.log('Error al levantar el servidor'))


// ACCESO A LA RUTA DE PRUEBA PARA TESTEAR CON POSTMAN

/* const testRouter = Router()
app.use('/', testRouter)

const testPath = async (req, res) => {
    if (req.body.status == 'ok') {
        return res.status(200).json({
            statusCode: 200,
            message: 'Respuesta exitosa'
        })
    } else {
        return res.status(500).json({
            statusCode: 500,
            message: 'Respuesta no existosa'
        })
    }
}

testRouter.post('/test/', testPath) */