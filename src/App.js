import React from "react";
import { useInfos } from "./useInfos";

function LocalStorageNotifier({ id, infos }) {
  return (
    <>
      <h3>Tab: {id}</h3>
      <h4>
        There are {infos.length} active tabs for {window.location.href}
      </h4>
      {infos.map(
        info =>
          info.id !== id && (
            <div key={info.id}>
              {info.id}: <span>{info.lastPing}ms</span>
            </div>
          )
      )}
    </>
  );
}

function App() {
  const [id, infos] = useInfos();
  return <LocalStorageNotifier id={id} infos={infos} />;
}

export default App;
