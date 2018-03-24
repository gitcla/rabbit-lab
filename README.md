# rabbit-lab
Lab with Rabbit and Docker containers

This lab uses the following containers:

- RabbitMq to manage a queue
- An HTTP endpoint written in NodeJS to publish a message on the queue (sender)
- A NodeJS receiver that consumes the queue at a rate of 1 message / second

## Deploy on Docker Swarm

Start the lab with the command:

```
docker stack deploy -c rabbit-lab-cluster-swarm.yaml rabbitlab
```

The following endpoint are available:

- RabbitMq management address:  http://&lt;your host ip&gt;:15672
- Sender endpoint:              http://&lt;your host ip&gt;:1337
- Visualizer:                   http://&lt;your host ip&gt;:9000

To flood the queue you can use ab-flooder.sh (it uses Apache Benchmark tool).

You can scale up or down the number of receivers to check the rate of items consumed per second with the command:

```
docker service scale rabbitlab_receiver=10
```
Now try to upgrade the receiver with a new version that speeds up the process to 1msg/100msec:

```
docker service update rabbitlab_receiver --image=dockla/rabbit-receiver:100msec
```

## Deploy on Kubernetes

For Minikube use:

```
minikube start
kubectl create -f rabbit-lab-cluster-k8s.yaml
```

Now get the URLs of the endpoints:

```
minikube service sender-svc --url
minikube service rabbitqueue-management-svc --url
```

Start to flood the system:

```
ab -r -c 5 -n 100000 $(minikube service sender-svc --url)/
```

Update the receivers:

```
kubectl set image deployments/receiver receiver=dockla/rabbit-receiver:100msec
```

Try to scale them up:

```
kubectl scale deployment receiver --replicas=5
```

Check the dashboards to get many useful informations:

```
minikube dashboard
minikube addons open heapster
```

Destroy the cluster:

```
kubectl delete deployments sender rabbitqueue receiver
kubectl delete services sender-svc rabbitqueue rabbitqueue-management-svc
```

### Improvements:

- [ ] the receiver shouìd start only after the service rabbitqueue is available

      https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#when-should-i-use-liveness-or-readiness-probes
- [ ] Try to scale the sender
- [ ] Run minikube with lower ports bound:

      minikube start --extra-config=apiserver.ServerRunOptions.ServiceNodePortRange=1-30000
- [ ] Use namespaces
- [ ] Improve labeling and selectors
