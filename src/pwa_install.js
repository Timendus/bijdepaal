let deferredPrompt;

module.exports = {

  listen: () => {
    window.addEventListener('beforeinstallprompt', e => {
      deferredPrompt = e;
      e.preventDefault();
      console.log("We can install!");
    });

    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('service_worker.js');

    console.log("Done");
  },

  install: async () => {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if ( choice.outcome === 'accepted' )
      console.log("Accepted!");
    else
      console.log("Rejected");
    deferredPrompt = null;
  }

}
