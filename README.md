# CraftAPI CLI

This is basically a wrapper for [OpenAPI Mocker](https://github.com/jormaechea/open-api-mocker), that adds a URL schema loader for using CraftAPI.

## Installation and usage

### Using npm

```
npm i -g craftapi-cli

craftapi -s http://craftapi.dev/mock/QWERTY1234/openapi
```

### Using docker

```
coming soon!
```

### More info

See the [open-api-mocker docs](https://github.com/jormaechea/open-api-mocker/blob/master/README.md) to read more about the capabilities of this CLI.

## Common options

| Option  | Required | Example  | Description  |
|---|---|---|---|
| -s | true | -s http://craftapi.dev/mock/123456/openapi | The CraftAPI schema URL. |
| -p | false | -p 3000 | The port the server will listen to. The default is 5001.  |
| -w  | false | -w | Reload the schema every 10 seconds. |

Write `--help` to prompt every available setting.

```
craftapi --help
```

## Contributing

Issues and PRs are welcome.
