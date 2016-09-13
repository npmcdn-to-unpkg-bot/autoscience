# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

.PHONY: help build notebook gateway python_restapi proxy/start proxy/stop

IMAGE=autoscience/kernel_gateway

help:
	@echo 'Host commands:'
	@echo ''
	@echo 'build          - builds the container image'
	@echo ''
	@echo 'proxy/start    - starts the proxy'
	@echo 'proxy/stop     - starts the proxy'
	@echo ''
	@echo 'gateway        - run jupyter gateway container of autoscience via websocket'
	@echo 'python_restapi - run jupyter gateway container of autoscience via REST API (python implementation)'

build:
	@cd gateway/docker && docker build -t $(IMAGE) .

# just for testing. Prefer the kernelgateway as it's lighter on the setup
# and it offers a superset of features (more flexible for custom webapps)
notebook:
	@cd gateway/docker && docker run --rm -ti -p 8888:8888 -v $(shell pwd):/home/jovyan/work $(IMAGE) \
	  jupyter notebook \
	  --debug \
	  --no-browser \
    --notebook-dir=. \
    --ip=0.0.0.0 \
    --NotebookApp.allow_origin=*

# http://jupyter-kernel-gateway.readthedocs.io/en/latest/config-options.html
# Setting allow-origin options in a lax way to enable xmlhttprequest from all origin
# as well as pre-flight disabling CORS checks using OPTIONS

gateway:
	@cd gateway/docker && docker run --rm -ti -p 8888:8888 $(IMAGE) \
	  jupyter kernelgateway \
	  --KernelGatewayApp.ip=0.0.0.0 \
	  --KernelGatewayApp.port=8888 \
	  --KernelGatewayApp.allow_origin=* \
    --KernelGatewayApp.allow_methods='GET,POST,PUT,DELETE,OPTIONS' \
	  --KernelGatewayApp.allow_headers='Content-Type, Access-Control-Allow-Headers'

#r_restapi:
#	@docker run --rm -ti -p 8888:8888 $(IMAGE) --KernelGatewayApp.seed_uri=/srv/notebooks/autoscience_restapi_r.ipynb

python_restapi:
	@cd gateway/docker && docker run --rm -ti -p 8888:8888 $(IMAGE) \
	  jupyter kernelgateway \
	  --debug \
	  --KernelGatewayApp.ip=0.0.0.0 \
	  --KernelGatewayApp.port=8888 \
	  --KernelGatewayApp.api=notebook-http \
	  --KernelGatewayApp.seed_uri=/srv/notebooks/autoscience.ipynb

proxy/start:
	@echo Starting proxy
	@cd proxy && ./start.sh

proxy/stop:
	@echo Stopping proxy
	@cd proxy && ./stop.sh
