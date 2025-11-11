export default defineBackground(() => {
  browser.contextMenus.create({
    id: "test context",
    title: "WXT context menu",
    type: "normal",
    contexts: ["selection"],
  });
});
