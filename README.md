# 도서 관리 API
### JavaScript + Fastify 

<br>

# 💡 아키텍처 다이어그램
![alt text](outputs/아키텍쳐%20구성도.png)

<br>

## 🎏 사용 기술 스택
사용언어: <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"><br>
플랫폼: <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"><br>
패키지 관리자: <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <br>
서버 프레임워크: <img src="https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><br>
인프라: <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">

<br>

# 📌 인프라 특징
- 해당 서비스는 ECS Fargate에 구성되어 있다.
- WAS는 ECS의 Task로써 구현되어 있다.
- ECS에 통신하기 위한 ALB가 구성되어 있다.
- ALB는 Route 53을 통해 개인 도메인에서 라우팅된다.
- Github Repository의 변경점이 AWS codepipeline이 감지하여, CI/CD 파이프라인이 작동한다.
- WAS는 이미지로써 관리되며, 파이프라인 도중 ECR에 이미지가 저장되고, ECS로 배포된다.

<br>


# 📌 CI/CD 시나리오
- Github 레포지토리에 WAS의 변경사항이 업데이트 되면 AWS Codepipeline이 트리거된다.
- AWS Codepipeline에서 설정된 스테이지대로 파이프라인이 작동한다.
- Code Stage에서는 Github의 코드들을 AWS 상으로 가져온다.
- 가져온 코드들은 Codepipeline이 관리하는 S3에 Source 아티팩트로 저장된다.
- Build stage에서 AWS Codebuild가 S3에 저장된 Source 아티팩트를 가져오고, Buildspec.yml에 정의된 작업들을 실행한다.
- Buildspec.yml에는 소스코드를 이미지로 빌드하고, ECR에 빌드된 이미지를 저장하는 작업이 정의되어 있다.
- Buildspec.yml은 새로 빌드된 이미지에 대해 imagedefinitions.json에 저장하고, 작업이 완료된 코드들을 Build 아티팩트로 만들어 S3에 저장한다.
- Deploy stage에서는 AWS ECS가 S3의 Build 아티팩트에서 이미지 정의 파일인 imagedefinitions.json을 참조하여, 새로운 Task를 생성한다.