# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

1hyung의 GitHub 프로필 저장소로, GitHub 기여도 데이터를 **테마별 SVG**로 시각화한다.

**테마 4종** (`.github/scripts/theme.ts`의 `ThemeName`):

| 테마 | 그리드 | 분위기 | 출력 디렉토리 |
|------|--------|--------|---------------|
| `dragon` | 등각(isometric) | GitHub Dark + 드래곤 알/드래곤, 레이더·도넛 차트 | `dragon-contrib/` |
| `succulent` | 평면(flat) | 노을 사막 다육정원(선인장·메사) | `succulent-contrib/` |
| `mountain` | 등각 | 설산 풍경 | `mountain-contrib/` |
| `heungbu` | 평면(일별) | 한옥 초가집 + 박 넝쿨(배경=일러스트 이미지) — **현재 활성** | `heungbu-contrib/` |

현재 GitHub 프로필 README에 노출되는 테마는 **heungbu**이며, 워크플로(`dragon-contrib.yml`)가 `THEME: heungbu`로 매일 재생성한다.

**기술 스택** (README 기준): Backend(Kotlin, Spring Boot, MySQL, Kafka, gRPC), DevOps(Docker, Kubernetes), AI(Claude, Prompt Engineering).
**경력**: MOVV Corp (2025.06~), Backend → QA → Prompt Engineer.

## 아키텍처

### 테마 시스템

모든 테마는 `theme.ts`의 `Theme` 인터페이스를 구현한다. `getTheme(name)`이 테마 객체를 반환하고, `generate-dragon.ts`가 `THEME` 환경변수로 테마를 선택해 SVG를 만든다. (지원하지 않는 이름이면 `getTheme`이 throw)

테마 동작을 가르는 핵심 플래그:

- `gridStyle: 'isometric' | 'flat'` — 등각 투영 격자(dragon, mountain) vs 탑뷰 평면 격자(succulent, heungbu)
- `flatDailyMode` — 열=1일 모드. 최근 `maxDays`일을 `flatMaxRows`행으로 배치 (heungbu: 90일 × 3행)
- `useLevelQuartile` — GitHub 제공 분기 레벨(QUARTILE) 사용(heungbu) vs `count`/maxCount 비율 계산(기타)
- `showCharts` — 레이더·도넛 차트 표시 (dragon만 `true`)
- `showHeader` — false면 배경 이미지가 타이틀을 포함 (mountain, heungbu)
- `flatCellStyle` — 평면 격자 셀 배경/테두리 색 오버라이드
- `configOverride` — 캔버스/그리드 좌표 오버라이드 (기본 850×520, mountain 850×600, heungbu 1200×892)

### 모듈 구조 (`.github/scripts/`)

**공통 코어**
- `types.ts` — 전역 타입 + `DEFAULT_CONFIG`(캔버스 850×520, 등각 셀 20×12)
- `github-api.ts` — GraphQL 단일 쿼리로 기여도 캘린더 + 5개 통계 + 언어 데이터 일괄 fetch
- `isometric.ts` — `toIsometric()`, `createGridCells()`, `createIsometricGrid()`, `createFlatGrid()` (등각/평면 공용 렌더)
- `charts.ts` — `createRadarChart()`, `createDonutChart()` (dragon 전용)
- `svg-generator.ts` — `generateSVG()` / `generateAnimatedSVG()` 오케스트레이션
- `theme.ts` — 테마 정의(`getDragonTheme` 등) + `getTheme()`

**테마별 (각 colors / sprites / background 3종)**
- dragon: `colors.ts`, `sprites.ts`, `background.ts`
- succulent: `succulent-colors.ts`, `succulent-sprites.ts`, `succulent-background.ts`
- mountain: `mountain-colors.ts`, `mountain-sprites.ts`, `mountain-background.ts`
- heungbu: `heungbu-colors.ts`, `heungbu-sprites.ts`, `heungbu-background.ts` (+ `assets/heungbu-bg.jpg`를 배경으로 임베드)

**엔트리/도구**
- `generate-dragon.ts` — 기여도 SVG 생성 엔트리 (`THEME` 환경변수로 테마 선택)
- `switch-theme.ts` — 테마 전환: README 템플릿·워크플로 yml·스프라이트 가이드를 일괄 교체 (`dragon|succulent|mountain|heungbu`)
- `generate-sprite-guide.ts` — `assets/sprite-guide-{theme}.svg` (레벨 0~4 가이드)
- `generate-sections.ts` — README 섹션 SVG (헤더/경력/기술스택/소셜/구분선)

### 데이터 흐름

```
GitHub GraphQL (단일 쿼리)
  → ContributionData (캘린더 + 5통계 + 언어)
  → createGridCells (레벨 계산: useLevelQuartile ? QUARTILE : count비율)
  → 그리드 렌더 (flat: createFlatGrid / isometric: createIsometricGrid)
    + 배경(테마별) + (dragon: 레이더·도넛 차트)
  → SVG 문자열
  → {theme}-contrib/{theme}-contrib.svg  (정적)
    {theme}-contrib/{theme}-contrib-animate.svg  (CSS 애니메이션)
```

## 개발 명령어

```bash
cd .github/scripts
npm install
npx tsc --noEmit                       # 타입 체크

export GITHUB_TOKEN="ghp_..."          # read:user, repo 스코프
export THEME="heungbu"                 # dragon | succulent | mountain | heungbu (미설정 시 succulent)
npx ts-node generate-dragon.ts         # 기여도 SVG 생성
npx ts-node generate-sprite-guide.ts   # 레벨 가이드 (전 테마)
npx ts-node generate-sections.ts       # README 섹션 SVG
npx ts-node switch-theme.ts heungbu [--commit --push]  # 테마 전환
```

워크플로:
```bash
gh workflow run dragon-contrib.yml
gh run list --workflow=dragon-contrib.yml
gh run view <run-id> --log
```

## 출력 파일

- `{theme}-contrib/{theme}-contrib.svg` (정적), `-animate.svg` (애니메이션) — theme ∈ {dragon, succulent, mountain, heungbu}
- `assets/{theme}-header.svg` (heungbu는 `heungbu-header.jpg`), `assets/sprite-guide-{theme}.svg`, `assets/section-divider*.svg`

## 코드 수정 시 주의사항

- **스프라이트 크기/모양 변경**: 해당 테마의 `{theme}-sprites.ts`와 `theme.ts`의 `getSpriteSize`/`flatCellSize`를 동기화
- **평면 격자 셀 외형**: `theme.flatCellStyle` (bg0/bgN/border 등)
- **캔버스·그리드 좌표**: `theme.configOverride`
- **새 통계 추가**: `types.ts` → `github-api.ts`(쿼리) → `charts.ts`(레이더 축) → `svg-generator.ts`(매핑)
- **새 테마 추가** 시 동기화 대상:
  1. `theme.ts`: `ThemeName` 유니온, `getXTheme()`, `getTheme()` switch
  2. `{theme}-colors.ts` / `{theme}-sprites.ts` / `{theme}-background.ts`
  3. `switch-theme.ts`: `THEMES`, `OUTPUT_DIR`, `COMMIT_MSG`
  4. `generate-sprite-guide.ts`: `ITEMS_BY_THEME`, `THEME_COLORS`, `getXItems()`
  5. `.github/templates/readme-{theme}.md`

## 자동화

### `.github/workflows/dragon-contrib.yml`
- **스케줄**: 매일 03:00 KST (18:00 UTC) + 수동(`workflow_dispatch`) + `.github/scripts/**` push
- **환경 변수**: `THEME: heungbu`, `GITHUB_TOKEN`(secrets.TOKEN), `USERNAME`(repo owner)
- **출력/커밋**: `heungbu-contrib/` (Node.js 20, 커밋 사용자 1hyung)

### `.github/workflows/main.yml`
- 외부 액션 `yoshi389111/github-profile-3d-contrib` 실행 → `profile-3d-contrib/` 출력
- ⚠️ `profile-3d-contrib/`는 외부 액션 산출물이므로 직접 수정하지 않는다

## 디렉토리 구조

```
1hyung/
├── .github/
│   ├── scripts/                    # 시각화 생성 시스템 (TypeScript)
│   │   ├── types.ts  github-api.ts  isometric.ts  charts.ts
│   │   ├── svg-generator.ts  theme.ts
│   │   ├── colors.ts  sprites.ts  background.ts              # dragon
│   │   ├── succulent-colors.ts  succulent-sprites.ts  succulent-background.ts
│   │   ├── mountain-colors.ts   mountain-sprites.ts   mountain-background.ts
│   │   ├── heungbu-colors.ts    heungbu-sprites.ts    heungbu-background.ts
│   │   ├── generate-dragon.ts  generate-sprite-guide.ts  generate-sections.ts
│   │   ├── switch-theme.ts
│   │   └── package.json  tsconfig.json
│   ├── templates/                  # 테마별 README 템플릿 (readme-{theme}.md)
│   └── workflows/                  # dragon-contrib.yml, main.yml
├── assets/                         # 헤더/가이드/구분선 SVG, heungbu-bg.jpg
├── dragon-contrib/ succulent-contrib/ mountain-contrib/ heungbu-contrib/
├── profile-3d-contrib/             # 외부 액션 출력 (수정 금지)
├── CLAUDE.md  README.md
```

## TypeScript / 환경 변수

- **tsconfig**: ES2020, CommonJS, strict. ts-node로 직접 실행.
- **의존성**: `@octokit/graphql`, `ts-node`, `typescript`
- **환경 변수**: `GITHUB_TOKEN`(필수, read:user·repo), `USERNAME`(기본 `1hyung`), `THEME`(기본 `succulent`; 워크플로는 `heungbu`)

## 알려진 제약사항

1. 언어 데이터: 최대 100개 저장소 (GraphQL 제한)
2. SVG 크기가 큰 편 (픽셀아트 / 배경 이미지 임베드)
3. 실시간 업데이트 없음 — 워크플로 스케줄(하루 1회) 기준
4. `profile-3d-contrib/`는 외부 액션 산출물 (직접 수정 금지)
