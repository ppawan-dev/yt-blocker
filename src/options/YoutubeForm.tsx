import { useEffect, useState } from 'react';
import { YTChannel } from './Options';
import './options.css';

type YoutubeFormType = {
  formData: YTChannel;
  updating: boolean;
  onSubmit: (prop: YTChannel) => void;
};

export const YoutubeForm = ({
  formData,
  updating,
  onSubmit,
}: YoutubeFormType) => {
  const [config, setConfig] = useState<YTChannel>(formData);

  useEffect(() => {
    setConfig(formData);
  }, [formData]);

  const handleFormChange = (prop: any) => {
    setConfig({ ...config, ...prop });
  };

  return (
    <form
      className="form-group"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(config);
        setConfig({ name: '', message: '' });
      }}
    >
      <input
        type="text"
        value={config.name}
        onChange={(e) => handleFormChange({ name: e.target.value })}
        placeholder="Add a channel name"
        disabled={updating}
      />

      <input
        type="text"
        value={config.message}
        onChange={(e) => handleFormChange({ message: e.target.value })}
        placeholder="Add a channel alert message"
      />

      <button type="submit" id="add">
        {updating ? 'Update blacklist' : 'Add to blacklist'}
      </button>
    </form>
  );
};
