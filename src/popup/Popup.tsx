import './popup.css';

function Popup() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Youtube channel blocker</h1>
      <p>
        We help you block certain youtube channel you wish not to view. Please
        click Options button below to configure.
      </p>

      <button onClick={() => chrome.runtime.openOptionsPage()}>Options</button>
    </div>
  );
}

export default Popup;
