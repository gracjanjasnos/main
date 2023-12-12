
interface AppState {
    currentStyle: string;
    styles: { [key: string]: string };
}

const appState: AppState = {
    currentStyle: 'style1',
    styles: {
        style1: 'styles/style1.css',
        style2: 'styles/style2.css',
        style3: 'styles/style3.css',
    },
};

function changeStyle(styleKey: string) {
    const head = document.head;

    const previousStyle = document.getElementById('app-style');
    if (previousStyle) {
        head.removeChild(previousStyle);
    }

    const link = document.createElement('link');
    link.id = 'app-style';
    link.rel = 'stylesheet';
    link.href = appState.styles[styleKey];

    head.appendChild(link);

    appState.currentStyle = styleKey;
}

function handleChangeStyleButtonClick() {
    console.log('Button clicked!'); 

    let nextStyle;

    switch (appState.currentStyle) {
        case 'style1':
            nextStyle = 'style2';
            break;
        case 'style2':
            nextStyle = 'style3';
            break;
        case 'style3':
            nextStyle = 'style1';
            break;
        default:
            nextStyle = 'style1'; 
            break;
    }

    changeStyle(nextStyle);
}



const changeStyleButton = document.getElementById('change-style-button');
if (changeStyleButton) {
    changeStyleButton.addEventListener('click', handleChangeStyleButtonClick);
}

changeStyle(appState.currentStyle);
