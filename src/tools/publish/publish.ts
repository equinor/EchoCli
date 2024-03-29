import axios from 'axios';
import https from 'https';

export async function sendGetRequest(): Promise<void> {
    const url = `https://localhost:5001/module/?test=hello form console app!`;

    // const options = {
    //     headers: {
    //         accept: '*/*',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //     }
    // };
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    axios
        .post(
            url,
            {
                name: 'myapp',
                key: 'myapp',
                shortName: 'myapp',
                fileUri: '/index.js',
                path: '/myapp',
                version: '0.0.1',
                private: false,
                requireRef: 'echoDepLoader'
            },
            {
                httpsAgent
            }
        )
        .then((response) => {
            console.log('response:', response.statusText, 'with code', response.status);
        })
        .catch((err) => {
            console.warn('Error:', err);
        });
}
