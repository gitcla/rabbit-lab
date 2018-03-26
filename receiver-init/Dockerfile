FROM janeczku/alpine-kubernetes:3.3

RUN apk add --update netcat-openbsd

COPY wait-init.sh /app/wait-init.sh

CMD [ "/bin/sh", "/app/wait-init.sh" ]
