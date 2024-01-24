#! /bin/bash

script_dir="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "${script_dir}"

echo "[$(date +'%F %T')] Collecting static files..."
set -x
  python3 ./manage.py collectstatic --clear --no-input
set +x

count=0
max_count=24
while [ "${count}" -lt "${max_count}" ]; do
  # ----------------------------------------------------------------------------
  # We run `./manage.py migrate` in a loop because MySQL may not be
  # instantly available
  # ----------------------------------------------------------------------------
  count=$((count + 1))

  echo "[$(date +'%F %T')] Waiting for MySQL to be available [${count}/${max_count}]"

  if python3 ./manage.py migrate --no-input &> /tmp/migrate.log;
  then break;
  else
    tail /tmp/migrate.log -n 1
    if grep 'No migrations to apply' /tmp/migrate.log; then break; fi
  fi

  sleep 3
done

echo "[$(date +'%F %T')] Starting Django server..."
gunicorn project.wsgi:application --bind 0.0.0.0:8000
