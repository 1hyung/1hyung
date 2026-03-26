# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

이 저장소는 1hyung의 GitHub 프로필 페이지로, 드래곤 테마의 시각화를 제공합니다. 주요 기능은 GitHub 기여도 데이터를 드래곤 스프라이트로 시각화하는 SVG 생성기입니다.

## 아키텍처

### Dragon Contribution Visualization System

`.github/scripts/` 디렉토리의 TypeScript 모듈들로 구성된 SVG 생성 시스템:

#### 핵심 모듈 구조

1. **types.ts**: 전역 타입 정의 및 기본 설정
   - `ContributionCalendar`: GitHub API 응답 타입 (5개 상세 통계 포함)
   - `DEFAULT_CONFIG`: SVG 캔버스 및 그리드 레이아웃 설정
   - 캔버스: 1280×850px
   - 그리드: 셀 크기 22px, 간격 2px, 위치 (4, 190)

2. **github-api.ts**: GitHub GraphQL API 연동
   - `fetchContributions()`: 기여도 데이터 및 통계 가져오기
   - 가져오는 통계: Commits, Repos, Issues, PRs, Reviews

3. **sprites.ts**: 픽셀 아트 스프라이트 생성
   - `PX = 2.4`: 픽셀 단위 (22% 확대된 크기)
   - 드래곤 스프라이트 3종:
     - Level 0-1: 드래곤 알 (29×34px)
     - Level 2-3: 부화 중 (38×43px)
     - Level 4: 성체 드래곤 (48×48px)
   - 통계 아이콘 5종 (16×16px): 커밋(불꽃), 저장소(보물상자), 이슈(경고 크리스탈), PR(병합 화살표), 리뷰(드래곤 눈)

4. **colors.ts**: 드래곤 테마 색상 팔레트
   - 향상된 대비: 밝은 빨강(`#d32f2f`), 어두운 외곽선(`#8b0000`)
   - 알 색상: 어두운 베이스(`#6b3410`), 밝은 하이라이트(`#d2691e`)
   - 배경: 화산 테마 (용암, 암석, 하늘 그라데이션)

5. **background.ts**: 화산 배경 레이어
   - 레이어 구조 (y축):
     - 0-100: 하늘 (그라데이션)
     - 160-360: 지면 레이어
     - 360-750: 중간 지반 (암석 텍스처)
     - 750-850: 용암 강
   - `createMidGroundTexture()`: 배경 공백 제거용 추가 텍스처
   - 필터: 용암 발광, 연기 흐림, 스프라이트 그림자, Level 4 드래곤 발광

6. **svg-generator.ts**: SVG 생성 오케스트레이션
   - `createStatsDisplay()`: 5개 통계 바 + 아이콘 렌더링
     - 위치: y=120-180
     - 애니메이션: 바 너비 증가 효과
   - `createContributionGrid()`: 기여도 → 드래곤 스프라이트 매핑
     - Level 4 드래곤에 발광 필터 적용
   - `getSpriteSize()`: 레벨별 스프라이트 크기 반환

#### 데이터 흐름

```
GitHub GraphQL API
  ↓ (fetchContributions)
ContributionCalendar + 통계 데이터
  ↓ (createGridCells)
GridCell[] (날짜, 카운트, 레벨)
  ↓ (generateSVG)
SVG 문자열 (배경 + 그리드 + 통계 + 레이블)
  ↓
dragon-contrib/dragon-contrib.svg
```

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

### 레이아웃 치수 (types.ts:51-58)

- 캔버스: 1280×850px
- 셀 크기: 22px (이전 18px에서 22% 증가)
- 셀 간격: 2px
- 그리드 오프셋: x=4, y=190
- 53주 × 7일 = 1272×168px 그리드 영역

### 스프라이트 크기 (sprites.ts:5, svg-generator.ts:38-50)

- PX 스케일: 2.4 (각 픽셀 아트 단위 = 2.4 SVG 단위)
- 드래곤 알: 12×14 픽셀 = 29×34 SVG 단위
- 부화 중: 16×18 픽셀 = 38×43 SVG 단위
- 성체 드래곤: 20×20 픽셀 = 48×48 SVG 단위

### 통계 바 (svg-generator.ts:169-233)

- 위치: x=100, y=120
- 항목 너비: 216px (5개 통계 균등 배치)
- 바 높이: 12px
- 최대 바 너비: 180px
- 아이콘 크기: 16×16px

## 코드 수정 시 주의사항

### 스프라이트 크기 변경

스프라이트 크기를 변경할 때는 다음 3곳을 동기화해야 합니다:
1. `sprites.ts`의 `PX` 상수
2. `svg-generator.ts`의 `getSpriteSize()` 함수
3. 각 스프라이트 생성 함수의 픽셀 좌표

### 레이아웃 변경

그리드 위치나 배경 레이어를 변경할 때:
1. `types.ts`의 `DEFAULT_CONFIG` 업데이트
2. `background.ts`의 y축 좌표 조정 (지면, 중간층, 용암)
3. SVG 높이 변경 시 `config.height` 기반 계산식 확인

### 새 통계 추가

새로운 GitHub 통계를 추가하려면:
1. `types.ts`: `ContributionCalendar`와 `ContributionData` 인터페이스에 필드 추가
2. `github-api.ts`: GraphQL 쿼리에 필드 추가 및 반환값 매핑
3. `sprites.ts`: 새 아이콘 생성 함수 추가
4. `svg-generator.ts`: `createStatsDisplay()`의 stats 배열에 항목 추가

## 자동화

- **스케줄**: 매일 03:00 KST (18:00 UTC)
- **트리거**: `.github/scripts/**` 또는 워크플로우 파일 변경 시
- **환경 변수**: `GITHUB_TOKEN` (secrets.TOKEN 사용)
- **커밋 사용자**: 1hyung (dev.1hyung@gmail.com)
