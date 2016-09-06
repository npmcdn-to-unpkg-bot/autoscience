# start from the jupyter image with R, Python, and Scala (Apache Toree) kernels pre-installed
FROM jupyter/base-notebook

USER root

RUN apt-get update -qq && \
    apt-get install -y libx11-dev

USER jovyan

# add some extra packages
ADD packages /srv/
RUN pip install -r /srv/packages

# install the kernel gateway
RUN pip install jupyter_kernel_gateway
	
# REST API is designed as notebooks
ADD ./notebooks /srv/notebooks

# run kernel gateway on container start, not notebook server
EXPOSE 8888

