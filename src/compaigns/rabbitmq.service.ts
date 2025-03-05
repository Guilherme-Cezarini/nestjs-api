import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import * as fs from 'fs';
import * as readline from 'readline';
import { Message } from './types/message.type';
import { Compaign } from './entities/compaign.entity';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect() {
    const url = "amqp://"+ process.env.RABBITMQ_USER + ":" + process.env.RABBITMQ_PASSWORD + "@" + process.env.RABBITMQ_URL;
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async sendToQueue(queue: string, message: any) {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async processFileAndSendToQueue(filePath: string, queueName: string, campaign: Compaign) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const message = this.generateMessage(line, campaign.id, campaign.company_id);
      await this.sendToQueue(queueName, message);
    }

  }

  generateMessage(
    phoneNumber: string,
    companyId: string,
    campaignId: string,
  ): Message {
    return new Message(phoneNumber, "this is a test message", companyId, campaignId);
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  async onModuleDestroy() {
    await this.close();
  }
}