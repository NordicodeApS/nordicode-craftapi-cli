# CraftAPI CLI

This is basically a wrapper for [OpenAPI Mocker](https://github.com/jormaechea/open-api-mocker), that adds a URL schema loader for using CraftAPI.

## Installation and usage

### Using npm

```
npm i -g craftapi-cli

craftapi -s https://app.craftapi.dev/mock/[WORKSPACE-TOKEN]/[PROJECT-TOKEN]/openapi
```

### More info

See the [open-api-mocker docs](https://github.com/jormaechea/open-api-mocker/blob/master/README.md) to read more about the capabilities of this CLI.

## Common options

| Option  | Required | Example  | Description  |
|---|---|---|---|
| -s [url] | true | -s https://... | The CraftAPI schema URL. |
| -p [port] | false | -p 3000 | The port the server will listen to. The default is 5001.  |
| -w  | false | -w | Reload the schema every 10 seconds. |
| -i [seconds]  | false | -i 30 | Set the interval at which to reload the schema. |

Write `--help` to prompt every available setting.

```
craftapi --help
```

## Contributing

Issues and PRs are welcome.
