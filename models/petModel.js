import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        maxLength: [30, 'El nombre del animal no puede tener más de 30 caracteres']
    },
    age: {
        type: Number,
        required: false,
        min: [0, 'La edad del animal no puede ser negativa']
    },
    birthdate: { // si se conoce, puede calcular la edad y NO pedirla
        type: Date,
        required: false
    },
    species: {
        type: String,
        required: [true, 'La especie del animal es requerida']
    },
    breed: {
        type: String,
        required: false
    },
    chip: {
        type: String,
        required: false
    },
    colour: {
        type: String,
        required: [true, 'El color del animal es requerido'],
        minLength: [4, 'El color ingresado no es válido']
    },
    size: {
        type: String,
        required: false,
        enum: { values: ['Chico', 'Mediano', 'Grande'], message: '{VALUE} no es un tamaño válido' }
    },
    weight: {
        type: Number,
        required: false,
        min: [0, 'El peso del animal no puede ser negativo']
    },
    vaccinated: {
        type: Number,
        required: false,
        enum: { values: [0, 1, 2], message: '{VALUE} no es un valor correcto' }
    }, // 0: no vacunado | 1: en proceso | 2: vacunado
    neutered: {
        type: Boolean,
        required: false
    },
    observations: {
        type: String,
        required: false,
        maxLength: [50, 'Las observaciones a ingresar no pueden exceder los 50 caracteres']
    },
    behavaior: {
        type: String,
        required: false,
        maxLength: [50, 'El comportamiento a ingresar no puede exceder los 50 caracteres']
    },
    training: {
        type: String,
        required: false,
        enum: { values: ['Ninguno', 'Básico', 'Avanzado'], message: '{VALUE} no es un entrenamiento válido' }
    },
    photos: [{
        type: String,
        required: false
    }],
    owner: {
        type: mongoose.Schema.ObjectId,
        required: false
    }
}, {
    versionKey: false
})

export default mongoose.model('Pet', petSchema)