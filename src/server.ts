import 'reflect-metadata'
import { useKoaServer, useContainer } from 'routing-controllers'
import Application from 'koa'
import Container, { Service } from 'typedi'
import cors from '@koa/cors'
import cookieParser from 'koa-cookie'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'
import { PinoLogger } from './utils/logger'
import { join } from 'path'

@Service()
export default class KoaServer {
    readonly server: Application
    readonly port: number
    readonly logger: PinoLogger

    constructor(
        port = 4000,
        logger: PinoLogger
    ) {
        this.port = port
        this.server = this._koaServer()
        this.logger = logger
    }

    public run(): void {
        this.server.listen(this.port, () => {
            this.logger.info(`Server started on port: ${this.port}`)
        })
    }

    private _koaServer(): Application {
        const app: Application = new Application()

        app.use(cors())
        app.use(cookieParser())
        app.use(bodyParser({ jsonLimit: "50mb" }))
        app.use(morgan('dev'))
        app.use(async (ctx) => {
            ctx.body = 'OK'
        })

        useContainer(Container)

        return useKoaServer(app, {
            routePrefix: '/api',
            controllers: [
                join(__dirname, `./collection/**/*.controller.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`)
            ]
        })
    }
}