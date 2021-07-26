FROM node:alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install
RUN npm run build

# CMD [ "npm", "start" ]
CMD ["npm", "run", "start:prod"]
EXPOSE 3000
