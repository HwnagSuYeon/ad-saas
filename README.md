# Ad Analytics SaaS Dashboard

광고 이벤트 데이터를 프로젝트 / 채널 / 이벤트 유형 / 일자별로 집계해
대시보드에서 바로 활용할 수 있는 통계 API와 UI를 구현한 SaaS 형태의 개인 포트폴리오입니다.

Java/Spring 기반의 공공·업무 시스템 백엔드 실무 경험을 바탕으로,
Node.js / TypeScript / NestJS / Prisma 기반 백엔드 구조와
대시보드형 서비스 개발 방식을 익히기 위해 진행했습니다.

## 프로젝트 개요

이 프로젝트는 광고 이벤트 데이터를 수집하고,
프로젝트별 / 채널별 / 이벤트 유형별 / 일자별 통계 데이터를 시각화하는 대시보드를 구현한 프로젝트입니다.

단순 CRUD 구현에 그치지 않고,
실제 서비스 화면에서 활용할 수 있는 통계 API 응답 구조 설계,
프로젝트 단위 그룹화, 차트 연동을 고려한 데이터 가공에 중점을 두었습니다.

## 기술 스택

- Backend: Node.js, TypeScript, NestJS, Prisma, PostgreSQL
- Frontend: React, TypeScript
- Tooling: Git, GitHub

## 주요 구현 사항

- 프로젝트별 이벤트 수 집계 API 구현
- 채널별 이벤트 수 집계 API 구현
- 이벤트 유형별 통계 API 구현
- 일자별 이벤트 수 집계 API 구현
- 프로젝트 > 채널 구조로 그룹화된 응답 설계
- Prisma 기반 데이터 모델링 및 마이그레이션 구성
- Seed 데이터를 통한 실행 가능한 개발 환경 구성

## 화면 예시

### 메인 대시보드
![메인 대시보드](./assets/dashboard-main.png)

### 통계 카드 및 차트
![통계 차트](./assets/dashboard-channel.png)


## 프로젝트 구조

- `backend-api` : NestJS, Prisma 기반 백엔드 API
- `dashboard-web` : 대시보드 UI 프론트엔드

## 데이터 모델

이 프로젝트는 아래와 같은 구조로 설계했습니다.

- User
  - 프로젝트 소유자 정보
- Project
  - 광고 분석 대상 프로젝트
- ChannelAccount
  - 프로젝트에 연결된 채널 계정 정보
- Event
  - 프로젝트 및 채널 계정 기준 이벤트 로그
- DailyStat
  - 프로젝트별 일자 단위 성과 통계

## 중점적으로 구현한 부분

### 1. 통계형 API 설계

광고 데이터 분석 대시보드에 필요한 핵심 지표를 조회할 수 있도록
프로젝트별, 채널별, 이벤트 유형별, 일자별 통계 API를 구현했습니다.

### 2. 차트 시각화를 고려한 응답 구조

단순 리스트 반환이 아니라 프론트엔드 차트에서 바로 사용할 수 있도록
응답 구조를 설계하고 데이터를 가공했습니다.

특히 채널별 통계는 프로젝트 하위에 채널 목록이 포함되도록 구성해
정보가 과하게 나열되지 않도록 개선했습니다.

### 3. 실행 가능한 샘플 환경 구성

Prisma migration과 seed 데이터를 함께 구성해
로컬 환경에서 DB 생성 후 바로 대시보드를 확인할 수 있도록 만들었습니다.

## 실행 방법

### 1. Backend 실행

```bash
cd backend-api
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run start:dev

### 2. Frontend 실행
cd dashboard-web
npm install
npm run dev

### 3. 환경변수 설정
백엔드 실행 전 backend-api/.env.example 파일을 참고해
backend-api/.env 파일을 생성해야 합니다.

### 4. 샘플데이터
Prisma Seed를 통해 샘플 데이터를 제공합니다.
Seed 실행 시 아래 데이터가 생성됩니다.

사용자
프로젝트
채널 계정
이벤트 로그
일별 통계 데이터

이를통해 프로젝트별 / 채널별 / 이벤트 유형별 / 일자별 차트를 바로 확인할 수 있습니다.

