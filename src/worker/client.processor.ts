import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("client")
export class AppConsumer {
  @Process("register")
  async processNamedJob(job: Job<any>): Promise<any> {
    console.log("job", job.data);
    // do something with job and job.data
  }
}
