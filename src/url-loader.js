const EventEmitter = require("events");
const http = require("http");
const https = require("https");
const YAML = require("js-yaml");
const logger = require("lllog")();

class URLSchemaLoader extends EventEmitter {
  constructor(options) {
    super();

    this.interval = options.interval || 10;
  }

  // SchemaOption is the value of the `schema` option or the value passed to the `setSchema` method. It's value depends on what your loader needs.
  async load(schemaURL) {
    if (!schemaURL.match(/^http/)) {
      throw new Error(`Invalid schema URL: ${schemaURL}`);
    }

    let response = await this.makeSynchronousRequest(schemaURL);

    return YAML.load(response);
  }

  watch() {
    logger.info(`Schema will update every ${this.interval} seconds...`);

    setInterval(async () => this.emit("schema-changed"), this.interval * 1000);
  }

  makeSynchronousRequest(url) {
    return new Promise((resolve, reject) => {
      if (url.match(/^https/)) {
        https.get(url, (response) => {
          this.responseHandler(response, resolve, reject);
        });
      } else {
        http.get(url, (response) => {
          this.responseHandler(response, resolve, reject);
        });
      }
    });
  }

  responseHandler(response, resolve, reject) {
    let chunks_of_data = [];

    response.on("data", (fragments) => {
      chunks_of_data.push(fragments);
    });

    response.on("end", () => {
      let response_body = Buffer.concat(chunks_of_data);

      resolve(response_body.toString());
    });

    response.on("error", (error) => {
      reject(error);
    });
  }
}

module.exports = URLSchemaLoader;
