import * as fs from 'fs';
import * as path from 'path';
import { fetchContributions } from './github-api';
import { generateSVG, generateAnimatedSVG } from './svg-generator';
import { DEFAULT_CONFIG } from './types';

async function main(): Promise<void> {
  // Get environment variables
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.USERNAME || '1hyung';

  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log(`Fetching contribution data for ${username}...`);

  try {
    // Fetch contribution data from GitHub
    const data = await fetchContributions(token, username);
    const calendar = data.user.contributionsCollection.contributionCalendar;
    console.log(`Total contributions: ${calendar.totalContributions}`);

    // Generate SVGs
    console.log('Generating SVG files...');
    const staticSVG = generateSVG(data, DEFAULT_CONFIG);
    const animatedSVG = generateAnimatedSVG(data, DEFAULT_CONFIG);

    // Create output directory
    const outputDir = path.join(__dirname, '../../dragon-contrib');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write SVG files
    const staticPath = path.join(outputDir, 'dragon-contrib.svg');
    const animatedPath = path.join(outputDir, 'dragon-contrib-animate.svg');

    fs.writeFileSync(staticPath, staticSVG, 'utf8');
    console.log(`Written: ${staticPath}`);

    fs.writeFileSync(animatedPath, animatedSVG, 'utf8');
    console.log(`Written: ${animatedPath}`);

    console.log('Dragon contribution SVGs generated successfully!');
  } catch (error) {
    console.error('Error generating dragon contribution:', error);
    process.exit(1);
  }
}

main();
