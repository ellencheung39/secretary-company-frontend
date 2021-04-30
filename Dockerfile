# =============================================================================================
# build: pull in + install everything to run nuxt build
# =============================================================================================
FROM node:12.18.3-alpine as build

RUN apk add git

WORKDIR /build
COPY .npmrc /build/
COPY package*.json /build/
RUN npm install

COPY . /build
RUN npm run build
#RUN npm run generate

# =============================================================================================
# run: do production install + copy build output of build container and run the node server
# =============================================================================================
FROM node:12.18.3-alpine as main

# Install git for vue-plyr
RUN apk add git

# Install pm2
RUN npm install pm2 -g

WORKDIR /build
COPY pm2.config.js /build/

COPY --from=build /build/.npmrc /build/
COPY --from=build /build/package*.json /build/
RUN npm install --production

# copy min needed to run (built) app
COPY --from=build /build/nuxt.config.js /build
COPY --from=build /build/.nuxt /build/.nuxt
COPY --from=build /build/static /build/static
#COPY --from=build /build/dist /build/dist

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]