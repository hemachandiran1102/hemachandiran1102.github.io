const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const A = 'https://icon.icepanel.io/AWS/svg/';
const S = 'https://cdn.simpleicons.org/';

const ICONS = {
    github: S+'github/ffffff',
    actions: S+'githubactions/ffffff',
    terraform: S+'terraform/7B42BC',
    cloudfront: A+'Networking-Content-Delivery/CloudFront.svg',
    build: S+'docker/ffffff',
    ecr: A+'Containers/Elastic-Container-Registry.svg',
    ssm: A+'Management-Governance/Systems-Manager.svg',
    cloudwatch: A+'Management-Governance/CloudWatch.svg',
    s3: A+'Storage/Simple-Storage-Service.svg',
    alb: A+'Networking-Content-Delivery/Elastic-Load-Balancing.svg',
    acm: A+'Security-Identity-Compliance/Certificate-Manager.svg',
    fargate: A+'Compute/Fargate.svg',
    redis: A+'Database/ElastiCache.svg',
    grafana: S+'grafana/F46800',
    ecs: A+'Containers/Elastic-Container-Service.svg',
    aurora: A+'Database/Aurora.svg',
    ses: A+'Business-Applications/Simple-Email-Service.svg',
    dns: S+'cloudflare/888888'
};

const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aabbcc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
fs.writeFileSync(path.join(dir, 'user.svg'), userSvg);
console.log('Saved user.svg');

async function download() {
    for (const [key, url] of Object.entries(ICONS)) {
        await new Promise((resolve) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    fs.writeFileSync(path.join(dir, key + '.svg'), data);
                    console.log('Downloaded', key);
                    resolve();
                });
            }).on('error', (e) => {
                console.error(e);
                resolve();
            });
        });
    }
}
download();
