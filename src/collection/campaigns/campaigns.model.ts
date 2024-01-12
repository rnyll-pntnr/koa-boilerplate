import { Schema, model } from 'mongoose'

const CampaignsSchema = new Schema(
    {
        campaign_name: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }, {
    timestamps: true,
    toJSON: {
        transform: (_doc, ret: any) => {
            ret._id = ret._id.toString()
            delete ret.__v
        }
    }
}
)

const Campaigns = model('campaigns', CampaignsSchema)

export default Campaigns