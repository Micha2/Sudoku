import { ObjectID } from "mongodb"

export interface Solvetime {
  _id?: ObjectID
  createDate?: Date
  time?: number
  playerId?: string
}
