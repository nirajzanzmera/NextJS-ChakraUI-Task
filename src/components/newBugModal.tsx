import React, { useState, useEffect, useRef } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "../../styles/first.module.css";
// import { CUIAutoComplete } from "chakra-ui-autocomplete";

import {
  Flex,
  Button,
  Box,
  Select,
  Checkbox,
  CheckboxGroup,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Textarea,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Upload } from "antd";

const content = (
  <Flex py={4}>
    <Box p={1}>HJello</Box>
  </Flex>
);

const steps = [
  { FormLabel: "Step 1" },
  { FormLabel: "Step 2" },
  { FormLabel: "Step 3" },
];

export const BugForm = () => {
  const [appdata, setappdata] = useState<any[]>([]);
  const [industries, setindustries] = useState<any[]>([]);
  const [category, setcategory] = useState<any[]>([]);
  const [subcategory, setsubcategory] = useState<any>([]);
  const [oneindustry, setoneindustry] = useState<any[]>([]);
  const [industryOther, setindustryOther] = useState<String>("Other");
  const [appother, setappother] = useState<boolean>(false);
  const [otherv, setotherv] = useState("Other");
  // const [otherv, setotherv] = useState("Other"); --> By Shubham
  const [catid, setcatid] = useState("");
  const [indId, setindId] = useState("");
  const [indType, setindType] = useState("");
  // const [indId, setindId] = useState("Other"); --> By Shubham
  // const [indType, setindType] = useState("Other"); --> By Shubham

  const [versions, setversions] = useState<any[]>([]);
  const [newIndustry, setnewIndustry] = useState<Array<Object>>([]);
  const [firstempties, setfirstempties] = useState<Number>();
  const [secondempties, setsecondempties] = useState<Number>();

  const [platform, setplatform] = useState<String>("");

  const [sender, setsender] = useState({});
  const [filelimit, setfilelimit] = useState(false);
  const [filedata, setfiledata] = useState([]);
  const [assistiveTech, setAssistiveTech] = useState<Array<Object>>([]);

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [typeofapp, settypeofapp] = useState("app");
  const [fistform, setfirstform] = useState({});
  const [secondform, setsecondform] = useState({});
  const getApps = async () => {
    const request = await axios
      .get("https://172-105-61-130.ip.linodeusercontent.com:5000/showapps")
      .then((response) => response.data);
    setappdata(request.Apps);
  };

  // *********************--> By Shubham***************************

  let indcat;
  if (indId === "Other") {
    // if (indType !== "Other") {
    indcat = (
      <>
        <Box w="45%">
          <Box w="100%" paddingBottom={"2%"}>
            <FormLabel className={styles.requiredfield}>
              Industry category
            </FormLabel>
            <Select
              // defaultValue="Other"
              {...register("root1.industrycat", {
                required: "This field is required",
              })}
              size="sm"
              onChange={(e) => setindType(e.target.value)}
              onClick={() => {
                handleIndustryOther;
              }}
              placeholder="Select Industry Category that suits you the best"
            >
              {/* {industries.length > 0 && indId !== "" ? ( */}
              {
                industries.length > 0
                  ? industries
                      .filter((item) => {
                        if (item.industry_id == indId) {
                          return item;
                        } else {
                          return null;
                        }
                      })
                      .map((item, idx) => {
                        return (
                          <>
                            <option value={item.industry_name} key={idx}>
                              {item.industry_name}
                            </option>
                            {/* <option value="Other">Other</option> */}
                          </>
                        );
                      })
                  : newIndustry.length > 0
                  ? newIndustry.map((item: any, i: any) => {
                      return (
                        <option key={i} value={item.industry_name}>
                          {item.industry_name}
                        </option>
                      );
                    })
                  : null
                // (
                //   <option>Other</option>
                // )
              }
            </Select>
            {errors.root1 && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.root1.industrycat
                  ? errors.root1.industrycat.message
                  : null}
              </span>
            )}
          </Box>
        </Box>
      </>
    );
  }

  let text;
  if (indId === "Other") {
    if (indType !== "Other") {
      text = (
        <>
          <Box w="95%" paddingBottom={"2%"}>
            <Flex
              w="100%"
              flexDirection={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <Box w="45%">
                <FormLabel className={styles.requiredfield}>
                  App provider contact
                </FormLabel>
                <Input
                  required
                  id="contact"
                  placeholder="Contact"
                  {...register("contact", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.contact ? errors.contact.message : null}
                  </span>
                )}
              </Box>

              <Box w="45%">
                <FormLabel className={styles.requiredfield}>
                  App description
                </FormLabel>
                <Input
                  id="App description"
                  placeholder="appdescription"
                  {...register("root1.appdescription", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.appdescription
                      ? errors.root1.appdescription.message
                      : null}
                  </span>
                )}
              </Box>
            </Flex>
          </Box>

          <Box w="95%" paddingBottom={5}>
            <Flex
              w="100%"
              flexDirection={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <Box w="45%">
                <FormLabel className={styles.requiredfield}>Url</FormLabel>
                <Input
                  id="Url"
                  placeholder="Url"
                  {...register("root1.Url", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.Url ? errors.root1.Url.message : null}
                  </span>
                )}
              </Box>

              <Box w="45%" paddingBottom={"2%"}>
                <FormLabel className={styles.requiredfield}>
                  App provider
                </FormLabel>
                <Input
                  id="provider"
                  placeholder="Provider"
                  {...register("root1.provider", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.provider
                      ? errors.root1.provider.message
                      : null}
                  </span>
                )}
              </Box>
            </Flex>
          </Box>
        </>
      );
    } else {
      text = (
        <>
          <Box w="95%" paddingBottom={"2%"}>
            <Flex
              w="100%"
              flexDirection={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <Box w="45%">
                <FormLabel className={styles.requiredfield}>
                  App provider contact
                </FormLabel>
                <Input
                  id="contact"
                  placeholder="Contact"
                  {...register("contact", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.contact ? errors.contact.message : null}
                  </span>
                )}
              </Box>

              <Box w="45%">
                <FormLabel className={styles.requiredfield}>
                  App description
                </FormLabel>
                <Input
                  id="App description"
                  placeholder="appdescription"
                  {...register("root1.appdescription", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.appdescription
                      ? errors.root1.appdescription.message
                      : null}
                  </span>
                )}
              </Box>
            </Flex>
          </Box>

          <Box w="95%" paddingBottom={5}>
            <Flex
              w="100%"
              flexDirection={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <Box w="45%">
                <FormLabel className={styles.requiredfield}>Url</FormLabel>
                <Input
                  id="Url"
                  placeholder="Url"
                  {...register("root1.Url", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.Url ? errors.root1.Url.message : null}
                  </span>
                )}
              </Box>

              <Box w="45%" paddingBottom={"2%"}>
                <FormLabel className={styles.requiredfield}>
                  App provider
                </FormLabel>
                <Input
                  id="provider"
                  placeholder="Provider"
                  {...register("root1.provider", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.provider
                      ? errors.root1.provider.message
                      : null}
                  </span>
                )}
              </Box>
            </Flex>
          </Box>
          <Box w="95%" paddingBottom={"2%"}>
            <Flex
              w="100%"
              flexDirection={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <Box w="45%">
                <FormLabel className={styles.requiredfield}>
                  Industry name
                </FormLabel>
                <Input
                  id="industryname"
                  placeholder="Industry name"
                  {...register("root1.industryname", {
                    required: "This field is required",
                  })}
                  size="sm"
                ></Input>
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.industryname
                      ? errors.root1.industryname
                      : null}
                  </span>
                )}
              </Box>

              <Box w="45%">
                <FormLabel className={styles.requiredfield}>
                  Industry description
                </FormLabel>
                <Textarea
                  id="inddescription"
                  placeholder="Industry description"
                  {...register("root1.inddescription", {
                    required: "This field is required",
                  })}
                />
                {errors.root1 && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {errors.root1.inddescription
                      ? errors.root1.inddescription.message
                      : null}
                  </span>
                )}
              </Box>
            </Flex>
          </Box>
        </>
      );
    }
  } else {
    text = null;
  }
  useEffect(() => {
    if (indId === "Other") {
      setindustries([]);
      let nullOBj = {
        created_by: "null",
        created_on: "null",
        current_state: "null",
        industry_id: "null",
        industry_name: "Other",
        last_modified_by: "null",
        last_modified_on: "null",
      };
      setnewIndustry([nullOBj, ...industries]);
    } else {
      const getVersions = async () => {
        const request = await axios
          .get(
            `https://172-105-61-130.ip.linodeusercontent.com:5000/appversions?app_id=${2}`,
          )
          .then((response) => response.data);
        setversions(request.Appversions);
      };
      getVersions();

      const getIndustry = async () => {
        const request = await axios
          .get("https://172-105-61-130.ip.linodeusercontent.com:5000/showinds")
          .then((response) => response.data);
        setindustries(request.Industries);
      };
      getIndustry();
    }
  }, [indId, industryOther,industries]);

  // const getAssistiveTechnology = async () => {
  //   const request = await axios
  //     .get(
  //       `https://172-105-61-130.ip.linodeusercontent.com:5000/get_assistive_tech`
  //     )
  //     .then((response) => response.data);
  //   setAssistiveTech(request.technologies);
  // };
  // getAssistiveTechnology();

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleIndustryOther = (event: any) => {
    setindustryOther(event.target.value);
  };
  const getAppVersion = async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/appversions?app_id=${indId}`,
      )
      .then((response) => response.data);
    setversions(request.Appversions);
  };
  const getCategory = async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/subcats_cats?want=categories&catid=${1}`,
      )
      .then((response) => response.data);
    setcategory(request.categories);
  };

  useEffect(() => {
    if (catid !== "") {
      const getsubcategory = async () => {
        const request = await axios
          .get(
            `https://172-105-61-130.ip.linodeusercontent.com:5000/subcats_cats?want=subcategories&catid=${catid}`,
          )
          .then((response) => response.data);
        setsubcategory(request.subcategories);
      };
      getsubcategory();
    }
  }, [catid]);

  const checkEmptyinputsOne = () => {
    const allvalues = getValues();

    let FirstValues = allvalues.root1;

    let emptycounterone = 0;
    for (var key in FirstValues) {
      if (FirstValues[key] === "") {
        emptycounterone = emptycounterone + 1;
      }
    }
    setfirstempties(emptycounterone);
    setfirstform(FirstValues);
  };

  const checkEmptyinputTwo = () => {
    const allvalues = getValues([
      "platform",
      "version",
      "bugcat",
      "bugsubcat",
      "impact",
      "desc",
      "assistive",
      "userversion",
      "device",
      "steps",
    ]);


    if (typeofapp === "App") {
      let obj2: any = {
        platform: allvalues[0],
        version: allvalues[1],
        bugcat: allvalues[2],
        bugsubcat: allvalues[3],
        impact: allvalues[4],
        desc: allvalues[5],
        assistive: allvalues[6],
        userversion: allvalues[7],
        device: allvalues[8],
        steps: allvalues[9],
      };

      let emptysecondcounter = 0;
      for (var key in obj2) {
        if (obj2[key] === "") {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setsecondempties(emptysecondcounter);
      setsecondform(obj2);
    } else if (typeofapp === "Website") {
      let obj2: any = {
        bugcat: allvalues[2],
        bugsubcat: allvalues[3],
        impact: allvalues[4],
        desc: allvalues[5],
        assistive: allvalues[6],
        userversion: allvalues[7],
        device: allvalues[8],
        steps: allvalues[9],
      };

      let emptysecondcounter = 0;
      for (var key in obj2) {
        if (obj2[key] === "") {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setsecondempties(emptysecondcounter);
      setsecondform(obj2);
    }
  };
  const typeofplatform = (plat: any) => {
    setplatform(plat);
  };

  const handleVerOther = (val: any) => {
    setotherv(val);
  };

  const handleSubmitForm = (data: any) => {
    if (data.root1.appname !== "Other") {
      let obj = {
        application_id_: data.root1.appname,
        industry_: data.root1.industrycat,
        platform_: data.platform,
        version_: data.version,
        device_: data.device,
        affected_disability_: "",
        tech_used_: data.assistive,
        bug_category_: data.bugcat,
        bug_subcategory_: data.bugsubcat,
        bug_impact_: data.impact,
        bug_description_: data.desc,
        steps_to_reproduce_: data.steps,
        file: filedata,
        new_version: "yes",
        req_type: "existing_app",
      };
      sendData(obj);
    } else if (
      data.root1.appname === "Other" &&
      data.root1.industrycat !== "Other" &&
      data.version !== "Other"
    ) {
      let obj = {
        application_id_: data.root1.appname,
        industry_: data.root1.industrycat,
        platform_: data.platform,
        version_: data.version,
        device_: data.device,
        affected_disability_: "",
        tech_used_: data.assistive,
        bug_category_: data.bugcat,
        bug_subcategory_: data.bugsubcat,
        bug_impact_: data.impact,
        bug_description_: data.desc,
        steps_to_reproduce_: data.steps,
        file: filedata,
        req_type: "new_app",

        industry_id_: indId,
        app_name_: data.root1.appname,
        app_provider_name_: data.provider,
        app_provider_contact_: data.root1.provider,
        app_url_: data.root1.Url,
        web_or_app_: data.root1.apptype,
        description_: data.desc,
        webapp_region_: data.root1.contact,
      };
      sendData(obj);
    } else if (
      data.root1.appname === "Other" &&
      data.root1.industrycat === "Other"
    ) {
      let obj = {
        application_id_: data.root1.appname,
        industry_: data.root1.industrycat,
        platform_: data.platform,
        version_: data.version,
        device_: data.device,
        affected_disability_: "",
        tech_used_: data.assistive,
        bug_category_: data.bugcat,
        bug_subcategory_: data.bugsubcat,
        bug_impact_: data.impact,
        bug_description_: data.desc,
        steps_to_reproduce_: data.steps,
        file: filedata,
        req_type: "new_app",

        industry_id_: indId,
        app_name_: data.root1.appname,
        app_provider_name_: data.provider,
        app_provider_contact_: data.root1.provider,
        app_url_: data.root1.Url,
        web_or_app_: data.root1.apptype,
        description_: data.desc,
        webapp_region_: data.root1.contact,
        industry_name: data.root1.industryname,
        new_version: "yes",
        ind_desc: data.root1.inddescription,
      };
      sendData(obj);
    }
  };

  const sendData = async (data: any) => {
    const request = axios
      .post(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/upload_bug",
        {
          data,
        },
        {
          headers: {
            Authorization: JSON.parse(
              localStorage.getItem("__Secure-next-auth.session-token") || "{}",
            ),
          },
        },
      )
      .then((response) => response.data);
  };

  const takeFiles = (data: any) => {
    if (data.length <= 3) {
      let sum: any = 0;
      data.map((item: any) => {
        sum = sum + item.size / 1024;
      });
      if (sum > 1024) {
        setfilelimit(true);
        data = [];
      } else {
        setfilelimit(false);
        setfiledata(data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <FormControl isInvalid={errors.name}>
        <Flex flexDir="column" width="100%" height="100%">
          <Steps
            onClickStep={(step) => setStep(step)}
            paddingTop={6}
            paddingBottom={6}
            activeStep={activeStep}
          >
            <Step>
              <Flex w="100%" h="100%">
                <Box w="100%" h="100%">
                  <Box w="95%" paddingBottom={"2%"}>
                    <FormLabel className={styles.requiredfield}>
                      App/Website
                    </FormLabel>
                    <Select
                      // defaultValue={typeofapp}
                      size="sm"
                      {...register("root1.apptype", {
                        required: "Select atleast one option",
                      })}
                      onChange={(e) => {
                        settypeofapp(e.target.value.toLowerCase());
                      }}
                      placeholder="Select App Type"
                    >
                      <option value="app">Application</option>
                      <option value="web">Website</option>
                    </Select>
                    {errors.root1 && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.root1.apptype
                          ? errors.root1.apptype.message
                          : null}
                      </span>
                    )}
                  </Box>

                  <Box w="95%" paddingBottom={"2%"}>
                    <Flex
                      w="100%"
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box w="45%">
                        <FormLabel className={styles.requiredfield}>
                          Name
                        </FormLabel>
                        <Select
                          size="sm"
                          // defaultValue={indId}
                          onClick={getApps}
                          {...register("root1.appname", {
                            required: "Select atleast one option",
                          })}
                          onChange={(e) => setindId(e.target.value)}
                          placeholder="Select Application for which you want to Report Bug"
                        >
                          {appdata.length > 0
                            ? appdata.map((item: any, i: any) => {
                                return (
                                  <option key={i} value={`${item.industry_id}`}>
                                    {item.app_name}
                                  </option>
                                );
                              })
                            : null}

                          <option
                            value="Other"
                            onClick={() => {
                              setappother(true);
                            }}
                          >
                            Other
                          </option>
                        </Select>
                        {errors.root1 && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root1.appname
                              ? errors.root1.appname.message
                              : null}
                          </span>
                        )}
                      </Box>
                      {indcat}
                    </Flex>
                  </Box>
                  {text}
                  {/* <Box w="95%" paddingBottom={"2%"}>
                    <Flex
                      w="100%"
                      flexDirection={"row"}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      {indId === "Other" ? (
                        <Box w="45%">
                          <FormLabel className={styles.requiredfield}>
                            App provider contact
                          </FormLabel>
                          <Input
                            id="contact"
                            placeholder="Contact"
                            {...register("contact", {
                              required: "This field is required",
                            })}
                            size="sm"
                          ></Input>
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.contact ? errors.contact.message : null}
                            </span>
                          )}
                        </Box>
                      ) : null}

                      {indId === "Other" ? (
                        <Box w="45%">
                          <FormLabel className={styles.requiredfield}>
                            App description
                          </FormLabel>
                          <Input
                            id="App description"
                            placeholder="appdescription"
                            {...register("root1.appdescription", {
                              required: "This field is required",
                            })}
                            size="sm"
                          ></Input>
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root1.appdescription
                                ? errors.root1.appdescription.message
                                : null}
                            </span>
                          )}
                        </Box>
                      ) : null}
                    </Flex>
                  </Box>

                  <Box w="95%" paddingBottom={5}>
                    <Flex
                      w="100%"
                      flexDirection={"row"}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      {indId === "Other" ? (
                        <Box w="45%">
                          <FormLabel className={styles.requiredfield}>
                            Url
                          </FormLabel>
                          <Input
                            id="Url"
                            placeholder="Url"
                            {...register("root1.Url", {
                              required: "This field is required",
                            })}
                            size="sm"
                          ></Input>
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root1.Url
                                ? errors.root1.Url.message
                                : null}
                            </span>
                          )}
                        </Box>
                      ) : null}
                      {industryOther === "Other" && indId === "Other" ? (
                        <Box w="45%" paddingBottom={"2%"}>
                          <FormLabel className={styles.requiredfield}>
                            App provider
                          </FormLabel>
                          <Input
                            id="provider"
                            placeholder="Provider"
                            {...register("root1.provider", {
                              required: "This is required",
                              minLength: {
                                value: 4,
                                message: "Minimum length should be 4",
                              },
                            })}
                          ></Input>
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root1.provider
                                ? errors.root1.provider.message
                                : null}
                            </span>
                          )}
                        </Box>
                      ) : null}
                    </Flex>
                  </Box> */}
                  {/* 
                  {indType === "Other" && indId === "Other" ? (
                    <Box w="95%" paddingBottom={"2%"}>
                      <Flex
                        w="100%"
                        flexDirection={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Box w="45%">
                          <FormLabel className={styles.requiredfield}>
                            Industry name
                          </FormLabel>
                          <Input
                            id="industryname"
                            placeholder="Industry name"
                            {...register("root1.industryname", {
                              required: "This field is required",
                            })}
                            size="sm"
                          ></Input>
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root1.industryname
                                ? errors.root1.industryname
                                : null}
                            </span>
                          )}
                        </Box>

                        <Box w="45%">
                          <FormLabel className={styles.requiredfield}>
                            Industry description
                          </FormLabel>
                          <Textarea
                            id="inddescription"
                            placeholder="Industry description"
                            {...register("root1.inddescription", {
                              required: "This field is required",
                            })}
                          />
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root1.inddescription
                                ? errors.root1.inddescription.message
                                : null}
                            </span>
                          )}
                        </Box>
                      </Flex>
                    </Box>
                              ) : null*/}
                </Box>
              </Flex>
            </Step>
            <Step>
              <Box w="95%" paddingBottom={"5"}>
                {firstempties !== 0 && firstempties !== undefined ? (
                  <Box paddingBottom={4} w="155px">
                    <Flex
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <IconButton
                        colorScheme="red"
                        aria-label="Share"
                        onClick={() => {
                          prevStep();
                        }}
                        variant={"solid"}
                        size="sm"
                        icon={<ArrowLeftIcon />}
                      />

                      <Text> {`${firstempties} empty field/s`}</Text>
                    </Flex>
                  </Box>
                ) : null}

                {typeofapp === "app" ? (
                  <Flex
                    w="100%"
                    flexDirection={"row"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                  >
                    <Box w="45%">
                      <FormLabel className={styles.requiredfield}>
                        Platform
                      </FormLabel>
                      <Select
                        id="platform"
                        // defaultValue="Android"
                        {...register("platform", {
                          required: "This field is required",
                        })}
                        onClick={getAppVersion}
                        onChange={(e) => {
                          typeofplatform(e.target.value);
                        }}
                        name="platform"
                        size="sm"
                        placeholder="Select Platform"
                      >
                        {typeofapp === "app" ? (
                          <>
                            <option value={"android"}>Android</option>
                            <option value={"iOS"}>iOS</option>
                          </>
                        ) : null}
                      </Select>
                      {errors.platform && (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          {errors.platform ? errors.platform.message : null}
                        </span>
                      )}
                    </Box>

                    <Box w="45%">
                      <FormLabel className={styles.requiredfield}>
                        Version
                      </FormLabel>
                      <Select
                        id="version"
                        //defaultValue="Other"
                        {...register("version", {
                          required: "This field is required",
                        })}
                        onChange={(e) => handleVerOther(e.target.value)}
                        name="version"
                        size="sm"
                        placeholder="Select Version"
                      >
                        {versions
                          .filter((item: any) => {
                            if (item.os !== platform) {
                              return item;
                            } else {
                              return null;
                            }
                          })
                          .map((item: any, i: any) => {
                            return (
                              <option key={i} value={item.version}>
                                {item.version}
                              </option>
                            );
                          })}
                        <option value="Other">Other</option>
                        {/* <option value="Not Specified">Not Specified</option> */}
                      </Select>
                      {errors.version && (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          {errors.version ? errors.version.message : null}
                        </span>
                      )}
                      {otherv === "Other" ? (
                        <Box w="100%" paddingTop={3}>
                          <FormLabel fontSize={15}>Specific version</FormLabel>
                          <Input
                            {...register("userversion", {
                              required: "This field is required",
                            })}
                            size="sm"
                            placeholder="version"
                          ></Input>
                        </Box>
                      ) : null}
                    </Box>
                  </Flex>
                ) : null}
              </Box>

              <Box w="100%">
                <Flex
                  w="95%"
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box w="45%" h="100%" paddingBottom={"1%"}>
                    <FormLabel className={styles.requiredfield}>
                      Bug category
                    </FormLabel>
                    <Select
                      size="sm"
                      {...register("bugcat", {
                        required: "This field is required",
                      })}
                      onClick={getCategory}
                      onChange={(e) => {
                        setcatid(e.target.value);
                      }}
                      placeholder="Select a Category"
                    >
                      {
                        category.length > 0
                          ? category.map((item, i: any) => {
                              return (
                                <option key={i} value={item.id}>
                                  {item.category_name}
                                </option>
                              );
                            })
                          : null
                        // (
                        //   <option>Select a Category</option>
                        // )
                      }
                    </Select>
                  </Box>

                  <Box w="45%" h="100%" paddingBottom={"1%"}>
                    <FormLabel className={styles.requiredfield}>
                      Bug subcategory
                    </FormLabel>
                    <Select
                      size="sm"
                      {...register("bugsubcat", {
                        required: "This field is required",
                      })}
                      placeholder="Select a Sub-Category"
                    >
                      {
                        subcategory.length > 0
                          ? subcategory.map((item: { name: string }) => {
                              return (
                                <>
                                  <option key={item.name}>{item.name}</option>
                                </>
                              );
                            })
                          : null
                        // (
                        //   <option>Select a Subcategory</option>
                        // )
                      }
                    </Select>
                  </Box>
                </Flex>
              </Box>

              <Box w="100%">
                <Flex
                  w="95%"
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box w="45%" h="100%" paddingBottom={"1%"}>
                    <FormLabel className={styles.requiredfield}>
                      Bug impact
                    </FormLabel>
                    <Input
                      id="impact"
                      placeholder="Impact of bug"
                      {...register("impact", {
                        required: "This field is required",
                      })}
                      name="impact"
                      size="sm"
                    ></Input>

                    {errors.impact && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.impact ? errors.impact.message : null}
                      </span>
                    )}
                  </Box>

                  <Box w="45%" h="100%" paddingBottom={"1%"}>
                    <FormLabel className={styles.requiredfield}>
                      Description
                    </FormLabel>
                    <Textarea
                      id="desc"
                      placeholder="Describe the bug"
                      {...register("desc", {
                        required: "This field is required",
                      })}
                      name="desc"
                      size="sm"
                    ></Textarea>
                    {errors.desc && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.desc ? errors.desc.message : null}
                      </span>
                    )}
                  </Box>
                </Flex>
              </Box>

              <Box w="95%" paddingBottom={"1%"}>
                <Flex
                  w="100%"
                  flexDirection={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <Box w="45%">
                    <FormLabel>Bug evidence</FormLabel>
                    <Upload
                      maxCount={3}
                      onChange={(e) => {
                        takeFiles(e.fileList);
                      }}
                      accept=".jpg,.png,.jpeg,.pdf"
                    >
                      <Button>Upload</Button>
                    </Upload>
                    {filelimit ? (
                      <span style={{ color: "red" }}>
                        File limit exceeded (Max size: 1 Mb)
                      </span>
                    ) : null}
                  </Box>

                  <Box w="45%">
                    <FormLabel>Assistive technology used</FormLabel>
                    <Select
                      size="sm"
                      {...register("getAssistiveTechnology", {
                        required: "This field is required",
                      })}
                      placeholder="Select Assistive Technology"
                    >
                      {/* <option value="App">One</option>
                          <option value="Website">Two</option>
                          <option value="Other">Other</option> */}
                      {assistiveTech && assistiveTech.length > 0
                        ? assistiveTech.map((item: any, i: any) => {
                            return (
                              <option key={i} value={`${item.name}`}>
                                {item.name}
                              </option>
                            );
                          })
                        : null}
                    </Select>
                    {/* <Input
                      id="assistive"
                      placeholder="Technologies used"
                      {...register("assistive", {
                        required: "This field is required",
                      })}
                      name="assistive"
                    ></Input>
                    {errors.assistive && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.assistive ? errors.assistive.message : null}
                      </span>
                    )} */}
                  </Box>
                </Flex>
              </Box>
            </Step>

            <Step>
              <Box w="95%" paddingTop={5} paddingBottom={20}>
                {secondempties !== 0 && secondempties !== undefined ? (
                  <Box paddingBottom={4} w="155px">
                    <Flex
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <IconButton
                        colorScheme="red"
                        aria-label="Share"
                        onClick={() => {
                          prevStep();
                        }}
                        variant={"solid"}
                        size="sm"
                        icon={<ArrowLeftIcon />}
                      />

                      <Text> {`${secondempties} empty field/s`}</Text>
                    </Flex>
                  </Box>
                ) : null}
                <Flex
                  w="100%"
                  flexDirection={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <Box w="45%">
                    <FormLabel className={styles.requiredfield}>
                      Steps to reproduce
                    </FormLabel>
                    <Textarea
                      id="steps"
                      placeholder="Steps to reproduce bug"
                      {...register("steps", {
                        required: "This field is required",
                      })}
                      name="steps"
                    ></Textarea>
                    {errors.steps && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.steps ? errors.steps.message : null}
                      </span>
                    )}
                  </Box>

                  <Box w="45%">
                    <FormLabel>Device</FormLabel>
                    <Textarea
                      id="device"
                      placeholder="Device"
                      {...register("device", {
                        required: "This field is required",
                      })}
                      name="device"
                    ></Textarea>
                    {errors.device && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.device.message}
                      </span>
                    )}
                  </Box>
                </Flex>
              </Box>

              <Box w="95%" paddingLeft={20}>
                <Flex
                  w="100%"
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box w="20%">
                    <Checkbox
                      className={styles.requiredfield}
                      paddingBottom={"1%"}
                      colorScheme="green"
                      defaultChecked
                    >
                      Terms and conditions
                    </Checkbox>
                  </Box>
                </Flex>
              </Box>
            </Step>
          </Steps>
          {activeStep === steps.length ? (
            <Flex p={4}>
              <Button mx="auto" size="sm" onClick={reset}>
                Reset
              </Button>
            </Flex>
          ) : (
            <Flex width="100%" justify="flex-end">
              <Button
                isDisabled={activeStep === 0}
                mr={4}
                onClick={prevStep}
                size="sm"
                variant="ghost"
              >
                Prev
              </Button>
              {activeStep === steps.length - 1 ? (
                firstempties === 0 && secondempties === 0 ? (
                  <Button
                    size="sm"
                    type="submit"
                    bg={"green"}
                    color={"white"}
                    onClick={() => {
                      checkEmptyinputsOne();
                      checkEmptyinputTwo();
                    }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    disabled
                    size="sm"
                    type="submit"
                    bg={"green"}
                    color={"white"}
                    isLoading={isSubmitting}
                    onClick={() => {
                      nextStep();
                    }}
                  >
                    Submit
                  </Button>
                )
              ) : (
                <Button
                  size="sm"
                  isLoading={isSubmitting}
                  onClick={() => {
                    nextStep();
                    checkEmptyinputsOne();
                    checkEmptyinputTwo();
                  }}
                >
                  Next
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </FormControl>
    </form>
  );
};
