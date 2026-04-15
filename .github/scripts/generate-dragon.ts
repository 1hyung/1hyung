import * as fs from 'fs';
import * as path from 'path';
import { fetchContributions } from './github-api';
import { generateSVG, generateAnimatedSVG } from './svg-generator';
import { DEFAULT_CONFIG } from './types';
import { getTheme, ThemeName } from './theme';

async function main(): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.USERNAME || '1hyung';
  const themeName = (process.env.THEME || 'farm') as ThemeName;

  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  const theme = getTheme(themeName);
  console.log(`Theme: ${theme.name} (${theme.title})`);
  console.log(`Fetching contribution data for ${username}...`);

  try {
    const data = await fetchContributions(token, username);
    const calendar = data.user.contributionsCollection.contributionCalendar;
    console.log(`Total contributions: ${calendar.totalContributions}`);

    // SVG 생성
    console.log('Generating SVG files...');
    const staticSVG = generateSVG(data, DEFAULT_CONFIG, theme);
    const animatedSVG = generateAnimatedSVG(data, DEFAULT_CONFIG, theme);

    // 출력 디렉토리 생성
    const outputDir = path.join(__dirname, `../../${theme.outputDir}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // SVG 파일 저장
    const staticPath = path.join(outputDir, `${theme.outputPrefix}.svg`);
    const animatedPath = path.join(outputDir, `${theme.outputPrefix}-animate.svg`);

    fs.writeFileSync(staticPath, staticSVG, 'utf8');
    console.log(`Written: ${staticPath}`);

    fs.writeFileSync(animatedPath, animatedSVG, 'utf8');
    console.log(`Written: ${animatedPath}`);

    console.log(`${theme.title} contribution SVGs generated successfully!`);
  } catch (error) {
    console.error('Error generating contribution visualization:', error);
    process.exit(1);
  }
}

main();
