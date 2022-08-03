import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('products')
export class Product {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  imgUrl: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
