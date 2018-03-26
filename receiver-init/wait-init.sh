while ! nc -zv rabbitqueue 5672
do
  sleep 5
done