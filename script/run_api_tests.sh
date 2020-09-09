#!/bin/bash
docker run -p 3000:3000 -d metabase/metabase
sleep 20
#docker run -it -v $PWD/:/e2e --entrypoint=cypress -w /e2e cypress/included:3.2.0 run --spec cypress/integration/metabase-api-test.js --config baseUrl=http://host.docker.internal:3000

npx cypress run --spec "cypress/integration/metabase-api-test.js"
