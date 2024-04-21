pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/Akshayraj5353/caterorange-jenkins.git'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    docker.build('build-with-jenkins', '.')
                }
            }
        }
    }
}
