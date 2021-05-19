import chalk from 'chalk';
import * as figlet from 'figlet';
export function echoCliLogo(): void {
    console.log(`${chalk.cyan.bold('EchoCli')} - by Echo Core Team`);
    console.log(
        figlet.textSync('Echo', {
            font: '3D-ASCII',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })
    );
}
