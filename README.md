# rabbit-lab
Lab with Rabbit and Docker containers

This lab uses the following containers:

- RabbitMq to manage a queue
- An HTTP endpoint written in NodeJS to publish a message on the queue (sender)
- A NodeJS receiver that consumes the queue at a rate of 1 message / second

The following endpoint are available:

- RabbitMq management address:  http://&lt;your host ip&gt;:15672
- Sender endpoint:              http://&lt;your host ip&gt;:1337
- Visualizer:                   http://&lt;your host ip&gt;:9000

To flood the queue you can use ab-flooder.sh (it uses Apache Benchmark tool).

You can scale up or down the number of receivers on Docker to check the rate of items consumed per second with the command:

```
docker service scale rabbitlab_receiver=10
```
Now you try to upgrade the receiver container with a new version that speed up the receiver process:

```
docker service update rabbitlab_receiver --image=dockla/rabbit-receiver:100msec
```