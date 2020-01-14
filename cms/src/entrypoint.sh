#! /bin/bash

echo "asasdasd"

echo $MYSQL_HOST

# Check if DB exists.
echo "Waiting for DB connection"
while ! echo exit | nc -vz $MYSQL_HOST $MYSQL_PORT;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

# Install drupal if not already installed
# Create a drush commnand for checking if drupal installed or not - if so just run updb.
vendor/bin/drush si open_pension --db-url="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DATABASE}" --account-pass="${ACCOUNT_PASS}" --account-name="${ACCOUNT_NAME}" -y -v

# Start the apache process.
exec apache2-foreground
