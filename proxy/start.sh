#!/bin/bash
set -x
RELD="`dirname "$0"`"
ABSD="`realpath "$RELD"`"
rm -f nginx.conf
sed "s,ROOT,$ABSD," < nginx.conf.template > nginx.conf
exec nginx -c "$ABSD"/nginx.conf
