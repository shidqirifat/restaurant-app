/* eslint-disable no-alert */
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const registerSW = async (runtime) => {
  await runtime.register();
};

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    import('serviceworker-webpack-plugin/lib/runtime')
      .then((module) => module.default)
      .then(registerSW)
      .catch((error) => alert(error));

    return;
  }

  console.log('Service worker not supported in this browser');
};

export default swRegister;
