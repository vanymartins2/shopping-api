import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('messages')
export class Message {
  @PrimaryColumn()
  readonly id: string

  @Column()
  email: string

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
