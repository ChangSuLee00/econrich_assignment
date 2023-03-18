# API 명세서

https://documenter.getpostman.com/view/25353027/2s93Juu3eA

# AWS 주소

https://www.cslee0112.com

# Test

1. Unit test

<img width="275" alt="unit_test" src="https://user-images.githubusercontent.com/98637739/225929205-b583ebe9-5b99-49e6-a9e7-af2c3b19e9eb.png">

2. e2e test

<img width="322" alt="e2e_test" src="https://user-images.githubusercontent.com/98637739/225929276-5aa20c15-855d-42ba-a21b-b8158ad3e8fa.png">

# Architecture

![image](https://user-images.githubusercontent.com/98637739/226098167-393a0925-30e5-4f9f-8e8d-98dbd4b58a3f.png)

Nginx를 이용해 리버스 프록시 서버를 구축하고 HTTPS 통신을 하도록 구성했습니다.

PM2를 이용해 클러스터를 만들어 무중단 서비스를 구현했습니다.

RDS를 이용해 서버의 예상치 못한 종료에 대비해 DB 클라우드화를 했습니다.

Winston과 Daily Logger를 이용해 Log 파일을 관리하도록 했습니다.
