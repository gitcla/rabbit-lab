# rabbit-lab
Lab with Rabbit and Docker containers

This lab uses the following containers:

- RabbitMq to manage a queue
- An HTTP endpoint written in NodeJS to publish a message on the queue (sender)
- A NodeJS receiver that consumes the queue at a rate of 1 message / second

You can scale up or down the number of receivers on Docker to check the rate of items consumed per second.

RabbitMq management address:  http://<your host ip>:15672

To flood the queue you can use ab-flooder.sh (it uses Apache Benchmark tool).
