import { Service } from "typedi"

@Service()
export default class CampaignsRepository {
    async getAll() {
        return {
            success: true,
            message: 'Get all data'
        }
    }
}