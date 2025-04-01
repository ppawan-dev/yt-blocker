import { YTChannel } from './Options';

type BlacklistType = {
  channelsList: YTChannel[];
  onPrefill: (name: string) => void;
  onDelete: (index: number) => void;
};

export const Blacklist = ({
  channelsList,
  onPrefill,
  onDelete,
}: BlacklistType) => {
  return (
    <ul className="blacklist">
      {channelsList.length > 0 &&
        channelsList?.map((channel, index) => (
          <li key={channel.name} className="blacklist-item">
            <button
              className="channel-name"
              onClick={() => onPrefill(channel.name)}
            >
              {channel.name}
            </button>

            <button className="delete" onClick={() => onDelete(index)}>
              x
            </button>
          </li>
        ))}
    </ul>
  );
};
