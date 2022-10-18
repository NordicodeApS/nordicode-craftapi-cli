const EventEmitter = require('events');
const http = require('http');
const YAML = require('js-yaml');
const logger = require('lllog')();

class URLSchemaLoader extends EventEmitter {
  // SchemaOption is the value of the `schema` option or the value passed to the `setSchema` method. It's value depends on what your loader needs.
  async load(schemaURL) {
    if (!schemaURL.match(/^http/)) {
      throw new OpenAPISchemaNotFound(`Schema not found in ${schemaURL}`);
    }

    let response = await this.makeSynchronousRequest(schemaURL);

    return YAML.load(response);
  }

  watch() {
		logger.info('Schema will update every 10 seconds...');

		setInterval(async () => this.emit('schema-changed'), 10000);
	}

  makeSynchronousRequest(url) {
    return new Promise((resolve, reject) => {
      http.get(url, {
        headers: {
          'Accept': 'text/yaml'
        }
      }, response => {
        let chunks_of_data = [];

        response.on('data', fragments => {
          chunks_of_data.push(fragments);
        });

        response.on('end', () => {
          let response_body = Buffer.concat(chunks_of_data);

          resolve(response_body.toString());
        });

        response.on('error', error => {
          reject(error);
        });
      });
    });
  }
}

module.exports = URLSchemaLoader;
