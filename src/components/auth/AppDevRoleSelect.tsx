import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "envconfig";
import { Select } from "chakra-react-select";

const AppDevRoleSelect = ({ setAppId, appId }: any) => {
  const [apps, setApps] = useState<any>();
  const [appList, setAppList] = useState<any>();

  const appSetter = (vals: any) => {
    let appSet = appList.find(({ app_name }: any) => vals === app_name);
    setAppId(appSet.app_id);
  };

  const getAllApps = async () => {
    try {
      const response = await fetch(`${API_URL}/showapps`, {
        method: "GET",
      });
      let data = await response.json();
      if (data) {
        setAppList(data.Apps);
        let appList = data.Apps.map((m: any) => m.app_name);
        setApps(appList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllApps();
  }, []);

  return (
    <Stack direction="column">
      <Select
        value={
          appId
            ? {
                label: appId,
                value: appId,
              }
            : undefined
        }
        placeholder="Search..."
        isClearable
        onChange={(vals: any) => {
          appSetter(vals?.value);
        }}
        options={apps?.map((role: any, idx: any) => ({
          label: role,
          value: role,
        }))}
      />
      {/* <AutoComplete
        openOnFocus
        rollNavigation
        onChange={(vals) => appSetter(vals)}
      >
        <AutoCompleteInput
          variant='outline'
          placeholder='Search...'
          isRequired
        />
        <AutoCompleteList>
          {apps &&
            apps.map((role: any, idx: any) => (
              <AutoCompleteItem
                key={idx}
                value={role}
                label={role}
                textTransform='capitalize'
                align='center'
              />
            ))}
        </AutoCompleteList>
      </AutoComplete> */}
    </Stack>
  );
};

export default AppDevRoleSelect;
