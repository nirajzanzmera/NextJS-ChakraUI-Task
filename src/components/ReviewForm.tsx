import React, { useState, useEffect } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import axios from "axios";
import {
  chakra,
  Box,
  Button,
  Stack,
  Image,
  Text,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Flex,
  Spacer,
  IconButton,
  Select,
  Checkbox,
  CheckboxGroup,
  Textarea,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import styles from "../../styles/first.module.css";
import Item from "antd/lib/list/Item";
import countryList from "../../public/assets/countryList.json";
import NameSearch from "./NameSearch";
import IndustrySearch from "./IndustrySearch";

export default function ReviewForm() {
  const [typeofapp, settypeofapp] = useState("");
  const [appdata, setappdata] = useState<any[]>([]);
  const [otherindustry, setOtherIndustry] = useState("");
  const [firstempties, setfirstempties] = useState<Number>();
  const [secondempties, setsecondempties] = useState<Number>();
  const [firstform, setfirstform] = useState({});
  const [secondform, setsecondform] = useState({});
  const [industryOther, setindustryOther] = useState("Other");
  const [industries, setindustries] = useState<any[]>([]);
  const [newIndustry, setnewIndustry] = useState<Array<Object>>([]);
  const [indId, setindId] = useState<any>();
  // const [indId, setindId] = useState("Other");
  const [indType, setindType] = useState<any>();
  const [appother, setappother] = useState<boolean>(false);
  const [platform, setplatform] = useState<String>("");
  const [otherv, setotherv] = useState("");
  const [otherTech, setotherTech] = useState("");
  const [success, setSuccess] = useState(false);
  const [versions, setversions] = useState<any[]>([]);
  const [countryName, setCountryName] = useState<string>();
  const [assistiveTech, setAssistiveTech] = useState<Array<Object>>([]);
  const [responsedata, setResponseData] = useState<any>("");
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    control,
    unregister,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  const getAppVersion = async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/appversions?app_id=${indId?.app_id}`,
      )
      .then((response) => response.data);
    setversions(request.Appversions);
  };
  // useEffect(() => {
  //   if (indId?.app_id === "Other") {
  //     setindustries([]);
  //     let nullOBj = {
  //       created_by: "null",
  //       created_on: "null",
  //       current_state: "null",
  //       industry_id: "null",
  //       industry_name: "Other",
  //       last_modified_by: "null",
  //       last_modified_on: "null",
  //     };
  //     setnewIndustry([nullOBj, ...industries]);
  //   } else {
  //     const getVersions = async () => {
  //       const request = await axios
  //         .get(
  //           `https://172-105-61-130.ip.linodeusercontent.com:5000/appversions?app_id=${indId?.app_id}`,
  //         )
  //         .then((response) => response.data);
  //       setversions(request.Appversions);
  //     };
  //     getVersions();

  //     const getAssistiveTechnology = async () => {
  //       const request = await axios
  //         .get(
  //           `https://172-105-61-130.ip.linodeusercontent.com:5000/get_assistive_tech`,
  //         )
  //         .then((response) => response.data);
  //       setAssistiveTech(request.technologies);
  //     };
  //     getAssistiveTechnology();

  //     const getIndustry = async () => {
  //       const request = await axios
  //         .get("https://172-105-61-130.ip.linodeusercontent.com:5000/showinds")
  //         .then((response) => response.data);
  //       setindustries(request.Industries);
  //     };
  //     getIndustry();
  //   }
  // }, [indId]);
  const getAssistiveTechnology = async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/get_assistive_tech`,
      )
      .then((response) => response.data);
    setAssistiveTech(request.technologies);
  };

  useEffect(() => {
    getAssistiveTechnology();
  }, []);
  const getOtherIndustry = (event: any) => {
    if (event.target.value) {
      setOtherIndustry(event.target.value);
    }
  };
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleSubmitForm = (data: any) => {
    if (data.root1.application_id_.app_id !== "Other") {
      if (data.root1.web_or_app_ === "web") {
        const form = new FormData();
        form.append("title_", data.root2.title_);
        form.append("reviewed_disability_", data.root2.reviewed_disability_);
        form.append("review_description_", data.root2.review_description_);
        form.append("version", "");
        form.append("url_website_", "");
        form.append("industry_", data.root1.application_id_.industry_name);
        form.append("platform", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("tech_used_", data.root2.tech_used_ );
        form.append("otherUsedTech", data.root2.tech_used_==="Other" 
        ?data.root2.otherUsedTech:"");
        form.append("new_version", "no");
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "existing_app");
        form.append("webapp_region_", data.root2.webapp_region_);
        sendData(form);
      } else if (data.root1.web_or_app_ === "app") {
        const form = new FormData();
        form.append("title_", data.root2.title_);
        form.append("reviewed_disability_", data.root2.reviewed_disability_);
        form.append("review_description_", data.root2.review_description_);
        form.append("url_website_", "");
        form.append("industry_", data.root1.application_id_.industry_name);
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("tech_used_",data.root2.tech_used_);
        form.append("otherUsedTech", data.root2.tech_used_==="Other" 
        ?data.root2.otherUsedTech:"");
        form.append(
          "new_version",
          data.root1.version === "Other" ? "yes" : "no",
        );
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "existing_app");
        form.append(
          "version",
          data.root1.version === "Other"
            ? data.root1.userversion
            : data.root2.version,
        );
        form.append("platform", data.root1.platform);
        form.append("webapp_region_", data.root2.webapp_region_);
        sendData(form);
      }
    
    } else if (
      data.root1.application_id_.app_name === "Other" &&
      data.root1.industry_id_.industry_name !== "Other"
    ) {
      if (data.root1.web_or_app_ === "web") {
        const form = new FormData();
        form.append("title_", data.root2.title_);
        form.append("reviewed_disability_", data.root2.reviewed_disability_);
        form.append("review_description_", data.root2.review_description_);
        form.append("platform", "");
        form.append("version", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("tech_used_",data.root2.tech_used_);
        form.append("otherUsedTech", data.root2.tech_used_ === "Other" ? data.root2.otherUsedTech:"");
        form.append("new_version", "no");
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "new_app");
        form.append("industry_", data.root1.industry_id_.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("url_website_", data.root1.url);
        form.append("app_url_", data.root1.url);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root2.webapp_region_);
        sendData(form);
      } else if (data.root1.web_or_app_ === "app") {
        const form = new FormData();
        form.append("title_", data.root2.title_);
        form.append("reviewed_disability_", data.root2.reviewed_disability_);
        form.append("review_description_", data.root2.review_description_);
        form.append("url_website_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("tech_used_",data.root2.tech_used_);
        form.append("otherUsedTech", data.root2.tech_used_==="Other" 
        ?data.root2.otherUsedTech:"");
        form.append("new_version", "yes");
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "new_app");
        form.append("industry_", data.root1.industry_id_.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root2.webapp_region_);
        form.append("app_url_", data.root1.url);
        form.append(
          "version",
          data.root1.version === "Other"
            ? data.root1.userversion
            : data.root1.version,
        );
        form.append("platform", data.root1.platform);
        sendData(form);
      }
    } else if (
      data.root1.application_id_.app_name === "Other" &&
      data.root1.industry_id_.industry_name === "Other"
    ) {

      if (data.root1.web_or_app_ === "web") {
        const form = new FormData();
        form.append("title_", data.root2.title_);
        form.append("reviewed_disability_", data.root2.reviewed_disability_);
        form.append("review_description_", data.root2.review_description_);
        form.append("platform", "");
        form.append("version", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("tech_used_",data.root2.tech_used_);
        form.append("otherUsedTech", data.root2.tech_used_==="Other" 
        ?data.root2.otherUsedTech:"");
        form.append("new_version", "no");
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "new_app_and_ind");
        form.append("industry_", data.root1.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("url_website_", data.root1.url);
        form.append("app_url_", data.root1.url);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root2.webapp_region_);
        form.append("industry_name", data.root1.industry_name);
        form.append("ind_desc", data.root1.ind_desc);
        sendData(form);
      } else if (data.root1.web_or_app_ === "app") {
        const form = new FormData();
        form.append("title_", data.root2.title_);
        form.append("reviewed_disability_", data.root2.reviewed_disability_);
        form.append("review_description_", data.root2.review_description_);
        form.append("url_website_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("tech_used_",data.root2.tech_used_);
        form.append("otherUsedTech", data.root2.tech_used_==="Other" 
        ?data.root2.otherUsedTech:"");
        form.append("new_version", "yes");
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "new_app_and_ind");
        form.append("industry_", data.root1.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root2.webapp_region_);
        form.append("app_url_", data.root1.url);
        form.append(
          "version",
          data.root1.version === "Other"
            ? data.root1.userversion
            : data.root1.version,
        );
        form.append("platform", data.root1.platform);
        form.append("industry_name", data.root1.industry_name);
        form.append("ind_desc", data.root1.ind_desc);
        sendData(form);
      }
    }
  };

  const sendData = async (data: any) => {
    const request = axios
      .post(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/upload_report",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
        }
        setResponseData(response);
      });
  };

  const getApps = async () => {
    const request = await axios
      .get("https://172-105-61-130.ip.linodeusercontent.com:5000/showapps")
      .then((response) => response.data);
    setappdata(request.Apps);
  };

  const steps = [{ label: "Step 1" }, { label: "Step 2" }];

  const checkFirstPage = () => {
    let allvalues = getValues([
      "apptype",
      "appname",
      "appindustry",
      "platform",
      "version",
      "sversion",
      "inddescription",
    ]);

    if (allvalues[4] == undefined && allvalues[5] == undefined) {
      let obj: any = {
        apptype: allvalues[0],
        appname: allvalues[1],
        appplatform: allvalues[2],
        appindustry: allvalues[3],
      };
      let emptysecondcounter = 0;
      for (var key in obj) {
        if (obj[key] === "") {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setsecondempties(emptysecondcounter);
    } else {
      let obj: any = {
        apptype: allvalues[0],
        appname: allvalues[1],
        appplatform: allvalues[2],
        appindustry: allvalues[3],
        indsutryname: allvalues[4],
        industrydescription: allvalues[5],
      };
      let emptysecondcounter = 0;
      for (var key in obj) {
        if (obj[key] === "") {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setsecondempties(emptysecondcounter);
    }
  };

  const checkEmptyinputsOne = () => {
    const allvalues = getValues("root1");

    let FirstValues = allvalues;

    let emptycounterone = 0;
    for (var key in FirstValues) {
      if (FirstValues[key] === undefined || FirstValues[key] === "") {
        emptycounterone = emptycounterone + 1;
      }
    }
    setfirstempties(emptycounterone);
    setfirstform(FirstValues);
  };

  const checkEmptyinputTwo = () => {
    const allvalues = getValues("root2");
    // let text1 = <SelectIndcat />;

    // let text2 = <SelectIndcatOther />;
    let obj2: any = allvalues;
    if (typeofapp.toLowerCase() === "App".toLowerCase()) {
      let emptysecondcounter = 0;
      for (var key in obj2) {
        if (
          key != "tech_used_" &&
          (obj2[key] === undefined || obj2[key] === "")
        ) {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setsecondempties(emptysecondcounter);
      setsecondform(obj2);
    } else if (typeofapp.toLowerCase() === "Web".toLowerCase()) {
      let emptysecondcounter = 0;
      for (var key in obj2) {
        if (
          key != "tech_used_" &&
          (obj2[key] === undefined || obj2[key] === "")
        ) {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setsecondempties(emptysecondcounter);
      setsecondform(obj2);
    }
  };

  const handleIndustryOther = (event: any) => {
    setindustryOther(event.target.value);
  };

  const handleVerOther = (val: any) => {
    setotherv(val);
  };

  const handleTechOther = (val: any) => {
    setotherTech(val);
  };

  const typeofplatform = (plat: any) => {
    setplatform(plat);
  };

  return success ? (
    <Alert status="success">
      <AlertIcon />
      Review has been added successfully ,{" "}
      <Link href={`/${responsedata?.data?.slug && responsedata?.data?.slug}`} paddingInline={1}>
        view
      </Link>
    </Alert>
  ) : (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Flex flexDirection={"row"} w="100%" paddingTop={5} height="100%">
        <Box w="100%" h="max-content">
          <FormControl>
            <Steps
              onClickStep={(step) => setStep(step)}
              paddingTop={0}
              paddingBottom={0}
              activeStep={activeStep}
            >
              <Step label={"Application Details"}>
                <Flex w="100%" h="100%" minH={300}>
                  <Box w="100%" paddingBottom={"2%"} paddingTop={8}>
                    <Box w="100%" paddingBottom={"2%"}>
                      {/* <Flex
                        flexDirection={"row"}
                        alignItems={"flex-start"}
                        h="max-content"
                        justifyContent={"space-evenly"}
                        w="95%"
                      >
                        <Box w="95%"> */}
                      <FormLabel
                        htmlFor="root1.web_or_app_"
                        className={styles.requiredfield}
                      >
                        Application type
                      </FormLabel>
                      <Select
                        id="root1.web_or_app_"
                        required
                        {...register("root1.web_or_app_", {
                          required: "This is required",
                        })}
                        onChange={(e) => {
                          setindId("");
                          settypeofapp(e.target.value.toLowerCase());
                          
                          if (indId?.app_id !== "Other") {
                            // unregister("root1.app_name_");
                            unregister("root1.industry_id_");
                            unregister("root1.app_provider_contact_");
                            unregister("root1.description_");
                            unregister("root1.url");
                            unregister("root1.app_provider_name_");
                            unregister("root1.industry_name");
                            unregister("root1.ind_desc");
                            unregister("root1.platform");
                            unregister("root1.version");
                            unregister("root1.userversion");
                            
                          }
                        
                        }}
                        size="sm"
                        placeholder="Select App Type"
                      >
                        <option value="app">Application</option>
                        <option value="web">Website</option>
                      </Select>

                      {errors.root1 && (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          {errors.root1.web_or_app_
                            ? errors.root1.web_or_app_.message
                            : null}
                        </span>
                      )}
                    </Box>

                    {/* 
                      </Flex>
                    </Box> */}
                    {/* </Box> */}

                    <Box w="95%" paddingBottom={"2%"}>
                      {/* <Box w="100%"> */}
                      <Flex
                        flexDirection={["column", "column", "row"]}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        w="100%"
                      >
                        <Box w={["100%", "100%", "45%"]}>
                          {/* <FormLabel className={styles.requiredfield}>
                            Name
                          </FormLabel> */}
                          {/* <Select
                            size='sm'
                            {...register('appname', {
                              required: 'This is required',
                            })}
                            onClick={getApps}
                            onChange={(e) => setindId(e.target.value)}
                            placeholder='Select Application for which you want to Add Review'
                          >
                            {appdata.length > 0
                              ? appdata.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={`${item.industry_id}`}
                                    >
                                      {item.app_name}
                                    </option>
                                  )
                                })
                              : null}

                            <option
                              value='Other'
                              onClick={() => {
                                setappother(true)
                              }}
                            >
                              Other
                            </option>
                          </Select> */}
                          <FormLabel
                            htmlFor="root1.application_id_"
                            className={styles.requiredfield}
                          >
                            Name
                          </FormLabel>
                          <NameSearch
                            review
                            typeofapp={typeofapp}
                            setAppName={setindId}
                            appName={indId}
                            appState={setindId}
                            unregister={unregister}
                            control={control}
                          />
                          {errors.root1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root1.application_id_
                                ? errors.root1.application_id_.message
                                : null}
                            </span>
                          )}
                        </Box>
                        {indId?.app_id === "Other" && (
                          <Box w={["100%", "100%", "45%"]}>
                            <FormLabel
                              htmlFor="root1.app_name_"
                              className={styles.requiredfield}
                            >
                              App Name
                            </FormLabel>
                            <Input
                              id="root1.app_name_"
                              required
                              placeholder="App Name"
                              {...register("root1.app_name_", {
                                required: "This field is required",
                              })}
                              size="sm"
                            ></Input>
                            {errors.root1 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.root1.app_name_
                                  ? errors.root1.app_name_.message
                                  : null}
                              </span>
                            )}
                          </Box>
                        )}
                      </Flex>
                    </Box>
                    {/* {indId === "Other" && <Indcat />}
                    {text} */}
                    {indId?.app_id === "Other" && (
                      <Box w="95%" paddingBottom={"1%"}>
                        <Flex
                          w="100%"
                          flexDirection={["column", "column", "row"]}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <>
                            <Box w={["100%", "100%", "45%"]}>
                              <Box w="100%" paddingBottom={"2%"}>
                                <FormLabel
                                  htmlFor="root1.industry_id_"
                                  className={styles.requiredfield}
                                >
                                  Industry Category
                                </FormLabel>
                                <IndustrySearch
                                  setindustries={setindType}
                                  industries={indType}
                                  unregister={unregister}
                                  control={control}
                                />
                                {errors.root1 && (
                                  <span
                                    style={{ color: "red", fontSize: "13px" }}
                                  >
                                    {errors.root1.industry_id_
                                      ? errors.root1.industry_id_.message
                                      : null}
                                  </span>
                                )}
                              </Box>
                            </Box>
                          </>
                        </Flex>
                      </Box>
                    )}
                    {indId?.app_id === "Other" ? (
                      <>
                        <Box w="95%" paddingBottom={"2%"}>
                          <Flex
                            w="100%"
                            flexDirection={["column", "column", "row"]}
                            alignItems={"flex-start"}
                            justifyContent={"space-between"}
                          >
                            <Box w={["100%", "100%", "45%"]}>
                              <FormLabel
                                htmlFor="root1.app_provider_contact_"
                                className={styles.requiredfield}
                              >
                                App provider contact
                              </FormLabel>
                              <Input
                                id="root1.app_provider_contact_"
                                required
                                placeholder="Contact"
                                {...register("root1.app_provider_contact_", {
                                  required: "This field is required",
                                })}
                                size="sm"
                              ></Input>
                              {errors.root1 && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  {errors.root1.app_provider_contact_
                                    ? errors.root1.app_provider_contact_.message
                                    : null}
                                </span>
                              )}
                            </Box>

                            <Box w={["100%", "100%", "45%"]}>
                              <FormLabel
                                htmlFor="root1.description_"
                                className={styles.requiredfield}
                              >
                                App description
                              </FormLabel>
                              <Input
                                id="root1.description_"
                                required
                                placeholder="App description"
                                {...register("root1.description_", {
                                  required: "This field is required",
                                })}
                                size="sm"
                              ></Input>
                              {errors.root1 && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  {errors.root1.description_
                                    ? errors.root1.description_.message
                                    : null}
                                </span>
                              )}
                            </Box>
                          </Flex>
                        </Box>

                        <Box w="95%" paddingBottom={5}>
                          <Flex
                            w="100%"
                            flexDirection={["column", "column", "row"]}
                            alignItems={"flex-start"}
                            justifyContent={"space-between"}
                          >
                            <Box w={["100%", "100%", "45%"]}>
                              <FormLabel
                                htmlFor="url"
                                className={styles.requiredfield}
                              >
                                Provider URL
                              </FormLabel>
                              <Input
                                id="url"
                                required
                                placeholder="Url"
                                {...register("root1.url", {
                                  required: "This field is required",
                                })}
                                size="sm"
                              ></Input>
                              {errors.root1 && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  {errors.root1.url
                                    ? errors.root1.url.message
                                    : null}
                                </span>
                              )}
                            </Box>

                            <Box
                              w={["100%", "100%", "45%"]}
                              paddingBottom={"2%"}
                            >
                              <FormLabel
                                htmlFor="root1.app_provider_name_"
                                className={styles.requiredfield}
                              >
                                App provider
                              </FormLabel>
                              <Input
                                id="root1.app_provider_name_"
                                required
                                placeholder="Provider"
                                {...register("root1.app_provider_name_", {
                                  required: "This is required",
                                  minLength: {
                                    value: 4,
                                    message: "Minimum length should be 4",
                                  },
                                })}
                              ></Input>
                              {errors.root1 && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  {errors.root1.app_provider_name_
                                    ? errors.root1.app_provider_name_.message
                                    : null}
                                </span>
                              )}
                            </Box>
                          </Flex>
                          
                          
                        </Box>
                      </>
                    ) : null}
                    {indId?.app_id === "Other" &&
                    indType?.industry_id === "Other" ? (
                      <>
                        <Box w="95%" paddingBottom={"2%"}>
                          <Flex
                            w="100%"
                            flexDirection={["column", "column", "row"]}
                            alignItems={"flex-start"}
                            justifyContent={"space-between"}
                          >
                            <Box w={["100%", "100%", "45%"]}>
                              <FormLabel
                                htmlFor="root1.industry_name"
                                className={styles.requiredfield}
                              >
                                Industry name
                              </FormLabel>
                              <Input
                                id="root1.industry_name"
                                required
                                placeholder="Industry name"
                                {...register("root1.industry_name", {
                                  required: "This field is required",
                                })}
                                size="sm"
                              ></Input>
                              {errors.root1 && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  {errors.root1.industry_name
                                    ? errors.root1.industry_name
                                    : null}
                                </span>
                              )}
                            </Box>

                            <Box w={["100%", "100%", "45%"]}>
                              <FormLabel
                                htmlFor="root1.ind_desc"
                                className={styles.requiredfield}
                              >
                                Industry description
                              </FormLabel>
                              <Textarea
                                id="root1.ind_desc"
                                required
                                placeholder="Industry description"
                                {...register("root1.ind_desc", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.root1 && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  {errors.root1.ind_desc
                                    ? errors.root1.ind_desc.message
                                    : null}
                                </span>
                              )}
                            </Box>
                          </Flex>
                        </Box>
                      </>
                    ) : null}

{typeofapp === "app" ? (
  <Flex
  w="100%"
  flexDirection={["row", "row", "row"]}
  alignItems={"flex-start"}
  justifyContent={"space-between"}
  >
   <Box w={["100%", "100%", "45%"]}>
    <FormLabel
      htmlFor="root1.platform"
      className={styles.requiredfield}
    >
      Platform
    </FormLabel>
    <Select
      id="root1.platform"
      required
      {...register("root1.platform", {
        required: "This field is required",
      })}
      onClick={getAppVersion}
      onChange={(e) => {
        typeofplatform(e.target.value);
      }}
      size="sm"
      placeholder="Select Platform"
    >
      {typeofapp === "app" ? (
        <>
          <option>Android</option>
          <option>iOS</option>
        </>
      ) : null}
    </Select>
    {errors.root1 && (
      <span
        style={{ color: "red", fontSize: "13px" }}
      >
        {errors.root1.platform
          ? errors.root1.platform.message
          : null}
      </span>
    )}
  </Box>
  <Box w={["100%", "100%", "45%"]}>
    <FormLabel
      htmlFor="root1.version"
      className={styles.requiredfield}
    >
      Version
    </FormLabel>
    <Select
      id="root1.version"
      //defaultValue="Other"
      required
      {...register("root1.version", {
        required: "This field is required",
      })}
      onChange={(e) => handleVerOther(e.target.value)}
      name="root1.version"
      size="sm"
      placeholder="Select Version"
    >
      {versions
        .filter(
          (item: any) =>
            item.os.toLowerCase() ===
            platform.toLowerCase(),
        )
        .map((item: any, i: any) => {
          return (
            <option key={i} value={item.version}>
              {item.version}
            </option>
          );
        })}
      <option value="Other">Other</option>
    </Select>
    {errors.root1 && errors.root1.version && (
      <span
        style={{ color: "red", fontSize: "13px" }}
      >
        {errors.root1.version
          ? errors.root1.version.message
          : null}
      </span>
    )}
    {otherv === "Other" ? (
      <Box w="100%" paddingTop={3}>
        <FormLabel
          fontSize={15}
          htmlFor="root1.userversion"
          className={styles.requiredfield}
        >
          Specific version
        </FormLabel>
        <Input
          required
          id="root1.userversion"
          {...register("root1.userversion", {
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
                </Flex>
              </Step>

              <Step label={"Review Details"}>
                <Flex w="100%" h="100%" minH={300}>
                  <Box w="100%" paddingBottom={"2%"} paddingTop={8}>
                    {" "}
                    {firstempties !== 0 ? (
                      <Box paddingBottom={4} w="155px">
                        <Flex
                          flexDirection={["column", "column", "row"]}
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
                    <Box w="100%" h="max-content">
                      <Box w="100%" paddingBottom={7} paddingTop={6}>
                        <Flex
                          flexDirection={["column", "column", "row"]}
                          alignItems={"flex-start"}
                          justifyContent={"space-evenly"}
                          w="95%"
                        >
                          <Box w={["100%", "100%", "45%"]}>
                            <FormLabel
                              htmlFor="root2.reviewed_disability_"
                              className={styles.requiredfield}
                            >
                              Reviewed for which disablity
                            </FormLabel>
                            <Select
                              size="sm"
                              id="root2.reviewed_disability_"
                              required
                              placeholder="Select Disability Type"
                              {...register("root2.reviewed_disability_", {
                                required: "This is required",
                              })}
                            >
                              <option value="No Disability">
                                No Disability
                              </option>
                              <option value="Visual Disability">
                                Visual Disability
                              </option>
                              <option value="Hearing Disability">
                                Hearing Disability
                              </option>
                              <option value="Physical / Orthopaedic Disability">
                                Physical / Orthopaedic Disability
                              </option>
                              <option value="Learning Disability">
                                Learning Disability
                              </option>
                              <option value="Intellectual / Neural Disability">
                                Intellectual / Neural Disability
                              </option>
                              <option value="Speech Disability">
                                Speech & Language related Impairment
                              </option>
                            </Select>
                            {errors.root2 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.root2.reviewed_disability_
                                  ? errors.root2.reviewed_disability_.message
                                  : null}
                              </span>
                            )}
                          </Box>

                          <Box w={["100%", "100%", "45%"]}>
                            <FormLabel
                              htmlFor="root2.title_"
                              className={styles.requiredfield}
                            >
                              Review title
                            </FormLabel>
                            <Input
                              id="root2.title_"
                              required
                              placeholder="Review title"
                              {...register("root2.title_", {
                                required: "This is required",
                              })}
                              size="sm"
                            ></Input>
                            {errors.root2 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.root2.title_
                                  ? errors.root2.title_.message
                                  : null}
                              </span>
                            )}
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                    <Box w="100%" h="max-content">
                      <Box w="100%" paddingBottom={7} paddingTop={6}>
                        <Flex
                          flexDirection={["column", "column", "row"]}
                          alignItems={"flex-start"}
                          justifyContent={"space-evenly"}
                          w="95%"
                          paddingBottom={10}
                        >
                          <Box w={["100%", "100%", "45%"]}>
                            <FormLabel htmlFor="root2.tech_used_">
                              Assistive Technology used
                            </FormLabel>
                            <Select
                              id="root2.tech_used_"
                              size="sm"
                              {...register("root2.tech_used_", {})}
                              placeholder="Select Assistive Technology"
                              onChange={(e) => handleTechOther(e.target.value)}
                            >
                              {assistiveTech &&
                                assistiveTech.map((item: any, i: any) => {
                                  return (
                                    <option key={i} value={`${item.name}`}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                            </Select>
                            {errors.root2 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.root2.tech_used_
                                  ? errors.root2.tech_used_.message
                                  : null}
                              </span>
                            )}

                          {otherTech === "Other" ? (
                                <Box w="100%" paddingTop={3}>
                                  <FormLabel
                                    fontSize={15}
                                    htmlFor="root2.otherUsedTech"
                                    className={styles.requiredfield}
                                  >
                                    Specific Tech Used
                                  </FormLabel>
                                  <Input
                                    required
                                    id="root2.otherUsedTech"
                                    {...register("root2.otherUsedTech", {
                                      required: "This field is required",
                                    })}
                                    size="sm"
                                    placeholder="Specific Tech Used"
                                  ></Input>
                                </Box>
                              ) : null}
                              </Box>

                          <Box w={["100%", "100%", "45%"]}>
                            <FormLabel
                              htmlFor="root2.review_description_"
                              className={styles.requiredfield}
                            >
                              Review Description
                            </FormLabel>
                            <Textarea
                              id="root2.review_description_"
                              required
                              {...register("root2.review_description_", {
                                required: "This is required",
                              })}
                            ></Textarea>

                            {errors.root2 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.root2.review_description_
                                  ? errors.root2.review_description_.message
                                  : null}
                              </span>
                            )}
                          </Box>
                        </Flex>
                        
                        <Flex
                          alignItems={"flex-end"}
                          justifyContent={"flex-end"}
                          w="95%"
                          paddingRight="60px"
                        >
                          <Box w={["100%", "100%", "45%"]}>
                            <FormLabel htmlFor="root2.webapp_region_">
                              Region
                            </FormLabel>
                            <Stack direction="column">
                              <Controller
                                name={"root2.webapp_region_"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange } }) => {
                                  return (
                                    <ReactSelect
                                      id="root2.webapp_region_"
                                      value={
                                        countryName
                                          ? {
                                              label: countryName,
                                              value: countryName,
                                            }
                                          : undefined
                                      }
                                      placeholder="Search..."
                                      isRequired
                                      isClearable
                                      onChange={(vals: any) => {
                                        onChange(vals?.value);
                                        setCountryName(vals?.value);
                                      }}
                                      options={countryList.map((x: any) => ({
                                        label: x.name,
                                        value: x.name,
                                      }))}
                                    />
                                  );
                                }}
                              />
                            </Stack>
                          </Box>
                        </Flex>
                  
                      </Box>
                    </Box>
                    {" "}
                    <Box w="100%" h="max-content">
                      <Box w="100%" paddingBottom={7}>
                        <Flex
                          flexDirection={["column", "column", "row"]}
                          alignItems={"flex-start"}
                          justifyContent={"space-evenly"}
                          w="95%"
                          paddingBottom={10}
                          paddingLeft={5}
                        >
                          <Box w={["100%", "100%", "20%"]}>
                            <Checkbox
                              className={styles.requiredfield}
                              paddingBottom={"2%"}
                              required
                              colorScheme="green"
                              defaultChecked
                            >
                              Terms and conditions
                            </Checkbox>
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Step>
            </Steps>
          </FormControl>
        </Box>
      </Flex>

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
            onClick={() =>{
              // checkEmptyinputsOne();
              //     checkEmptyinputTwo();
                  prevStep();
                }}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          {activeStep === steps.length - 1 ? (
            firstempties === 0 ? (
              <Button
                size="sm"
                type="submit"
                bg={"green"}
                color={"white"}
                isLoading={isSubmitting}
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
    </form>
  );
}
