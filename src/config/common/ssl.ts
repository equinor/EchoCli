import * as fs from 'fs';
import path from 'path';
import pem from 'pem';

async function createHttps(days: number): Promise<Https> {
    return new Promise((resolve, reject) => {
        pem.createCertificate({ days, selfSigned: true }, (err, keys) => {
            if (err) {
                reject(err);
            }

            const https = { key: keys.serviceKey, cert: keys.certificate, ca: keys.csr };
            resolve(https);
        });
    });
}

interface SSLManifest {
    date: Date;
    days: number;
}

async function createSslFiles(currentPath: string, days: number): Promise<Https> {
    try {
        const https: Https = await createHttps(days);
        const { keyPath, certificatePath, csrPath } = getCertPaths(currentPath);

        fs.writeFileSync(keyPath, https.key);
        fs.writeFileSync(certificatePath, https.cert);
        fs.writeFileSync(csrPath, https.ca);
        const sslManifest: SSLManifest = {
            date: new Date(),
            days
        };

        const sslManifestPath = path.join(currentPath || '', '/ssl/ssl.manifest.json');
        fs.writeFileSync(sslManifestPath, JSON.stringify(sslManifest, null, 4));
        return https;
    } catch (error) {
        throw error;
    }
}

interface CertPaths {
    keyPath: string;
    certificatePath: string;
    csrPath: string;
}

function getCertPaths(currentPath: string): CertPaths {
    const keyPath = path.join(currentPath || '', '/ssl/serviceKey.key');
    const certificatePath = path.join(currentPath || '', '/ssl/certificate.key');
    const csrPath = path.join(currentPath || '', '/ssl/csr.key');

    return {
        keyPath,
        certificatePath,
        csrPath
    };
}

type Https = {
    key: string;
    cert: string;
    ca: string;
};

function isSSLOutdated(sslManifest: SSLManifest): boolean {
    if (!sslManifest) return false;
    const certDate = new Date(sslManifest.date);
    const currentDate = new Date();
    const diff = certDate.getTime() - currentDate.getTime();
    const days = diff / (1000 * 3600 * 24);
    return days < sslManifest.days;
}

export async function getHttps(currentPath: string, days: number): Promise<Https> {
    try {
        const sslManifestPath = path.join(currentPath || '', '/ssl/ssl.manifest.json');
        const sslManifest = JSON.parse(fs.readFileSync(sslManifestPath).toString());

        if (!sslManifest.date) throw new Error('No SSL');

        if (isSSLOutdated(sslManifest)) {
            return await createSslFiles(currentPath, days);
        }

        const { keyPath, certificatePath, csrPath } = getCertPaths(currentPath);
        const key = fs.readFileSync(keyPath).toString();
        const cert = fs.readFileSync(certificatePath).toString();
        const ca = fs.readFileSync(csrPath).toString();

        return {
            key,
            cert,
            ca
        };
    } catch {
        return await createSslFiles(currentPath, days);
    }
}
