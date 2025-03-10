browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.action) {
    case "toggleCSS":
      {
        const existingStyle = document.getElementById("timeline-css");
        if (existingStyle) {
          existingStyle.remove();
          sendResponse({ isHidden: false });
        } else {
          const style = document.createElement("style");
          style.setAttribute("id", "timeline-css");
          style.innerText =
            '.js-timeline-item[data-gid^="C_"], .js-timeline-item[data-gid^="CRE_"], .js-timeline-item[data-gid^="RFRE_"], .js-timeline-item[data-gid^="RRE_"], .js-timeline-item[data-gid^="CTDE_"], .js-timeline-item[data-gid^="HRFPE_"], .js-timeline-item[data-gid^="LE_"], .js-timeline-item[data-gid^="MIE_"], .js-timeline-item[data-gid^="DEE_"], .js-timeline-item[data-gid^="DEME_"], .js-timeline-item[data-gid^="ASEE_"], .js-timeline-item[data-gid^="RDE_"], .js-timeline-item[data-gid^="RTE_"], div[class="TimelineItem"]:not([data-view-component]) {display: none;}';
          document.head.appendChild(style);
          sendResponse({ isHidden: true });
        }
      }
      break;
    case "forceToggle":
      {
        const style = document.createElement("style");
        style.setAttribute("id", "timeline-css");
        style.innerText =
          '.js-timeline-item[data-gid^="C_"], .js-timeline-item[data-gid^="CRE_"], .js-timeline-item[data-gid^="RFRE_"], .js-timeline-item[data-gid^="RRE_"], .js-timeline-item[data-gid^="CTDE_"], .js-timeline-item[data-gid^="HRFPE_"], .js-timeline-item[data-gid^="LE_"], .js-timeline-item[data-gid^="MIE_"], .js-timeline-item[data-gid^="DEE_"], .js-timeline-item[data-gid^="DEME_"], .js-timeline-item[data-gid^="ASEE_"], .js-timeline-item[data-gid^="RDE_"], .js-timeline-item[data-gid^="RTE_"], div[class="TimelineItem"]:not([data-view-component]) {display: none;}';
        document.head.appendChild(style);
        sendResponse({ isHidden: true });
      }
      break;
    case "forceToggleOff":
      {
        const existingStyleOff = document.getElementById("timeline-css");
        if (existingStyleOff) {
          existingStyleOff.remove();
          sendResponse({ isHidden: false });
        }
      }
      break;
    default:
      break;
  }
});
