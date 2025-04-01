let tabUrl = document.location.href;
console.log('Content url', tabUrl);

if (tabUrl.includes('youtube.com')) {
  handleYoutubeHandles();
}

function handleYoutubeHandles() {
  chrome.storage.local.get(['interval'], (data) => {
    const pauseAfterSeconds = data.interval * 1000;

    const intervalID = setInterval(() => {
      let channelHandle = getYoutubeChannelHandle();

      if (channelHandle) {
        clearInterval(intervalID);
      }

      if (tabUrl.includes('/watch') || tabUrl.includes('/shorts')) {
        // While playing video or short
        pauseBlackListedVideo(channelHandle);
      } else if (tabUrl.includes('/@')) {
        // Page of a specific channel ex: /@channelHandleName or /@channelHandleName/shorts
        const handleName = tabUrl.split('@')[1].split('/')[0];

        chrome.storage.local.get(['channels'], (data) => {
          const blackList = data.channels.map((channel) => channel.name);
          if (blackList.includes(handleName)) {
            // Redirect to youtube home
            document.location.href = document.location.origin;
          }
        });
      } else {
        // This is for home page
        deleteBlackListedVideo();
      }
    }, pauseAfterSeconds);
  });
}

function pauseBlackListedVideo(channelHandle) {
  chrome.storage.local.get(['channels'], (data) => {
    const blackList = data.channels;
    const blacklistedItem = blackList.find(
      (channel) => channel.name === channelHandle.toLowerCase()
    );

    if (blacklistedItem) {
      console.log(`WARNING !! ${channelHandle} is unsafe`);

      const videoElement = document.querySelector(
        '#movie_player > div.html5-video-container > video'
      );
      videoElement.pause();
      videoElement.style.opacity = 0.1;

      const response = window.confirm(
        `${blacklistedItem.message}\n\nClick Ok to continue watching`
      );

      videoElement.style.opacity = 1;

      if (response) {
        videoElement.play();
      }
    }
  });
}

function deleteBlackListedVideo() {
  chrome.storage.local.get(['channels'], (data) => {
    const blackList = data.channels.map((channel) => channel.name);
    const videosContainerList = Array.from(
      document.querySelectorAll('ytd-rich-item-renderer')
    );
    videosContainerList.forEach((videoContainer) => {
      if (blackList.includes(getChannelHandleFromRenderer(videoContainer))) {
        videoContainer.remove();
      }
    });
  });
}

function getYoutubeChannelHandle() {
  const channelHandleAnchor = document.querySelector('#text > a');
  return channelHandleAnchor?.href?.split('@')[1];
}

function getChannelHandleFromRenderer(container) {
  return container
    .querySelector(
      'ytd-rich-grid-media ytd-video-meta-block ytd-channel-name yt-formatted-string a'
    )
    ?.href.split('@')[1];
}
