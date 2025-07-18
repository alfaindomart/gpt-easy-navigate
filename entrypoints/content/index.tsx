import ReactDOM from 'react-dom/client'
import App from './App';

export default defineContentScript({
  matches: ['*://chatgpt.com/*'],
  main(ctx) {

    //handle UI: https://wxt.dev/guide/essentials/content-scripts.html#integrated
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'div#history a[data-active]',

      onMount: (container) => {
        const root = ReactDOM.createRoot(container) //root for the UI container
        root.render(<App />)
        return root
      },

      onRemove: (root) => {
        root?.unmount()
      }

    }
  )
    ui.mount()
  },
});
