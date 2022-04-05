FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm ci

COPY . .

CMD [ "npm", "run", "serve" ]