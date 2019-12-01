source ../local.env

zip -r action.zip index.js ../node_modules/

ibmcloud fn action $1 pee/create-visit action.zip \
  --kind nodejs:10 \
  --web true \
  --param MYSQL_HOST "$MYSQL_HOST" \
  --param MYSQL_USER "$MYSQL_USER" \
  --param MYSQL_PASSWORD "$MYSQL_PASSWORD" \
  --param MYSQL_DATABASE "$MYSQL_DATABASE" \
  --param MYSQL_PORT "$MYSQL_PORT"
  