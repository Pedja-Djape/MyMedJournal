#!/bin/bash
# gcloud auth configure-docker northamerica-northeast2-docker.pkg.dev

LOCAL_IMAGE_NAME='express_backend'
IMAGE_NAME="northamerica-northeast2-docker.pkg.dev/medappfrontend-389603/mycontainers/$LOCAL_IMAGE_NAME"

docker buildx build --platform linux/amd64 -t $LOCAL_IMAGE_NAME .


docker tag $LOCAL_IMAGE_NAME $IMAGE_NAME

docker push $IMAGE_NAME

gcloud artifacts docker images list $IMAGE_NAME
