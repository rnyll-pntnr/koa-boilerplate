import 'dotenv/config'
import KoaServer from './server'
import { PinoLogger } from './utils/logger'
import { connect } from './config/database'
import Container from 'typedi'

(async () => {
    const logger: PinoLogger = Container.get(PinoLogger)
    try {
        await connect(logger)

        const PORT: number = parseInt(process.env.PORT ?? '4000')
        const app = new KoaServer(PORT, logger)

        app.run()
    } catch (error: any) {
        logger.info(error.message)
    }
})()