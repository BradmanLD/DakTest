curl -X POST \
  -H 'Content-type: application/json' \
  -H 'auth-token: 1abca0d7-f4aa-4135-8b43-e785c7dfbaa8' \
  --data '{ "storedValues": { "storedValueName1": "Value" }, "customName": "optionalNameForRun" }' \
  https://api.testrigor.com/api/v1/apps/Waj384CbetLwqoBhu/retest
