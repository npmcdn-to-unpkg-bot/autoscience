FROM ubuntu:xenial
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update && apt-get install -y --force-yes python3-pip
RUN apt-get install -y --reinstall language-pack-en
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
RUN apt-get install -y libblas-dev
RUN apt-get install -y liblapack-dev
RUN apt-get install -y gfortran
ADD requirements.txt /
RUN pip3 install -r requirements.txt
EXPOSE 8888
EXPOSE 9999
