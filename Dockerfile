FROM ubuntu:latest
MAINTAINER andre uschmann

RUN apt-get update
# install dependencies
RUN apt-get install libxrender1 -y
RUN apt-get install libfontconfig1 -y
RUN apt-get install libxext6 -y
RUN apt-get install wget -y
RUN apt-get install xz-utils -y

# download and unpack wkhtmltox
RUN wget http://download.gna.org/wkhtmltopdf/0.12/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz 
RUN tar -xvf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz
RUN mv wkhtmltox/bin/* /usr/bin/
RUN rm wkhtmltox-0.12.3_linux-generic-amd64.tar.xz
RUN rm -Rf wkhtmltox

RUN apt-get install -y curl

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | /bin/bash
RUN apt-get install -y nodejs

WORKDIR /websnapp
COPY package.json /websnapp/package.json
RUN cd /websnapp && npm install
COPY . /websnapp

CMD npm start
