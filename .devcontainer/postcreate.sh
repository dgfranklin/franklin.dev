echo $GOOGLE_APPLICATION_CREDENTIALS_CONTENT  > $HOME/cloud-credentials.json
export GOOGLE_APPLICATION_CREDENTIALS=$HOME/cloud-credentials.json
(cd functions && npm install)