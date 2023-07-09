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

const UserRoleSelect = ({ setUserRoles, userRoles }: any) => {
  const [roles, setRoles] = useState<any>();

  const getUserRoles = async () => {
    try {
      const response = await fetch(`${API_URL}/alluserroles`, {
        method: "GET",
      });
      let data = await response.json();
      if (data) {
        let roleList = data.roles.map((m: any) => m.user_role);
        setRoles(roleList);
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
      <Select
        value={
          userRoles
            ? {
                label: userRoles,
                value: userRoles,
              }
            : undefined
        }
        placeholder="Select User Role..."
        isClearable
        onChange={(vals: any) => {
          setUserRoles(vals?.value);
        }}
        options={roles?.map((role: any, idx: any) => ({
          label: role,
          value: role,
        }))}
      />
      {/* <AutoComplete
        openOnFocus
        rollNavigation
        onChange={(vals) => setUserRoles(vals)}
      >
        <AutoCompleteInput
          variant='outline'
          placeholder='Search...'
          isRequired
        />
        <AutoCompleteList>
          {roles &&
            roles.map((role: any, idx: any) => (
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

export default UserRoleSelect;
