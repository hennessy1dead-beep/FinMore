import fs from 'fs';
import axios from 'axios';
 
const webhook = process.env.SLACK_WEBHOOK_URL!;
 
const report = JSON.parse(
    fs.readFileSync('test-results/results.json', 'utf-8')
);
 
let passed = 0;
let failed = 0;
let skipped = 0;
 
const failedTests: string[] = [];
 
for (const suite of report.suites) {
    parseSuite(suite);
}
 
function parseSuite(suite: any) {
    if (suite.specs) {
        for (const spec of suite.specs) {
            for (const test of spec.tests) {
                for (const result of test.results) {
                    if (result.status === 'passed') {
                        passed++;
                    }
 
                    if (result.status === 'failed') {
                        failed++;
 
                        failedTests.push(
                            `${spec.title}`
                        );
                    }
 
                    if (result.status === 'skipped') {
                        skipped++;
                    }
                }
            }
        }
    }
 
    if (suite.suites) {
        for (const child of suite.suites) {
            parseSuite(child);
        }
    }
}
 
const total = passed + failed + skipped;
 
const payload = {
    blocks: [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: 'Playwright Test Report'
            }
        },
 
        {
            type: 'section',
            fields: [
                {
                    type: 'mrkdwn',
                    text: `*Total:*\n${total}`
                },
                {
                    type: 'mrkdwn',
                    text: `*Passed:*\n✅ ${passed}`
                },
                {
                    type: 'mrkdwn',
                    text: `*Failed:*\n❌ ${failed}`
                },
                {
                    type: 'mrkdwn',
                    text: `*Skipped:*\n⚠️ ${skipped}`
                }
            ]
        },
 
        {
            type: 'section',
            fields: [
                {
                    type: 'mrkdwn',
                    text: `*Branch:*\n${process.env.GITHUB_REF_NAME}`
                },
                {
                    type: 'mrkdwn',
                    text: `*Actor:*\n${process.env.GITHUB_ACTOR}`
                }
            ]
        },
 
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text:
                    failed > 0
                        ? `*Failed Tests:*\n${failedTests.join('\n')}`
                        : '✅ All tests passed'
            }
        },
 
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Open GitHub Action'
                    },
                    url: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
                }
            ]
        }
    ]
};
 
async function sendReport() {
    await axios.post(webhook, payload);
 
    console.log('Slack report sent');
}
 
sendReport();