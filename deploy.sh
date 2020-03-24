docker build -t bidego/educacion-digital-client:latest bidego/educacion-digital-client:$SHA -f ./client
docker build -t bidego/educacion-digital-server:latest bidego/educacion-digital-server:$SHA -f ./server
docker build -t bidego/educacion-digital-worker:latest bidego/educacion-digital-worker:$SHA -f ./worker
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