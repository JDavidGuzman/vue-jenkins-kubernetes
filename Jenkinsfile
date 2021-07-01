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
                    sh '''
                    npm install
                    '''
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
            environment {
                DOCKER_CREDENTIALS = credentials('DOCKER_CREDENTIALS')
            }
            steps {
                container('node') {
                    sh '''
                    npm run build
                    '''
                }
                container('docker') {
                    sh '''
                    ls
                    docker build -t ${DOCKER_CREDENTIALS_USR}/school-vue:${GIT_COMMIT} .
                    docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}
                    docker push ${DOCKER_CREDENTIALS_USR}/school-vue:${GIT_COMMIT}
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                container('kubectl') {
                    script {
                        if (env.BRANCH_NAME == 'master') {
                            sh '''
                            kubectl run nginx --image nginx -n production
                            '''
                        } else {
                            sh '''
                            kubectl run nginx --image nginx -n ${BRANCH_NAME}
                            '''
                        }
                    }
                }
            }
        }
        stage('Delete Deployment') {
            when {
                branch 'development';
                branch 'qa'
            }
            steps {
                script {
                    input(message: 'Would you like to delete the deployment?')
                }
                container('kubectl') {
                    sh '''
                    kubectl delete po nginx -n ${BRANCH_NAME}
                    ''' 
                }
            }
        }
    }
}
