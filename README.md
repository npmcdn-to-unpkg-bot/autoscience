# The Automated Data Scientist

## Getting started

Start the proxy

```bash
$ proxy/start.sh
```

Start the gateway

```bash
$ cd gateway/docker
$ make build           # Build container image
$ make python_restapi  # Run Jupyter gateway
```

Test the gateway

```bash
$ curl -s localhost:8888/datasets/1 | jq . | head
{
  "cols": 13,
  "dims": 2,
  "variables": {
    "spdef": {
      "sample": [
        40,
        50,
        60,
        130,
```

## License

Apache License, version 2.0
