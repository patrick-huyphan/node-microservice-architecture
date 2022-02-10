import app from "./app";
import * as http from "http";

async function main(_args: string[]) {
  const port = process.env.PORT ?? 3000;
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
}

main(process.argv).catch((error) => {
  console.error(error, `Uncaught error: ${error.message}`);
  process.exit(1);
});

process
  .on("unhandledRejection", (reason) => {
    console.error(
      reason ?? {},
      `Unhandled rejection: ${(reason as Error)?.message}`
    );
  })
  .on("uncaughtException", (error) => {
    console.error(error, `Uncaught Exception: ${error?.message}`);
    process.exit(1);
  });
