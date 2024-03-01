#!/bin/bash

API_URL="http://localhost:3000/";

for i in {1..10}
do
  curl -X GET $API_URL
  echo
done
