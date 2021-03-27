FROM docker-all.repo.ebaotech.com/nginx:1.17.9-alpine

ADD ./dist/release /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
