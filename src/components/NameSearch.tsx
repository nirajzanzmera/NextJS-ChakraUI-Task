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
import { Controller } from "react-hook-form";

const NameSearch = ({
  setAppName,
  appName,
  unregister,
  review,
  register,
  control,
  typeofapp,
  appState
}: any) => {
  const [name, setName] = useState<any>();

  const getUserRoles = async () => {
    try {
      const response = await fetch(`${API_URL}/showapps`, {
        method: "GET",
      });
      let data = await response.json();
      if (data) {
        let nameList = data.Apps.filter(
          (x: any) => x.web_or_app.toLowerCase() === typeofapp?.toLowerCase(),
        ).map((m: any) => ({
          label: m.app_name,
          value: {
            app_id: m.app_id,
            app_name: m.app_name,
            industry_name: m.industry_name,
          },
        }));
        nameList.push({
          label: "Other",
          value: {
            app_id: "Other",
            app_name: "Other",
            industry_name: "Other",
          },
        });
        setName(nameList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // setAppName("")
    getUserRoles();
  }, [typeofapp]);

  return (
    <Stack direction="column">
      <Controller
        name={"root1.application_id_"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => {
          return (
            <Select
              size="sm"
              id="root1.application_id_"
              value={
                appName
                  ? {
                      label: appName.app_name,
                      value: appName,
                    }
                  : ""
              }
              placeholder={`Select Application for which you want to Report ${
                review ? "Review" : "Bug"
              }`}
              isRequired
              isClearable
              onChange={(vals: any) => {
                onChange(vals?.value);
                setAppName(vals?.value);
                if (vals?.value !== "Other") {
                  unregister("root1.app_name_");
                  unregister("root1.industry_id_");
                  unregister("root1.app_provider_contact_");
                  unregister("root1.description_");
                  unregister("root1.url");
                  unregister("root1.app_provider_name_");
                  unregister("root1.industry_name");
                  unregister("root1.ind_desc");
                }
              }}
              options={name}
            />
          );
        }}
      />

      {/* <AutoComplete
        openOnFocus
        rollNavigation
        onChange={(vals) => setAppName(vals)}
      >
        <AutoCompleteInput
          variant='outline'
          placeholder='Select Application for which you want to Report Bug...'
          isRequired
        />
        <AutoCompleteList>
          {name &&
            name.map((role: any, idx: any) => (
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

export default NameSearch;
