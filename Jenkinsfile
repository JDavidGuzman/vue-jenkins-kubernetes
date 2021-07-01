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
            steps {
                container('node') {
                    sh '''
                    npm run build
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
            steps {
                script {
                    input(message: 'Would you like to delete the deployment?')
                }
                container('kubectl') {
                    script {
                        if (env.BRANCH_NAME == 'master') {
                                sh '''
                                echo NOT ABLE TO DELETE A DEPLOYMENT ON PRODUCTION
                                '''
                        } else {
                            sh '''
                            kubectl delete po nginx -n ${BRANCH_NAME}
                            '''
                        }
                    }
                }
            }
        }
    }
}
