import mongoose from 'mongoose'
import { PinoLogger } from '../utils/logger'

export const connect = async (logger: PinoLogger) => {

    return await mongoose.connect(`${process.env.DB_STRING}/${process.env.DB_COLLECTION_NAME}`)
        .then(() => {
            logger.info(`DB Connected Successfully!`)
        })
        .catch(err => {
            logger.error(`Failed to connect to DB: ${err.message}`)
        })
}