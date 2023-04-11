import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SolvetimeModule } from "./solvetime/solvetime.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORT,
      authSource: process.env.DB_AUTHSOURCE,
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [__dirname + "**" + "*.entity.{ts,js}"],
      synchronize: false,
    }),
    SolvetimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
