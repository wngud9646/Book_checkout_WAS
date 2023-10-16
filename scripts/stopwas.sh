#!/bin/bash

PID=$(pgrep -f "fastify")
if [ -n "$PID" ]; then
  echo "Stopping WAS with PID $PID"
  kill -9 $PID
else
  echo "WAS is not running"
fi