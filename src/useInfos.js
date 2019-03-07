import { useEffect, useState, useMemo } from "react";

export const useInfos = () => {
  const id = useMemo(
    () =>
      Math.random()
        .toString(36)
        .substr(2, 9),
    []
  );
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    function tick() {
      let tabs = {};
      if (localStorage.getItem("tabs")) {
        tabs = JSON.parse(localStorage.getItem("tabs"));
      }

      const now = new Date().getTime();
      tabs[id] = now;

      Object.keys(tabs).forEach(key => {
        if (now - tabs[key] > 3000) {
          delete tabs[key];
        }
      });

      setInfos(
        Object.entries(tabs)
          .map(tab => ({
            id: tab[0],
            lastPing: now - tab[1]
          }))
          .sort((a, b) => a.id - b.id)
      );
      localStorage.setItem("tabs", JSON.stringify(tabs));
    }

    tick();
    let interval = setInterval(tick, 500);

    return () => {
      if (id && interval) {
        clearInterval(interval);
      }
    };
  }, [id]);

  return [id, infos];
};
