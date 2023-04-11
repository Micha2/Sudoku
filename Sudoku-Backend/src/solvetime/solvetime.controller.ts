import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { SolvetimeService } from "./solvetime.service"
import { Solvetime } from "./models/solvetime.interface"
import { ObjectID } from "typeorm"
import * as stream from "stream"

@Controller("solvetime")
export class SolvetimeController {
  constructor(private solveTimeService: SolvetimeService) {}
  @Post()
  post(@Body() solvetime: Solvetime) {
    return this.solveTimeService.postSolvetime(solvetime)
  }

  @Get()
  getAll() {
    return this.solveTimeService.getAllSolvetimes()
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.solveTimeService.getSolvetime(id)
  }

  @Put(":id")
  put(@Param("id") id: string, @Body() solvetime: Solvetime) {
    return this.solveTimeService.updateSolvetime(id, solvetime)
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.solveTimeService.deleteSolveTime(id)
  }
}
