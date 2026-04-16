// 테마 전환 스크립트
// 사용법: npx ts-node switch-theme.ts <dragon|farm|mountain> [--commit] [--push]
//
// --commit : README.md + yml + assets를 자동으로 git commit
// --push   : commit 후 push 및 워크플로우 트리거 (--commit 포함)

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const THEMES = ['dragon', 'farm', 'mountain'] as const;
type ThemeName = typeof THEMES[number];

// ── 인수 파싱 ───────────────────────────────────────────────────
const theme = process.argv[2] as ThemeName;
if (!theme || !THEMES.includes(theme)) {
  console.error('사용법: npx ts-node switch-theme.ts <dragon|farm|mountain> [--commit] [--push]');
  console.error('예시:');
  console.error('  npx ts-node switch-theme.ts mountain');
  console.error('  npx ts-node switch-theme.ts farm --commit --push');
  process.exit(1);
}

const doCommit = process.argv.includes('--commit') || process.argv.includes('--push');
const doPush   = process.argv.includes('--push');

// ── 경로 설정 ───────────────────────────────────────────────────
const rootDir    = path.resolve(__dirname, '../..');
const scriptsDir = __dirname;
const readmePath = path.join(rootDir, 'README.md');
const ymlPath    = path.join(rootDir, '.github/workflows/dragon-contrib.yml');
const templatePath = path.join(rootDir, '.github/templates', `readme-${theme}.md`);

// 테마별 워크플로우 설정
const OUTPUT_DIR: Record<ThemeName, string> = {
  dragon:   'dragon-contrib',
  farm:     'farm-contrib',
  mountain: 'mountain-contrib',
};

const COMMIT_MSG: Record<ThemeName, string> = {
  dragon:   'Update dragon contribution visualization',
  farm:     'Update farm contribution visualization',
  mountain: 'Update mountain contribution visualization',
};

// ── 1. README 업데이트 ──────────────────────────────────────────
if (!fs.existsSync(templatePath)) {
  console.error(`템플릿 파일 없음: ${templatePath}`);
  process.exit(1);
}
fs.writeFileSync(readmePath, fs.readFileSync(templatePath, 'utf8'), 'utf8');
console.log(`✓ README.md → ${theme} 테마 적용`);

// ── 2. 워크플로우 yml 업데이트 ──────────────────────────────────
// THEME 환경변수, git add 경로, 커밋 메시지 교체
let yml = fs.readFileSync(ymlPath, 'utf8');
yml = yml.replace(/THEME:\s+\w+/, `THEME: ${theme}`);
yml = yml.replace(/git add \S+-contrib\//, `git add ${OUTPUT_DIR[theme]}/`);
yml = yml.replace(
  /git commit -m "Update \w+ contribution visualization"/,
  `git commit -m "${COMMIT_MSG[theme]}"`
);
fs.writeFileSync(ymlPath, yml, 'utf8');
console.log(`✓ dragon-contrib.yml → THEME=${theme}, 출력: ${OUTPUT_DIR[theme]}/`);

// ── 3. 스프라이트 가이드 생성 ───────────────────────────────────
console.log('\n스프라이트 가이드 생성 중...');
try {
  execSync('npx ts-node generate-sprite-guide.ts', {
    cwd: scriptsDir,
    stdio: 'inherit',
  });
} catch (e) {
  console.warn('⚠️  스프라이트 가이드 생성 실패 (계속 진행)\n');
}

// ── 4. 자동 커밋/푸시 ───────────────────────────────────────────
if (doCommit) {
  try {
    execSync(
      `git -C "${rootDir}" add README.md .github/workflows/dragon-contrib.yml assets/`,
      { stdio: 'inherit' }
    );
    execSync(
      `git -C "${rootDir}" commit -m "테마 전환: ${theme}"`,
      { stdio: 'inherit' }
    );
    console.log(`\n✓ git commit: 테마 전환 → ${theme}`);

    if (doPush) {
      execSync(`git -C "${rootDir}" push`, { stdio: 'inherit' });
      execSync('gh workflow run dragon-contrib.yml', {
        cwd: rootDir,
        stdio: 'inherit',
      });
      console.log('✓ push 및 워크플로우 트리거 완료');
    }
  } catch (e) {
    console.error('\nGit 작업 실패:', e);
    process.exit(1);
  }
}

// ── 완료 메시지 ─────────────────────────────────────────────────
console.log(`\n========================================`);
console.log(`테마 전환 완료: ${theme}`);
console.log(`========================================`);
console.log(`  README.md          → 테마 적용됨`);
console.log(`  dragon-contrib.yml → THEME=${theme}`);
console.log(`  assets/sprite-guide-${theme}.svg → 생성됨`);
if (!doCommit) {
  console.log(`\n커밋하려면:`);
  console.log(`  npx ts-node switch-theme.ts ${theme} --commit`);
  console.log(`\n커밋 + push + 워크플로우 트리거:`);
  console.log(`  npx ts-node switch-theme.ts ${theme} --commit --push`);
}
