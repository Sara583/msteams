import React from "react";
import * as msTeams from "@microsoft/teams-js";

function Configuration() {
  msTeams.pages.config.registerOnSaveHandler((saveEvent) => {
    msTeams.pages.config.setConfig({
      contentUrl: window.location.origin,
      entityId: window.location.origin,
    });

    saveEvent.notifySuccess();
  });
  msTeams.pages.config.setValidityState(true);

  return <h1>Configure</h1>;
}
export default Configuration;
