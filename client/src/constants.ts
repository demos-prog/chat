// export const SOCKET_URI = 'http://localhost:3000';
export const SOCKET_URI = 'https://chatserver-sepia.vercel.app/';

export type Message = {
  author: string;
  message: string;
  createdAt: string;
};