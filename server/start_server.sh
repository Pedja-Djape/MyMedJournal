#!/bin/bash


export DEBUG=server:*
export PORT=9000
trap "exit" INT
npm start

unset DEBUG
unset PORT

