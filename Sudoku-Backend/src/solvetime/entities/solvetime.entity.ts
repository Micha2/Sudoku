import { Column, Entity, ObjectIdColumn } from "typeorm"
import { ObjectID } from "mongodb"

@Entity("solvetime")
export class SolvetimeEntity {
  @ObjectIdColumn()
  _id: ObjectID

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createDate: Date

  @Column()
  time: number

  @Column()
  timeFormatted: string

  @Column()
  playerId: string
}
