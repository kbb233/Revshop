pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/kbb233/Revshop.git'
            }
        }
        stage('Build & Compile') {
            steps {
                script {
                    sh './mvnw clean install'  
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh './mvnw sonar:sonar'
                    }
                }
            }
        }
    }
}
