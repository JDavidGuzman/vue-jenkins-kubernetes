pipeline {
    agent {
        kubernetes {
            yamlFile 'podTemplate.yml'
            defaultContainer 'shell'
            }
        }
    stages {
        stage('Prepare Containers') {
            steps {
                container('node') {
                    sh 'npm install'
                }
                container('kubectl') {
                    sh '''
                    apk update && apk add curl
                    curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
                    chmod +x ./kubectl
                    mv ./kubectl /usr/local/bin/kubectl
                    export KUBECONFIG=/home/.kube/config
                    '''
                }
            }
        }
        stage('Build') {
            steps {
                container('node') {
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                container('node') {
                    sh 'npm run test:unit'
                }
            }
        }
        stage('Push') {
            environment {
                DOCKER_CREDENTIALS = credentials('DOCKER_CREDENTIALS')
            }
            steps {
                container('docker') {
                    sh '''
                    docker build -t ${DOCKER_CREDENTIALS_USR}/school-vue:${GIT_COMMIT} .
                    docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}
                    docker push ${DOCKER_CREDENTIALS_USR}/school-vue:${GIT_COMMIT}
                    docker tag ${DOCKER_CREDENTIALS_USR}/school-vue:${GIT_COMMIT} ${DOCKER_CREDENTIALS_USR}/school-vue:latest
                    docker push ${DOCKER_CREDENTIALS_USR}/school-vue:latest
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                container('kubectl') {
                    script {
                        if ( env.BRANCH_NAME == 'master') {
                            sh 'kubectl apply -k kubernetes/production'
                        } else {
                            sh 'kubectl apply -k kubernetes/${BRANCH_NAME}'
                        }
                    }
                }
            }
        }
        stage('Delete Deployment') {
            when {
                anyOf {
                    branch 'development';
                    branch 'qa'
                }
            }
            steps {
                script {
                    input(message: 'Would you like to delete the deployment?')
                }
                container('kubectl') {
                    sh 'kubectl delete -k kubernetes/${BRANCH_NAME}' 
                }
            }
        }
    }
}
