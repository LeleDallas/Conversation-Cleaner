chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const cssSelector = `
    .js-timeline-item[data-gid^="C_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="CRE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="RFRE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="REFE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="UNLE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="RRE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="CTDE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="HRFPE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="ATMQE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="LE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="MIE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="DEE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="DEME_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="ASEE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="RDE_"] .TimelineItem[data-view-component]:not(.py-0),
    .js-timeline-item[data-gid^="RTE_"] .TimelineItem[data-view-component]:not(.py-0),
    div[class="TimelineItem"]:not([data-view-component]),
    .TimelineItem[data-team-hovercards-enabled]
  `;

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
          style.innerText = `${cssSelector} { display: none; }`;
          document.head.appendChild(style);
          sendResponse({ isHidden: true });
        }
      }
      break;
    case "forceToggle":
      {
        const style = document.createElement("style");
        style.setAttribute("id", "timeline-css");
        style.innerText = `${cssSelector} { display: none; }`;
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
    case "clickLoadMore":
      {
        console.log("Received 'clickLoadMore' action");

        // Select all buttons with the class 'ajax-pagination-btn'
        const loadMoreButtons = document.querySelectorAll(
          "button.ajax-pagination-btn"
        );

        console.log(
          `Found ${loadMoreButtons.length} buttons with 'ajax-pagination-btn' class.`
        );

        // Filter buttons to find the one with the text "Load more..."
        const loadMoreButton = Array.from(loadMoreButtons).find(
          (button) => button.textContent.trim().toLowerCase() === "load more…"
        );

        if (loadMoreButton) {
          console.log("Clicking 'Load more...' button");
          loadMoreButton.click(); // Simulate click

          // Respond with a success status and check if there's still a 'Load more' button to click
          const moreButtons = document.querySelectorAll(
            "button.ajax-pagination-btn"
          );
          const stillMore = Array.from(moreButtons).some(
            (button) => button.textContent.trim().toLowerCase() === "load more…"
          );

          sendResponse({ hasMore: stillMore });
        } else {
          console.log("No 'Load more...' button found.");
          sendResponse({ hasMore: false });
        }
      }
      break;

    default:
      break;
  }
});
