import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  }
)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessagesService) { }
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const allMessages = await this.messageService.findAll()
    client.emit('allMessages', allMessages)
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('requestAllMessages')
  async handleRequestAllMessages(client: Socket) {
    const allMessages = await this.messageService.findAll();
    client.emit('allMessages', allMessages);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: CreateMessageDto) {
    await this.messageService.create(payload)
    this.server.emit('message', { ...payload, createdAt: new Date() });
  }
}