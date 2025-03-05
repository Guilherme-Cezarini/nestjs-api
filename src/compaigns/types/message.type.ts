export class Message {
    phone_number: string;
    message: string;
    company_id: string;
    campaign_id: string;
    created_at: Date;
    updated_at: Date
  
    constructor(
      phoneNumber: string,
      messageText: string,
      companyId: string,
      campaignId: string,
      created_at: Date,
      updated_at: Date
    ) {
      this.phone_number = phoneNumber;
      this.message = messageText;
      this.company_id = companyId;
      this.campaign_id = campaignId;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
}
  