#!/bin/sh

echo "Start sshd"
service ssh start
node server.js
