#!/bin/bash
docker run -p 3000:3000 -d metabase/metabase
sleep 30
npx cypress run --spec "cypress/integration/metabase-ui-test.js"
