const storage = chrome.storage.local;

type Channel = {
  name: string;
  message: string;
};

export function setChannels(channelsList: Channel[]) {
  storage.set({ channels: channelsList });
}
