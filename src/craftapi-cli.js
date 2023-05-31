#!/usr/bin/env node

"use strict";

const OpenApiMocker = require("open-api-mocker");
const URLSchemaLoader = require("./url-loader");

const { argv } = require("yargs")
  .option("port", {
    alias: "p",
    description: "The port to bind on",
    type: "number",
    default: 5001,
  })
  .option("schema", {
    alias: "s",
    description: "The path or URL of the schema to mock",
    type: "string",
  })
  .option("watch", {
    type: "boolean",
    alias: "w",
    description: "Reload the schema every 10 seconds",
    default: false,
  })
  .option("interval", {
    type: "number",
    alias: "i",
    description: "Set the interval at which to reload the schema",
    default: 10,
  })
  .option("verbose", {
    type: "boolean",
    alias: "v",
    conflicts: "quiet",
  })
  .option("quiet", {
    type: "boolean",
    alias: "q",
    description: "Suppress request output, only show errors",
    conflicts: "verbose",
  })
  .demandOption("schema")
  .help();

const logger = require("lllog")();

const RUNTIME_ERROR = 90;

if (argv.verbose) logger.setMinLevel("debug");
else if (argv.quiet) logger.setMinLevel("error");

(async () => {
  let sigintReceived = false;

  try {
    const openApiMocker = new OpenApiMocker({
      port: argv.port,
      schema: argv.schema,
      watch: !!argv.watch,
      schemaLoader: new URLSchemaLoader({
        interval: argv.interval,
      }),
    });

    await openApiMocker.validate();

    process.on("SIGINT", async () => {
      if (sigintReceived) process.exit(0);

      sigintReceived = true;

      logger.info("SIGINT received. Shutting down...");
      logger.info("Press ^C again to force stop.");

      await openApiMocker.shutdown();
      process.exit(0);
    });

    await openApiMocker.mock();
  } catch (e) {
    logger.fatal(`Error while mocking schema: ${e.message}`);
    process.exit(e.cliError || RUNTIME_ERROR);
  }
})();
