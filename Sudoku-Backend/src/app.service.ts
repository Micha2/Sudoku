import { Injectable } from "@nestjs/common"

import { exec } from "child_process"

@Injectable()
export class AppService {
  getHello(): string {
    // exec("dir", (error, stdout, stderr) => {
    //   if (error) console.log(error)
    //   else console.log(stdout)
    // })
    return "Hello!"
  }
}
