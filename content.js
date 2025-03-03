chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleCSS") {
        const existingStyle = document.getElementById('timeline-css');
        if (existingStyle) {
            existingStyle.remove();
            sendResponse({status: "CSS removed"});
        } else {
            const style = document.createElement('style');
            style.setAttribute("id", "timeline-css");
            style.innerText = '.js-timeline-item[data-gid^="C_"], .js-timeline-item[data-gid^="CRE_"], .js-timeline-item[data-gid^="RFRE_"], .js-timeline-item[data-gid^="RRE_"], .js-timeline-item[data-gid^="CTDE_"], .js-timeline-item[data-gid^="HRFPE_"], .js-timeline-item[data-gid^="LE_"], .js-timeline-item[data-gid^="MIE_"], .js-timeline-item[data-gid^="DEE_"], .js-timeline-item[data-gid^="DEME_"], .js-timeline-item[data-gid^="ASEE_"], .js-timeline-item[data-gid^="RDE_"], .js-timeline-item[data-gid^="RTE_"], div[class="TimelineItem"]:not([data-view-component]) {display: none;}';
            document.head.appendChild(style);
            sendResponse({status: "CSS added"});
        }
    }
});