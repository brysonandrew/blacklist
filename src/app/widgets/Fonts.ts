const Fonts = () => {
    palanquinDarkFont();
};

const palanquinDarkFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Palanquin+Dark';
    link.rel = 'stylesheet';

    document.head.appendChild(link);
    //
    // const palanquinDark = new FontFaceObserver('Palanquin+Dark');
    //
    // palanquinDark.load().then(() => {
    //     document.documentElement.classList.add('palanquin-dark-font');
    // }).catch((err) => console.log(err));
};

export default Fonts;
