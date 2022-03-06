import app from "./app";
import * as http from "http";
import { logger } from "./logger";

async function main(_args: string[]) {
  const port = process.env.PORT ?? 3000;
  const server = http.createServer(app);
  server.listen(port, () => {
    logger.info(`Server listening on port ${port}!`);
  });
}

main(process.argv).catch((error) => {
  logger.error(error, `Uncaught error: ${error.message}`);
  process.exit(1);
});

process
  .on("unhandledRejection", (reason) => {
    logger.error(
      reason ?? {},
      `Unhandled rejection: ${(reason as Error)?.message}`
    );
  })
  .on("uncaughtException", (error) => {
    logger.error(error, `Uncaught Exception: ${error?.message}`);
    process.exit(1);
  });
