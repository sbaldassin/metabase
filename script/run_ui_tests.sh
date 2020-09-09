#!/bin/bash

docker run -d -p 3000:3000  metabase/metabase

sleep 30

npx cypress run --spec "cypress/integration/metabase-ui-test.js"
