#!/usr/bin/env bash

set -xv

# Run the fake pop server from bash
# Defaults to port 1100 so it can be run by unpriv users and not clash with a real server
# Optionally, pass in a port number as the first arg

rm -f fifo
mkfifo fifo
nc -l ${1:-1100} <fifo |bash ./fakepopserver.sh >fifo
rm fifo
