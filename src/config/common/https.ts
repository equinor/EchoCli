import pem from 'pem';

export type Https = {
    key: string;
    cert: string;
    ca: string;
};

export async function defineHttps(): Promise<Https> {
    return new Promise((resolve, reject) => {
        pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
            if (err) {
                reject(err);
            }

            const https = { key: '', cert: '' } as Https;
            https.key = keys.serviceKey;
            https.cert = keys.certificate;
            https.ca = keys.csr;
            resolve(https);
        });
    });
}
