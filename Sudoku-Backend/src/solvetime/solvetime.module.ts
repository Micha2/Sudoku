import { Module } from "@nestjs/common"
import { SolvetimeService } from "./solvetime.service"
import { SolvetimeController } from "./solvetime.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SolvetimeEntity } from "./entities/solvetime.entity"

@Module({
  imports: [TypeOrmModule.forFeature([SolvetimeEntity])],
  providers: [SolvetimeService],
  controllers: [SolvetimeController],
})
export class SolvetimeModule {}
