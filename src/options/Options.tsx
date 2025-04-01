import { useState, useEffect, BaseSyntheticEvent } from 'react';
import { YoutubeForm } from './YoutubeForm';
import { Blacklist } from './Blacklist';
import './options.css';

export type YTChannel = {
  name: string;
  message: string;
};

const storage = chrome?.storage?.local;

const PAUSE_TIMEOUT = [5, 6, 7, 8, 9, 10];

const Options = () => {
  const [formData, setFormData] = useState<YTChannel>({
    name: '',
    message: '',
  });
  const [channelsList, setChannelsList] = useState<YTChannel[]>([]);
  const [interval, setInterval] = useState(PAUSE_TIMEOUT[0]);
  const [updatingChannel, setUpdatingChannel] = useState(false);

  useEffect(() => {
    // Load stored settings
    storage?.get(['channels', 'interval'], (data) => {
      if (data.channels) {
        setChannelsList(data.channels || []);
      }
      if (data.interval) {
        setInterval(data.interval || 5);
      }
    });
  }, []);

  const handleAddChannel = (formData: YTChannel) => {
    if (!formData.name || !formData.message) {
      return;
    }

    if (!updatingChannel) {
      setChannelsList([...channelsList, formData]);
    } else {
      const channel = channelsList.find(
        (channel) => channel.name === formData.name
      );
      const otherChannels = channelsList.filter(
        (channel) => channel.name !== formData.name
      );
      if (channel) {
        channel.message = formData.message;
        setChannelsList([...otherChannels, channel]);
      }
    }

    console.log({ channelsList });

    // setChannelDisabled(false);
    setUpdatingChannel(false);
    storage?.set({ channels: channelsList });
  };

  const handleDeleteChannel = (index: number) => {
    if (confirm('Are you sure you want to delete?')) {
      const updatedChannels = channelsList.filter((_, i) => i !== index);
      setChannelsList(updatedChannels);
      storage?.set({ channels: updatedChannels });
    }
  };

  const handleChannelPrefill = (channelName: string) => {
    const channelMessage =
      channelsList.find((channel) => channel.name === channelName)?.message ??
      '';
    setFormData({ name: channelName, message: channelMessage });
    setUpdatingChannel(true);
  };

  const handleIntervalChange = (event: BaseSyntheticEvent) => {
    const selectedInterval = parseInt(event.target.value, 10);
    setInterval(selectedInterval);
    storage?.set({ interval: selectedInterval });
  };

  return (
    <div className="options-container">
      {/* <h1>Youtube settings</h1> */}
      <fieldset className="yt">
        <legend>Blacklist Channel</legend>
        <YoutubeForm
          formData={formData}
          updating={updatingChannel}
          onSubmit={handleAddChannel}
        />

        {/* <ul className="blacklist">
          {channelsList.length > 0 &&
            channelsList?.map((channel, index) => (
              <li key={channel.name} className="blacklist-item">
                <button
                  className="channel-name"
                  onClick={() => handleChannelPrefill(channel.name)}
                >
                  {channel.name}
                </button>

                <button
                  className="delete"
                  onClick={() => handleDeleteChannel(index)}
                >
                  x
                </button>
              </li>
            ))}
        </ul> */}

        <Blacklist
          channelsList={channelsList}
          onPrefill={(name) => handleChannelPrefill(name)}
          onDelete={(index) => handleDeleteChannel(index)}
        />

        <div className="form-group">
          <label htmlFor="interval">Pause video after:</label>
          <select
            id="interval"
            value={interval}
            onChange={handleIntervalChange}
          >
            {PAUSE_TIMEOUT.map((sec) => (
              <option key={sec} value={sec}>
                {sec} seconds
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
};

export default Options;
