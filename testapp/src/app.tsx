import EchoCore from '@equinor/echo-core';
import React, { useState } from 'react';
import style from './app.module.css';

const baseApiUrl = 'https://dt-echopedia-api-dev.azurewebsites.net/';

async function getVersion(): Promise<string> {
    const data = await EchoCore.EchoClient.fetch(`${baseApiUrl}/Version`);
    return await data.text();
}

const App: React.FC = (): JSX.Element => {
    const [echoVersion, setEchoVersion] = useState('');

    useEffect(() => {
        getVersion().then((version: string) => {
            setEchoVersion(version);
        });
    });

    return (
        <div className={style.wrapper}>
            <h1>Echo App Template</h1>
            <p>This is an app template for Echo Applications</p>
            {/* <h6>Echo v{echoVersion}</h6> */}
        </div>
    );
};

export default App;
