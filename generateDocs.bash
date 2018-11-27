#!/bin/bash

cd src
rm -r -f /var/www/html/docs/discordjs-cmds2
jsdoc \
    --readme ../README.md \
    --destination /var/www/html/docs/discordjs-cmds2 \
    .