# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

이 저장소는 1hyung의 GitHub 프로필 페이지로, 드래곤 테마의 시각화를 제공합니다.

**주요 기능**:
1. **Dragon Contribution Visualization**: GitHub 기여도 데이터를 등각 투영 드래곤 스프라이트로 시각화
2. **통계 차트**: 5축 레이더 차트 (Commits, Repos, Issues, PRs, Reviews) + 언어별 도넛 차트
3. **README 섹션 SVG**: 드래곤 헤더, 기술 스택, 경력, 소셜 섹션 SVG 자동 생성

**기술 스택** (README.md 기준):
- Backend: Kotlin, Spring Boot, MySQL, Apache Kafka, gRPC
- DevOps: Docker, Kubernetes
- Tools: IntelliJ IDEA, Jira, Confluence, Slack, Notion
- AI: Claude, Prompt Engineering

**경력**:
- MOVV Corp (2025.06 ~ Present)
- Backend Engineer → QA Engineer → Prompt Engineer

## 아키텍처

### Dragon Contribution Visualization System

`.github/scripts/` 디렉토리의 TypeScript 모듈들로 구성된 등각 투영 기반 SVG 생성 시스템:

#### 핵심 모듈 구조

1. **types.ts**: 전역 타입 정의 및 기본 설정
   - `ContributionCalendar`: GitHub API 응답 타입 (5개 상세 통계 포함)
   - `LanguageEdge`, `Repository`: 언어 데이터 타입
   - `DEFAULT_CONFIG`: SVG 캔버스 및 등각 투영 그리드 설정
   - 캔버스: **850×520px** (profile-3d-contrib 스타일)
   - 등각 투영 셀: 너비 20px, 높이 12px, 오프셋 (50, 60)

2. **github-api.ts**: GitHub GraphQL API 연동
   - `fetchContributions()`: 기여도 데이터, 통계, 언어 데이터 일괄 가져오기
   - 가져오는 데이터: Commits, Repos, Issues, PRs, Reviews + Repository Languages
   - 단일 GraphQL 쿼리로 모든 데이터 fetch (효율적)

3. **isometric.ts**: 등각 투영 좌표 변환 (신규)
   - `toIsometric()`: 2D 그리드 → 등각 투영 좌표 변환
   - `createIsometricDragonGrid()`: 등각 투영 드래곤 그리드 생성
   - `createGridCells()`: 주별 기여도 데이터 → GridCell 배열 변환
   - z-order 정렬로 올바른 렌더링 순서 보장

4. **sprites.ts**: 픽셀 아트 스프라이트 생성
   - `PX = 1.6`: 픽셀 단위 (등각 투영용으로 조정)
   - 드래곤 스프라이트 4종:
     - Level 0: 빈 셀 (렌더링 안함)
     - Level 1-2: 드래곤 알 (20×24px)
     - Level 3: 부화 중 (26×30px)
     - Level 4: 성체 드래곤 (32×32px) + 발광 효과
   - 통계 아이콘 5종 (16×16px): 커밋(불꽃), 저장소(보물상자), 이슈(경고 크리스탈), PR(병합 화살표), 리뷰(드래곤 눈)

5. **charts.ts**: 데이터 시각화 차트 생성 (신규)
   - `createRadarChart()`: 5축 레이더 차트 (Commits, Repos, Issues, PRs, Reviews)
   - `createDonutChart()`: 언어별 도넛 차트 (GitHub Linguist 색상)
   - `processLanguageData()`: 언어 데이터 집계 및 정규화

6. **colors.ts**: 드래곤 테마 + GitHub Dark 테마 색상
   - 드래곤 색상: 밝은 빨강(`#d32f2f`), 어두운 외곽선(`#8b0000`), 골드(`#ffd700`)
   - 알 색상: 어두운 베이스(`#6b3410`), 밝은 하이라이트(`#d2691e`)
   - GitHub Dark 테마: 배경(`#0d1117`), 회색(`#8b949e`), 테두리(`#30363d`)

7. **background.ts**: 어두운 배경 + SVG 필터
   - `createDarkBackground()`: GitHub Dark 테마 배경 (#0d1117)
   - `createBackgroundFilters()`: 발광 효과, 그림자, 노이즈 필터
   - Level 4 드래곤에 발광 필터 적용

8. **svg-generator.ts**: SVG 생성 오케스트레이션
   - `generateSVG()`: 정적 SVG 생성
   - `generateAnimatedSVG()`: CSS 애니메이션 추가된 SVG 생성
   - `createHeader()`: 제목 + 날짜 범위 헤더
   - `createStatsSection()`: 통계 요약 섹션 (하단)
   - 레이아웃: 등각 투영 그리드 (중앙-좌측) + 레이더 차트 (우측 상단) + 도넛 차트 (좌측 하단)

#### 데이터 흐름

```
GitHub GraphQL API
  ↓ (CONTRIBUTION_QUERY - 단일 쿼리)
ContributionData {
  - contributionCalendar (기여도 캘린더)
  - 5개 통계 (Commits, Repos, Issues, PRs, Reviews)
  - repositories (언어 데이터)
}
  ↓ (createGridCells)
GridCell[] (x, y, date, count, level)
  ↓ (toIsometric + z-order 정렬)
등각 투영 좌표 + 드래곤 스프라이트
  ↓ (generateSVG)
SVG 문자열 {
  - 어두운 배경 (#0d1117)
  - 등각 투영 드래곤 그리드
  - 레이더 차트 (5축)
  - 도넛 차트 (언어)
  - 헤더 + 통계 섹션
}
  ↓
dragon-contrib/dragon-contrib.svg (정적)
dragon-contrib/dragon-contrib-animate.svg (애니메이션)
```

#### 등각 투영 원리

등각 투영 변환 공식:
```
x' = gridOffsetX + (col - row) * cellWidth / 2
y' = gridOffsetY + (col + row) * cellHeight / 2 - heightOffset
```

- **heightOffset**: 기여도 레벨에 따라 스프라이트를 Y축으로 위로 올림
  - Level 0: 0px
  - Level 1: -5px
  - Level 2: -10px
  - Level 3: -15px
  - Level 4: -25px (가장 높이 솟아오름)

- **z-order**: `row + col` 값으로 정렬하여 뒤에서 앞으로 렌더링

## 개발 명령어

### 로컬 개발

```bash
# 의존성 설치
cd .github/scripts
npm install

# 타입 체크
npx tsc --noEmit

# SVG 생성 (환경 변수 필요)
export GITHUB_TOKEN="ghp_your_token_here"
npx ts-node generate-dragon.ts
```

### GitHub Actions

```bash
# 워크플로우 수동 실행
gh workflow run dragon-contrib.yml

# 워크플로우 로그 확인
gh run list --workflow=dragon-contrib.yml
gh run view <run-id> --log
```

### 출력 파일

- `dragon-contrib/dragon-contrib.svg`: 정적 SVG
- `dragon-contrib/dragon-contrib-animate.svg`: 애니메이션 SVG (CSS 애니메이션 포함)

## 주요 설정값

### 레이아웃 치수 (types.ts)

**캔버스 크기**: 850×520px (profile-3d-contrib 스타일)

**등각 투영 그리드**:
- 셀 너비: 20px
- 셀 높이: 12px
- 그리드 오프셋: x=50, y=60
- 53주 × 7일 = 371개 셀

**레이아웃 구성**:
```
┌────────────────────────────────────────┐
│  DRAGON LAIR              날짜 범위     │  y=30 (헤더)
├────────────────────────────────────────┤
│                                        │
│       등각 투영           레이더 차트   │  y=60-350
│       드래곤 그리드       (5축 통계)    │
│                                        │
│  도넛 차트                             │  y=370-500
│  (언어)        통계 요약 섹션          │
└────────────────────────────────────────┘
```

**차트 위치**:
- 레이더 차트: transform="translate(620, 120)", 반지름 80px
- 도넛 차트: centerX=130, centerY=430, 외부 반지름 70px, 내부 반지름 40px
- 통계 섹션: y=420

### 스프라이트 크기 (sprites.ts, isometric.ts)

**PX 스케일**: 1.6 (등각 투영용 조정)

**레벨별 스프라이트 크기**:
| Level | 스프라이트 | 크기 (px) | 높이 오프셋 |
|-------|-----------|----------|------------|
| 0 | 빈 셀 | - | 0px |
| 1-2 | 드래곤 알 | 20×24 | -5px / -10px |
| 3 | 부화 중 | 26×30 | -15px |
| 4 | 성체 드래곤 | 32×32 | -25px |

**통계 아이콘**: 16×16px (고정 크기)

### 차트 설정 (charts.ts)

**레이더 차트**:
- 5개 축: Commits, Repos, Issues, PRs, Reviews
- 각도: 0°, 72°, 144°, 216°, 288° (오각형)
- 그리드 레벨: 33%, 66%, 100% (3단계)
- 색상: 드래곤 오렌지(`rgba(255, 107, 53, 0.3)`)

**도넛 차트**:
- 상위 10개 언어 표시
- GitHub Linguist 색상 사용
- 범례: 상위 5개 언어 + 퍼센트

## 코드 수정 시 주의사항

### 스프라이트 크기 변경

스프라이트 크기를 변경할 때는 다음을 동기화해야 합니다:
1. `sprites.ts`의 `PX` 상수
2. `isometric.ts`의 `getSpriteSize()` 함수
3. 각 스프라이트 생성 함수의 픽셀 좌표

### 등각 투영 레이아웃 변경

등각 투영 그리드 위치나 설정을 변경할 때:
1. `types.ts`의 `DEFAULT_CONFIG` 업데이트 (cellWidth, cellHeight, offsets)
2. `isometric.ts`의 `toIsometric()` 함수에서 변환 공식 조정
3. `svg-generator.ts`의 차트 transform 좌표 조정
4. SVG 캔버스 크기 변경 시 `config.width`, `config.height` 기반 계산식 확인

### 차트 추가 또는 수정

새로운 차트를 추가하거나 기존 차트를 수정할 때:
1. `charts.ts`: 새 차트 생성 함수 추가 (예: `createBarChart()`)
2. `svg-generator.ts`: `generateSVG()`에서 새 차트 호출 및 배치
3. 레이아웃 겹침 방지를 위해 transform 좌표 조정

### 새 통계 추가

새로운 GitHub 통계를 추가하려면:
1. `types.ts`: `ContributionData` 인터페이스에 필드 추가
2. `github-api.ts`: GraphQL 쿼리에 필드 추가 (`CONTRIBUTION_QUERY`)
3. `charts.ts`: 레이더 차트의 `RadarChartData` 인터페이스에 축 추가
4. `svg-generator.ts`: 레이더 차트 데이터에 새 통계 매핑

### 언어 데이터 처리

언어 도넛 차트의 색상이나 로직을 변경할 때:
1. `charts.ts`의 `processLanguageData()` 함수 수정
2. `colorMap` 객체에 새 언어 색상 추가 (GitHub Linguist 표준 준수)
3. 도넛 차트 범례 항목 수 조정 (현재: 상위 5개)

## 자동화

### GitHub Actions 워크플로우

**dragon-contrib.yml**:
- **스케줄**: 매일 03:00 KST (18:00 UTC)
- **트리거**:
  - 스케줄 (cron)
  - 수동 실행 (workflow_dispatch)
  - Push to main (`.github/scripts/**` 또는 워크플로우 파일 변경 시)
- **환경 변수**: `GITHUB_TOKEN` (secrets.TOKEN 사용), `USERNAME` (repository owner)
- **Node.js 버전**: 20
- **커밋 사용자**: 1hyung (dev.1hyung@gmail.com)
- **출력**: dragon-contrib.svg, dragon-contrib-animate.svg

**main.yml**:
- **스케줄**: 매일 03:00 KST (18:00 UTC)
- **외부 액션**: `yoshi389111/github-profile-3d-contrib@0.7.1`
- **출력**: profile-3d-contrib/ 디렉토리에 3D 기여도 시각화

### 수동 워크플로우 실행

```bash
# Dragon contribution 워크플로우 실행
gh workflow run dragon-contrib.yml

# 실행 결과 모니터링
gh run watch <run-id>

# 실행 로그 확인
gh run view <run-id> --log
```

### README 섹션 SVG 생성

```bash
cd .github/scripts
npx ts-node generate-sections.ts
```

- 생성 파일: assets/dragon-header.svg, tech-stack-section.svg, experience-section.svg, social-section.svg

## 디렉토리 구조

```
1hyung/
├── .github/
│   ├── scripts/                    # TypeScript 모듈 (SVG 생성 시스템)
│   │   ├── types.ts               # 타입 정의
│   │   ├── github-api.ts          # GitHub API 연동
│   │   ├── isometric.ts           # 등각 투영 변환
│   │   ├── sprites.ts             # 드래곤 스프라이트
│   │   ├── charts.ts              # 레이더/도넛 차트
│   │   ├── colors.ts              # 색상 팔레트
│   │   ├── background.ts          # 배경 + 필터
│   │   ├── svg-generator.ts       # SVG 생성 오케스트레이션
│   │   ├── generate-dragon.ts     # Dragon contribution 생성 엔트리포인트
│   │   ├── generate-sections.ts   # README 섹션 SVG 생성
│   │   ├── package.json           # npm 설정
│   │   └── tsconfig.json          # TypeScript 설정
│   └── workflows/
│       ├── dragon-contrib.yml     # Dragon contribution 자동화
│       └── main.yml               # 3D profile 자동화
├── assets/                         # README 섹션 SVG 파일
├── dragon-contrib/                 # Dragon contribution 출력
│   ├── dragon-contrib.svg
│   └── dragon-contrib-animate.svg
├── profile-3d-contrib/             # 3D profile 출력 (외부 액션)
├── CLAUDE.md                       # 개발자 가이드 (본 파일)
└── README.md                       # GitHub 프로필 페이지
```

## TypeScript 설정

**tsconfig.json** 주요 설정:
- Target: ES2020
- Module: CommonJS
- Strict mode: 활성화
- Source maps: 활성화
- Output directory: 지정 안함 (ts-node 직접 실행)

**의존성** (package.json):
- `@octokit/graphql`: GitHub GraphQL API 클라이언트
- `ts-node`: TypeScript 런타임
- `typescript`: TypeScript 컴파일러

## 환경 변수

**필수 환경 변수**:
- `GITHUB_TOKEN`: GitHub Personal Access Token (read:user, repo 스코프 필요)
- `USERNAME`: GitHub 사용자명 (기본값: "1hyung")

**로컬 개발 시 설정**:
```bash
export GITHUB_TOKEN="ghp_your_token_here"
export USERNAME="1hyung"
```

**GitHub Actions에서는**:
- `secrets.TOKEN`을 `GITHUB_TOKEN`으로 주입
- `github.repository_owner`를 `USERNAME`으로 주입

## 성능 및 최적화

**SVG 파일 크기**:
- dragon-contrib.svg: ~4MB (371개 드래곤 스프라이트 × 픽셀 아트 데이터)
- 압축 미사용 (GitHub에서 자동 압축)

**GraphQL 쿼리 최적화**:
- 단일 쿼리로 모든 데이터 fetch (기여도 + 통계 + 언어)
- 언어 데이터: 저장소당 상위 10개, 총 100개 저장소

**렌더링 최적화**:
- z-order 정렬로 올바른 등각 투영 렌더링
- Level 0 (빈 셀)은 렌더링 스킵
- CSS 애니메이션은 별도 파일로 분리 (dragon-contrib-animate.svg)

## 알려진 제약사항

1. **언어 데이터**: 최대 100개 저장소만 쿼리 (GitHub GraphQL API 제한)
2. **SVG 크기**: 픽셀 아트 특성상 파일 크기가 큼 (~4MB)
3. **실시간 업데이트 없음**: GitHub Actions 스케줄에 따라 하루 1회 업데이트
4. **GitHub API 제한**: Rate limit 초과 시 워크플로우 실패 가능 (secrets.TOKEN 권한 확인 필요)
