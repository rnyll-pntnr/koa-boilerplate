import { Service } from "typedi"
import CampaignsRepository from './campaigns.repository'

@Service()
export default class CampaignsService {
    constructor(private readonly campaignRepository: CampaignsRepository) { }

    async getAll() {
        return this.campaignRepository.getAll()
    }
}