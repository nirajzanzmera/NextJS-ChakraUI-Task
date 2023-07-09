import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Select } from "chakra-react-select";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "envconfig";
import { Controller } from "react-hook-form";

const IndustrySearch = ({
  setindustries,
  industries,
  unregister,
  control,
}: any) => {
  const [name, setName] = useState<any>();

  const getUserRoles = async () => {
    try {
      const response = await fetch(`${API_URL}/showinds`, {
        method: "GET",
      });
      let data = await response.json();
      if (data) {
        const industryList = data.Industries.map((m: any) => ({
          label: m.industry_name,
          value: { industry_id: m.industry_id, industry_name: m.industry_name },
        }));
        industryList.push({
          label: "Other",
          value: { industry_id: "Other", industry_name: "Other" },
        });
        setName(industryList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserRoles();
  }, []);
  return (
    <Stack direction="column">
      <Controller
        name={"root1.industry_id_"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => {
          return (
            <Select
              id="root1.industry_id_"
              value={
                industries
                  ? {
                      label: industries?.industry_name,
                      value: industries,
                    }
                  : undefined
              }
              placeholder="Select Industry Category that suits you the best..."
              isClearable
              isRequired
              onChange={(vals: any) => {
                onChange(vals?.value);
                setindustries(vals?.value);
                if (vals?.value !== "Other") {
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
        value={industries}
        onChange={(vals) => {
          setindustries(vals);
        }}
      >
        <AutoCompleteInput
          variant="outline"
          value={industries}
          placeholder="Select Industry Category that suits you the best..."
          isRequired
        />
        <AutoCompleteList>
          {name &&
            name.map((role: any, idx: any) => (
              <AutoCompleteItem
                key={idx}
                value={role}
                label={role}
                textTransform="capitalize"
                align="center"
              />
            ))}
        </AutoCompleteList>
      </AutoComplete> */}
    </Stack>
  );
};

export default IndustrySearch;
