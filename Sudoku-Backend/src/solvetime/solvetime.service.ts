import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { SolvetimeEntity } from "./entities/solvetime.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Solvetime } from "./models/solvetime.interface"
import { ObjectID } from "mongodb"

@Injectable()
export class SolvetimeService {
  constructor(
    @InjectRepository(SolvetimeEntity)
    private readonly solveTimeRepo: Repository<SolvetimeEntity>,
  ) {}
  postSolvetime(solveTime: Solvetime) {
    if (solveTime._id) {
      solveTime._id = new ObjectID(solveTime._id)
    }
    if (solveTime.playerId) {
      solveTime.playerId = new ObjectID(solveTime.playerId)
    }
    if (solveTime.time) {
      solveTime.timeFormatted = this.msToTime(solveTime.time)
    }
    return this.solveTimeRepo.save(solveTime)
  }

  getAllSolvetimes() {
    return this.solveTimeRepo.find()
  }

  getSolvetime(id: string) {
    return this.solveTimeRepo.find({
      where: {
        _id: new ObjectID(id),
      },
    })
  }
  updateSolvetime(id: string, solveTime: Solvetime) {
    return this.solveTimeRepo.update(id, solveTime)
  }

  deleteSolveTime(id: string) {
    return this.solveTimeRepo.delete(new ObjectID(id))
  }

  msToTime(duration): string {
    const milliseconds: number = Math.floor((duration % 1000) / 100),
      seconds: number = Math.floor((duration / 1000) % 60),
      minutes: number = Math.floor((duration / (1000 * 60)) % 60),
      hours: number = Math.floor((duration / (1000 * 60 * 60)) % 24)

    return (
      hours.toLocaleString("us-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      minutes.toLocaleString("us-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      seconds.toLocaleString("us-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      "." +
      milliseconds.toLocaleString("us-US", {
        minimumIntegerDigits: 3,
        useGrouping: false,
      })
    )
  }
}
