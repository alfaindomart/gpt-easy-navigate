export default defineContentScript({
  matches: ['*://chatgpt.com/*'],
  main(ctx) {

    //handle UI: https://wxt.dev/guide/essentials/content-scripts.html#integrated
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const app = document.createElement('p')
        app.textContent = 'Halo gan'
        app.className = 'testing'
        container.append(app)
      }
    })
    ui.mount()
  },
});
