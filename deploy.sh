docker build -t bidego/educacion-digital-client:latest -t bidego/educacion-digital-client:$SHA -f ./client/Dockerfile ./client
docker build -t bidego/educacion-digital-server:latest -t bidego/educacion-digital-server:$SHA -f ./server/Dockerfile ./server
docker build -t bidego/educacion-digital-worker:latest -t bidego/educacion-digital-worker:$SHA -f ./worker/Dockerfile ./worker
docker push bidego/educacion-digital-client:latest
docker push bidego/educacion-digital-client:latest
docker push bidego/educacion-digital-server:latest
docker push bidego/educacion-digital-worker:$SHA
docker push bidego/educacion-digital-client:$SHA
docker push bidego/educacion-digital-server:$SHA
kubectl apply -f k8s
kubectl set image deployments/client-deployment client=bidego/educacion-digital-client:$SHA
kubectl set image deployments/server-deployment server=bidego/educacion-digital-server:$SHA
kubectl set image deployments/worker-deployment worker=bidego/educacion-digital-worker:$SHA