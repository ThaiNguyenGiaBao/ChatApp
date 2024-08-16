import { Request, Response } from "express";
import prisma from "../db/prisma";

export const sendMessage = async (req: Request, res: Response) => {
  const message = req.body.message;
  const { id: receiverId } = req.params;
  const { id: senderId } = req.user;

  const sender = await prisma.user.findUnique({
    where: {
      id: senderId,
    },
  });

  const receiver = await prisma.user.findUnique({
    where: {
      id: receiverId,
    },
  });

  console.log(sender?.username, receiver?.username);

  try {
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantsId: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantsId: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        text: message,
        senderId,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    } else {
      return res.status(400).json({ message: "Message not sent" });
    }

    // Socket.io

    return res.status(201).json(newMessage);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
