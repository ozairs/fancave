# fancave

## Docker

**Docker Standalone**

docker stop fancave-client
docker rm fancave-client
docker rmi ozairs/fancave-client:v1
#docker build -t ozairs/fancave-ui:v1 ./../../megafanz/client/.
docker run -dit --name fancave-client -p 4430:443 -p 4080:80 -e PROTOCOL=http -e TEAMS_SERVER=fancave-server:3080 -e PLAYERS_SERVER=fancave-server:3080 -e NEWS_SERVER=fancave-server:3080 --link fancave-server:fancave-server ozairs/fancave-ui:v1

docker stop fancave-server
docker rm fancave-server
docker rmi ozairs/fancave-server:v1
docker build -t ozairs/fancave-server:v1 ./../.
docker run -dit --name fancave-server -p 3080:3080 --link fancave-db:fancave-db ozairs/fancave-server:v1

docker stop fancave-db
docker rm fancave-db
docker run -dit --name fancave-db mongo:latest

## Kubernetes

**Minikube Quick Start**

Delete minikube

```
minikube stop;
minikube delete;
rm -rf ~/.minikube .kube;
brew uninstall kubectl;
```

Install minikube

```
brew update && brew install kubectl
```

```
  minikube start \
	--extra-config=controller-manager.ClusterSigningCertFile="/var/lib/localkube/certs/ca.crt" \
	--extra-config=controller-manager.ClusterSigningKeyFile="/var/lib/localkube/certs/ca.key" \
	--extra-config=apiserver.Admission.PluginNames=NamespaceLifecycle,LimitRanger,ServiceAccount,PersistentVolumeLabel,DefaultStorageClass,DefaultTolerationSeconds,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota \
	--kubernetes-version=v1.9.0 \
  --vm-driver hyperkit --cpus 8 --memory 10240
eval $(minikube docker-env)
```

Build the docker images

```
eval $(minikube docker-env)
docker pull mongo
docker build -t ozairs/fancave-server:v1 /Users/ozairs/git/tutorials/megafanz/kubernetes/../.
```

**Kubernetes Commands**

* Delete the Fancave application

	```
	kubectl delete deployment fancave-client fancave-teams fancave-players fancave-news fancave-db
	kubectl delete service fancave-client fancave-teams fancave-players fancave-news fancave-db
	kubectl delete configmap fancave-client-configmap fancave-model-players-config fancave-model-teams-config fancave-model-news-config fancave-ds-players-config fancave-ds-teams-config fancave-ds-news-config
	kubectl delete ingress gateway
  istioctl delete egressrule yahoo-query-egress yahoo-sports-egress
	```

* Create the Fancave application

	```
	kubectl create -f ./fancave-db/
	kubectl create -f ./fancave-news/
	kubectl create -f ./fancave-players/
	kubectl create -f ./fancave-teams/
	kubectl create -f ./fancave-client/
	kubectl create -f ./istio/ingress.yaml
	```

**Helpful Links**
* [Ingress with TLS](https://www.ibm.com/support/knowledgecenter/en/SS5PWC/front_end_tls_ingress_task.html)



## Istio

### Fancave Application

* Create the Fancave application with Istio

	Example: `kubectl create -f <(istioctl kube-inject -f <your-app-spec>.yaml)`

	```
  kubectl create -f ./fancave-db/mongodb-claim.yaml
	kubectl create -f <(istioctl kube-inject -f ./fancave-db/mongodb-deployment.yaml)
	kubectl create -f <(istioctl kube-inject -f ./fancave-db/mongodb-service.yaml)

	kubectl create -f <(istioctl kube-inject -f ./fancave-players/fancave-ds-config.yaml)
	kubectl create -f <(istioctl kube-inject -f ./fancave-players/fancave-model-config.yaml)
	kubectl create -f <(istioctl kube-inject -f ./fancave-players/fancave-server-deployment.yaml)
	kubectl create -f <(istioctl kube-inject -f ./fancave-players/fancave-server-service.yaml)

  kubectl create -f <(istioctl kube-inject -f ./fancave-news/fancave-ds-config.yaml --includeIPRanges=10.0.0.1/24)
	kubectl create -f <(istioctl kube-inject -f ./fancave-news/fancave-model-config.yaml --includeIPRanges=10.0.0.1/24)
	kubectl create -f <(istioctl kube-inject -f ./fancave-news/fancave-server-deployment.yaml --includeIPRanges=10.0.0.1/24)
	kubectl create -f <(istioctl kube-inject -f ./fancave-news/fancave-server-service.yaml --includeIPRanges=10.0.0.1/24)

	kubectl create -f <(istioctl kube-inject -f ./fancave-teams/fancave-ds-config.yaml --includeIPRanges=10.0.0.1/24)
	kubectl create -f <(istioctl kube-inject -f ./fancave-teams/fancave-model-config.yaml --includeIPRanges=10.0.0.1/24)
	kubectl create -f <(istioctl kube-inject -f ./fancave-teams/fancave-server-deployment.yaml --includeIPRanges=10.0.0.1/24)
	kubectl create -f <(istioctl kube-inject -f ./fancave-teams/fancave-server-service.yaml --includeIPRanges=10.0.0.1/24)

	#kubectl create -f <(istioctl kube-inject -f ./fancave-ui/fancave-ui-deployment.yaml)
	#kubectl create -f <(istioctl kube-inject -f ./fancave-ui/fancave-ui-service.yaml)
  #kubectl create -f <(istioctl kube-inject -f ./fancave-ui/fancave-ui-config.yaml)

  kubectl create -f <(istioctl kube-inject -f ./fancave-client/fancave-ds-config.yaml)
  kubectl create -f <(istioctl kube-inject -f ./fancave-client/fancave-client-deployment.yaml)
	kubectl create -f <(istioctl kube-inject -f ./fancave-client/fancave-client-service.yaml)

	kubectl create -f <(istioctl kube-inject -f ./istio/ingress.yaml)
  istioctl create -f ./istio/egress.yaml
	```

* Sending requests

	Lookup the Istio ingress
	```
	export GATEWAY_URL=$(kubectl get po -l istio=ingress -n istio-system -o 'jsonpath={.items[0].status.hostIP}'):$(kubectl get svc istio-ingress -n istio-system -o 'jsonpath={.spec.ports[0].nodePort}')
  echo $GATEWAY_URL
	```
  #https://192.168.64.22:30250/index.html#/tabs
  http://$GATEWAY_URL/index.html#/tabs

* Naming rules
 * service name (under specs) should contain `http` or `http-name`
 * pod lookups does not work with name http (ie database)
 * out.fancave-ui.default.svc.cluster.local|http

* Creating a service graph
 * install: `kubectl apply -f install/kubernetes/addons/servicegraph.yaml`
 * Admin: `kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=servicegraph -o jsonpath='{.items[0].metadata.name}') 8088:8088`
 * View: http://localhost:8088/force/forcegraph.html?time_horizon=15s&filter_empty=true 

### Metrics collections

Uses a three-object approach to define configuration:
* metric: identifies how to collect data and associate values to them
* handler: takes data from `kind` and performs an action on the data
* rule: conditional invoke handler for each transaction
  
**Metrics**

  * Metrics: specify metadata to identify the requests and a value for each request
  * Prometheus handler: allow you to map the metrics into prometheus metrics, referencing existing metrics instance (above)
  * Rule: references the prometheus handler and metrics instances to collect metrics and send them to prometheus

**Logs**

  * Metrics: specify metadata to instruct the mixer to generate data from Envoy
  * Handler: (adapter) how to map metrics into the logging sub system (ie log level and format)
  * Rule: references the metrics and handler, telling mixer to send data to the above handler

  kubectl apply -f ~install/kubernetes/addons/grafana.yaml
  kubectl apply -f ~/install/kubernetes/addons/prometheus.yaml

  `istioctl create -f istio/logging.yaml`

  kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') 9090:9090
  kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000
  http://localhost:3000/dashboard/db/istio-dashboard 

**Instructions**

* Install Zipkin: `kubectl apply -f install/kubernetes/addons/zipkin.yaml`
* Setup Port forwarding: `kubectl port-forward -n istio-system $(kubectl get pod -n istio-system -l app=zipkin -o jsonpath='{.items[0].metadata.name}') 9411:9411`
http://localhost:9411

### Rate Limiting

Enforce rate limits between microservices (source & destination) based on transactions executed within time period (sliding window)

The core components
  * quota: maps the attributes from the request to the metadata defined in the memquota handler
  * memquota handler: define the default limit and service-specific overrides, including metadata about the service that will be restricted
  * quota rule: references the quota and memquote handler to define a rule, optionally restrict rule execution based on environment (ie namespaces)

### Routing
 * Create rules for routing to destination services
  ```
  kind: RouteRule
  metadata:
    name: reviews-default
    namespace: default
    ...
  spec:
    destination:
      name: reviews
    precedence: 1
    route:
    - labels:
        version: v1
  ```
  The `spec` stanza can define a match attribute, for example
  ```
  match
    request:
        headers:
          cookie:
            regex: ^(.*?;)?(user=jason)(;.*)?$
  ```

  The `spec` stanza can include a simulated (backend) latency to the requesting service
  ```
  httpFault:
    delay:
      fixedDelay: 7.000s
      percent: 100
  ```
  Similarly, the `spec` stanza can enforce a request time out limit when calling services
  ```
  httpReqTimeout:
    simpleTimeout:
      timeout: 1s
  ```

  The `spec -> route` stanza can perform content based routing based on the container selector using the *weight* attribute.
  ```
  route:
  - labels:
      version: v1
    weight: 90
  - labels:
      version: v3
    weight: 10
  ```

### Tracing

* Trace is comprised of spans, where each span corresponds to a service invoked during the execution of a request
* Tracing requires propagation of the following HTTP headers
  * x-request-id
  * x-b3-traceid
  * x-b3-spanid
  * x-b3-parentspanid
  * x-b3-sampled
  * x-b3-flags
  * x-ot-span-context

* Mixer can generate and report metrics and log streams for all traffic within the mesh.

## Helm

Package manager for kubernetes that allows you to deploy, package, release, deploy, delete, upgrade and rollback deployments.

Charts is a package of kubernetes resources and toller is the helm server that runs the packages.

Package the chart as a release by running : 

`helm package app-chart`

 where `app-chart` is a folder containing a set of files, specifically a values.yaml that defines the kubernetes resources to deploy and their runtime operational requirements

```
replicaCount: 2
image:
  repository: ozairs/loopback
  tag: latest
  pullPolicy: IfNotPresent
service:
  name: loopback
  type: ClusterIP
  externalPort: 3000
  internalPort: 3000
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi
```

You can package the chart as a release using the command

`helm package loopback`

It creates an archive with the name loopback.tgz. This file can then be deployed using the command

`helm install loopback.tgz`


Demo

helm install pokemon-app-0.1.0.tgz --name pokemon
helm install elk-0.1.0.tgz --name elk --set fluent.env.match=pokemon