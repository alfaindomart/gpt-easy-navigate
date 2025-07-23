import ReactDOM from 'react-dom/client'
import App from './App';

export default defineContentScript({
  matches: ['*://chatgpt.com/*'],

  main(ctx) {
  

    //handle Dynamic UI: https://wxt.dev/guide/essentials/content-scripts.html#mounting-ui-to-dynamic-element
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {

        const app = document.createElement('div')
        container.append(app)
        
        const root = ReactDOM.createRoot(app);
        root.render(
        <App />
      )
        return root
      },
      onRemove: (root) => {
        root?.unmount()
      }
    }

    // const remountUi = (targetElement) => {

    //   if (ui) {
    //     ui.remove()
    //   }

    //   if (targetElement) {
    //     ui
    //   }
    // }

    // //MUtation Observer to detect change in active chat
    // const observer = new MutationObserver((mutationList) => {
    //   for (const mutation of mutationList) {
    //     if (mutation.type === 'attributes' && mutation.attributeName === 'data-active') {
    //       //find the new active chat element
    //       const newActive = document.querySelector('div#history a[data-active]')

    //     }
    //   }
    // })
  )
  ui.autoMount({
    onStop: () => {
      console.log('automount stopped')
    },
    
  })
  },
});
