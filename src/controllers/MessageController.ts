import { Request, Response } from 'express'
import { messageRepository } from '../repositories/messageRepository'

export class MessageController {
  async create(req: Request, res: Response) {
    // criar mensagem
    const { email, message } = req.body

    if (!email || !message) {
      return res.status(400).json({ message: 'Invalid email or message' })
    }

    try {
      const newMessage = messageRepository.create({ email, message })

      await messageRepository.save(newMessage)

      return res.status(201).json(newMessage)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async list(req: Request, res: Response) {
    //listar mensagem
    const allMessages = await messageRepository.find()

    return res.json(allMessages)
  }
}
