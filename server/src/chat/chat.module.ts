import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatGateway } from './chat.gateway';
import { Message } from '../messages/entities/message.entity';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Message]),
  ],
  providers: [ChatGateway, MessagesService],
})
export class ChatModule {}