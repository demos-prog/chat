import { Message } from "./entities/message.entity";

export const messagesProviders = [
  {
    provide: 'MESSAGES_REPOSITORY',
    useValue: Message,
  },
];