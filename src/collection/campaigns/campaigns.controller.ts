import { JsonController, Get } from "routing-controllers"
import { Service } from "typedi"
import CampaignsService from "./campaigns.service"

@JsonController("/campaigns")
@Service()
export default class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService
    ) { }

    @Get('/')
    async index() {
        return await this.campaignsService.getAll()
    }
}