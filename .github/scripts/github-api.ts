import { graphql } from '@octokit/graphql';
import { ContributionData, ContributionCalendar } from './types';

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions(
  token: string,
  username: string
): Promise<ContributionCalendar> {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  const data = await graphqlWithAuth<ContributionData>(CONTRIBUTION_QUERY, {
    username,
  });

  return data.user.contributionsCollection.contributionCalendar;
}

export function contributionLevelToNumber(
  level: string
): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case 'NONE':
      return 0;
    case 'FIRST_QUARTILE':
      return 1;
    case 'SECOND_QUARTILE':
      return 2;
    case 'THIRD_QUARTILE':
      return 3;
    case 'FOURTH_QUARTILE':
      return 4;
    default:
      return 0;
  }
}
