import React, { useState, useEffect, useRef } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import styles from "../../styles/first.module.css";
import NameSearch from "./NameSearch";
import { createStream } from 'rotating-file-stream';

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
  Alert,
  AlertIcon,
  Link,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Upload } from "antd";
import IndustrySearch from "./IndustrySearch";
import { text } from "stream/consumers";
import countryList from "../../public/assets/countryList.json";

// export interface Item {
//   label: string;
//   value: string;
// }

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
  const [otherv, setotherv] = useState("");
  const [otherTech, setOtherTech] = useState("");
  // const [otherv, setotherv] = useState("Other"); --> By Shubham
  const [catid, setcatid] = useState("");
  const [indId, setindId] = useState<any>();
  const [indType, setindType] = useState<any>();
  const [countryName, setCountryName] = useState<string>();
  // const [indId, setindId] = useState("Other"); --> By Shubham
  // const [indType, setindType] = useState("Other"); --> By Shubham

  const [versions, setversions] = useState<any[]>([]);
  const [newIndustry, setnewIndustry] = useState<Array<Object>>([]);
  const [firstempties, setfirstempties] = useState<Number>();
  const [secondempties, setsecondempties] = useState<Number>();
  const [thirdempties, setthirdempties] = useState<Number>();
  const [appName, setAppName] = useState();
  const [industryCat, setIndustryCat] = useState();

  const [platform, setplatform] = useState<String>("");

  const [sender, setsender] = useState({});
  const [filelimit, setfilelimit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filedata, setfiledata] = useState<any>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  const [assistiveTech, setAssistiveTech] = useState<Array<Object>>([]);
  const [responsedata, setResponseData] = useState<any>("");
  // const [urldata, setUrlData] = useState<any>(responsedata.data.slug);
  let text1;

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

  const [typeofapp, settypeofapp] = useState("");
  const [firstform, setfirstform] = useState({});
  const [secondform, setsecondform] = useState({});
  const [thirdform, setthirdform] = useState({});
  
  var fs = require('fs').promises;


  const getApps = async () => {
    const request = await axios
      .get("https://172-105-61-130.ip.linodeusercontent.com:5000/showapps")
      .then((response) => response.data);
    setappdata(request.Apps);
  };


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

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleIndustryOther = (event: any) => {
    setindustryOther(event);
  };

  const getAppVersion = async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/appversions?app_id=${indId?.app_id}`,
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
    // setindId("")
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
  const checkEmptyinputThird = () => {
    const allvalues = getValues("root3");
    // let text1 = <SelectIndcat />;

    // let text2 = <SelectIndcatOther />;
    let obj2: any = allvalues;
    if (typeofapp.toLowerCase() === "App".toLowerCase()) {
      let emptysecondcounter = 0;
      for (var key in obj2) {
        if (obj2[key] === undefined || obj2[key] === "") {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setthirdempties(emptysecondcounter);
      setthirdform(obj2);
    } else if (typeofapp.toLowerCase() === "Web".toLowerCase()) {
      let emptysecondcounter = 0;
      for (var key in obj2) {
        if (obj2[key] === undefined || obj2[key] === "") {
          emptysecondcounter = emptysecondcounter + 1;
        }
      }
      setthirdempties(emptysecondcounter);
      setthirdform(obj2);
    }
  };
  const typeofplatform = (plat: any) => {
    setplatform(plat);
  };

  const handleVerOther = (val: any) => {
    setotherv(val);
  };

  const handleTechOther = (val: any) => {
    setOtherTech(val);
  };

  const handleSubmitForm = (data: any) => {
    if (data.root1.application_id_.app_id !== "Other") {
      if (data.root1.web_or_app_ === "web") {
        const form = new FormData();
        form.append("version_", "");
        form.append("url_website_", "");
        form.append("industry_", data.root1.application_id_.industry_name);
        form.append("platform_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("bug_category_", data.root2.bug_category_);
        form.append("bug_subcategory_", data.root2.bug_subcategory_);
        form.append("bug_impact_", data.root2.bug_impact_);
        form.append("bug_description_", data.root2.bug_description_);
        form.append("tech_used_", data.root3.tech_used_);
        form.append("otherUsedTech", data.root3.tech_used_ === "Other"
          ? data.root3.otherUsedTech
          : "");
        form.append("steps_to_reproduce_", data.root2.steps_to_reproduce_);
        form.append("device_", data.root3.device_);
        form.append("new_version", "no");
        for (let i = 0; i < uploadedFiles.length; i++) {
        form.append("files",filedata.files[i], uploadedFiles[i].name);
        }
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "existing_app");
        form.append("affected_disability_", data.root3.affected_disability_);
        form.append("webapp_region_", data.root3.webapp_region_);
        sendData(form);
      } else if (data.root1.web_or_app_ === "app") {
        const form = new FormData();
        form.append("url_website_", "");
        form.append("industry_", data.root1.application_id_.industry_name);
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("bug_category_", data.root2.bug_category_);
        form.append("bug_subcategory_", data.root2.bug_subcategory_);
        form.append("bug_impact_", data.root2.bug_impact_);
        form.append("bug_description_", data.root2.bug_description_);
        form.append("tech_used_",  data.root3.tech_used_);
        form.append("otherUsedTech", data.root3.tech_used_ === "Other"
        ? data.root3.otherUsedTech
        : "");
        form.append("steps_to_reproduce_", data.root2.steps_to_reproduce_);
        form.append("device_", data.root3.device_);
        form.append("new_version", data.version_ === "Other" ? "yes" : "no");
        for (let i = 0; i < uploadedFiles.length; i++) {
          form.append("files",filedata.files[i], uploadedFiles[i].name);
          }
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("req_type", "existing_app");
        form.append("affected_disability_", data.root3.affected_disability_);
        form.append(
          "version_",
          data.root1.version_ === "Other"
            ? data.root1.userversion
            : data.root1.version_,
        );
        form.append("platform_", data.root1.platform_);
        form.append("webapp_region_", data.root3.webapp_region_);
        sendData(form);
      }
    } else if (
      data.root1.application_id_.app_id === "Other" &&
      data.root1.industry_id_.industry_id !== "Other"
    ) {
      if (data.root1.web_or_app_ === "web") {
        const form = new FormData();
        form.append("platform_", "");
        form.append("version_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("bug_category_", data.root2.bug_category_);
        form.append("bug_subcategory_", data.root2.bug_subcategory_);
        form.append("bug_impact_", data.root2.bug_impact_);
        form.append("bug_description_", data.root2.bug_description_);
        form.append("tech_used_",  data.root3.tech_used_);
        form.append("otherUsedTech", data.root3.tech_used_ === "Other"
        ? data.root3.otherUsedTech
        : "");
        form.append("steps_to_reproduce_", data.root2.steps_to_reproduce_);
        form.append("device_", data.root3.device_);
        form.append("new_version", "no");
        for (let i = 0; i < uploadedFiles.length; i++) {
          form.append("files",filedata.files[i], uploadedFiles[i].name);
          }
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("affected_disability_", data.root3.affected_disability_);
        form.append("req_type", "new_app");
        form.append("industry_", data.root1.industry_id_.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("app_url_", data.root1.url); 
        form.append("url_website_", data.root1.url); 
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root3.webapp_region_);
        sendData(form);
      } else if (data.root1.web_or_app_ === "app") {
        const form = new FormData();
        form.append("url_website_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("bug_category_", data.root2.bug_category_);
        form.append("bug_subcategory_", data.root2.bug_subcategory_);
        form.append("bug_impact_", data.root2.bug_impact_);
        form.append("bug_description_", data.root2.bug_description_);
        form.append("tech_used_",  data.root3.tech_used_);
        form.append("otherUsedTech", data.root3.tech_used_ === "Other"
        ? data.root3.otherUsedTech
        : "");
        form.append("steps_to_reproduce_", data.root2.steps_to_reproduce_);
        form.append("device_", data.root3.device_);
        form.append("new_version", "yes");
        for (let i = 0; i < uploadedFiles.length; i++) {
          form.append("files",filedata.files[i], uploadedFiles[i].name);
          }
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("affected_disability_", data.root3.affected_disability_);
        form.append("req_type", "new_app");
        form.append("industry_", data.root1.industry_id_.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root3.webapp_region_);
        form.append("app_url_", data.root1.url);
        form.append(
          "version_",
          data.root1.version_ === "Other"
            ? data.root1.userversion
            : data.root1.version_,
        );
        form.append("platform_", data.root1.platform_);
        sendData(form);
      }
    } else if (
      data.root1.application_id_.app_id === "Other" &&
      data.root1.industry_id_.industry_id === "Other"
    ) {
      if (data.root1.web_or_app_ === "web") {
        var form = new FormData();
        form.append("platform_", "");
        form.append("version_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("bug_category_", data.root2.bug_category_);
        form.append("bug_subcategory_", data.root2.bug_subcategory_);
        form.append("bug_impact_", data.root2.bug_impact_);
        form.append("bug_description_", data.root2.bug_description_);
        form.append("tech_used_",  data.root3.tech_used_);
        form.append("otherUsedTech", data.root3.tech_used_ === "Other"
        ? data.root3.otherUsedTech
        : "");
        form.append("steps_to_reproduce_", data.root2.steps_to_reproduce_);
        form.append("device_", data.root3.device_);
        form.append("new_version", "no");
        for (let i = 0; i < uploadedFiles.length; i++) {
          form.append("files",filedata.files[i], uploadedFiles[i].name);
          }
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("affected_disability_", data.root3.affected_disability_);
        form.append("req_type", "new_app_and_ind");
        form.append("industry_", data.root1.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("app_url_", data.root1.url); 
        form.append("url_website_", data.root1.url);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root3.webapp_region_);
        form.append("industry_name", data.root1.industry_name);
        form.append("ind_desc", data.root1.ind_desc);
        sendData(form);
      } else if (data.root1.web_or_app_ === "app") {
        const form = new FormData();
        form.append("url_website_", "");
        form.append("application_id_", data.root1.application_id_.app_id);
        form.append("bug_category_", data.root2.bug_category_);
        form.append("bug_subcategory_", data.root2.bug_subcategory_);
        form.append("bug_impact_", data.root2.bug_impact_);
        form.append("bug_description_", data.root2.bug_description_);
        form.append("tech_used_",  data.root3.tech_used_);
        form.append("otherUsedTech", data.root3.tech_used_ === "Other"
        ? data.root3.otherUsedTech
        : "");
        form.append("steps_to_reproduce_", data.root2.steps_to_reproduce_);
        form.append("device_", data.root3.device_);
        form.append("new_version", "yes");
        for (let i = 0; i < uploadedFiles.length; i++) {
          form.append("files",filedata.files[i], uploadedFiles[i].name);
          }
        form.append("web_or_app_", data.root1.web_or_app_);
        form.append("affected_disability_", data.root3.affected_disability_);
        form.append("req_type", "new_app_and_ind");
        form.append("industry_", data.root1.industry_name);
        form.append("app_name_", data.root1.app_name_);
        form.append("industry_id_", data.root1.industry_id_.industry_id);
        form.append("app_provider_name_", data.root1.app_provider_name_);
        form.append("app_provider_contact_", data.root1.app_provider_contact_);
        form.append("description_", data.root1.description_);
        form.append("webapp_region_", data.root3.webapp_region_);
        form.append("app_url_", data.root1.url);
        form.append(
          "version_",
          data.root1.version_ === "Other"
            ? data.root1.userversion
            : data.root1.version_,
        );
        form.append("platform_", data.root1.platform_);
        form.append("industry_name", data.root1.industry_name);
        form.append("ind_desc", data.root1.ind_desc);
        sendData(form);
      }
    }
  };

  const sendData = async (data: any) => {
    for (var pair of data.entries()) {
  }
    const request = axios
      .post(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/upload_bug",
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
    
  const takeFiles = (e: any) => {let files = Array.from(e.target.files)
    setfiledata(e.target)
    setUploadedFiles(files)
    if (files.length > 3) {
      alert('You are only allowed to upload a maximum of 2 files at a time');
    }
    // if (files.length <= 3) {
    //   let sum: any = 0;
    //   files.map((item: any) => {
    //     sum = sum + item.size / 1024;
    //   });
    //   if (sum > 1024) {
    //     setfilelimit(true);
    //     files = [];
    //   } else {
    //     setfilelimit(false);
    //     setfiledata(files);
    //   }
    // }
  };

  const setotherindid = () => {
    if (appName != "Other") {
      setindId("Other");
    }
  };

  return success ? (
    <Alert status="success">
      <AlertIcon />
      Bug has been reported successfully ,{" "}
      <Link href={`/${responsedata?.data?.slug && responsedata?.data?.slug}`} paddingInline={1}>
        view
      </Link>
    </Alert>
  ) : (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Flex flexDir="column" width="100%" height="100%">
        <FormControl isInvalid={errors.name}>
          <Steps
            onClickStep={(step:any) => setStep(step)}
            paddingTop={6}
            paddingBottom={6}
            activeStep={activeStep}
          >
            <Step label={"Application Details"}>
              <Flex w="100%" h="100%" minH={300}>
                <Box w="100%" h="100%">
                  <Box w="95%" paddingBottom={"1%"}>
                    <FormLabel
                      htmlFor="root1.web_or_app_"
                      className={styles.requiredfield}
                    >
                      App/Website
                    </FormLabel>
                    <Select
                      size="sm"
                      id="root1.web_or_app_"
                      {...register("root1.web_or_app_", {
                        required: "ct Seleatleast one option",
                      })}
                      required
                      onChange={(e:any) => {
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
                          unregister("root1.platform_");
                          unregister("root1.version_");

                        }
                    
                        if (e.target.value.toLowerCase() === "web") {
                          unregister("root2.platform_");
                          unregister("root2.version_");
                        }
                      }}
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

                  <Box w="95%" paddingBottom={"1%"} >
                    <Flex
                      w="100%"
                      flexDirection={["column", "column", "row"]}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box w={["100%", " 100%", "45%"]}>
                        <FormLabel
                          htmlFor="root1.application_id_"
                          className={styles.requiredfield}
                        >
                          Name
                        </FormLabel>
                        <NameSearch
                          setAppName={setindId}
                          typeofapp={typeofapp}
                          appName={indId}
                          appState={setindId}
                          register={register}
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
                              placeholder="Contact"
                              required
                              {...register("root1.app_provider_contact_", {
                                required: "This field is required",
                              })}
                              size="sm"
                            ></Input>
                            {errors.root1 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
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
                              <span style={{ color: "red", fontSize: "13px" }}>
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
                              htmlFor="root1.url"
                              className={styles.requiredfield}
                            >
                              Provider URL
                            </FormLabel>
                            <Input
                              id="root1.url"
                              required
                              placeholder="Url"
                              {...register("root1.url", {
                                required: "This field is required",
                              })}
                              size="sm"
                            ></Input>
                            {errors.root1 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.root1.url
                                  ? errors.root1.url.message
                                  : null}
                              </span>
                            )}
                          </Box>

                          <Box w={["100%", "100%", "45%"]} paddingBottom={"2%"}>
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
                              <span style={{ color: "red", fontSize: "13px" }}>
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
                              <span style={{ color: "red", fontSize: "13px" }}>
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
                              <span style={{ color: "red", fontSize: "13px" }}>
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
                        flexDirection={["column", "column", "row"]}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Box w={["100%", "100%", "45%"]}>
                          <FormLabel
                            htmlFor="root1.platform_"
                            className={styles.requiredfield}
                          >
                            Platform
                          </FormLabel>
                          <Select
                            id="root1.platform_"
                            // defaultValue="Android"
                            {...register("root1.platform_", {
                              required: "This field is required",
                            })}
                            name="root1.platform_"
                            required
                            onClick={getAppVersion}
                            onChange={(e:any) => {
                              typeofplatform(e.target.value);
                            }}
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
                          {errors.root2 && errors.root2.platform_ && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root2.platform_
                                ? errors.root2.platform_.message
                                : null}
                            </span>
                          )}
                        </Box>

                        <Box w={["100%", "100%", "45%"]}>
                          <FormLabel
                            htmlFor="root1.version_"
                            className={styles.requiredfield}
                          >
                            Version
                          </FormLabel>
                          <Select
                            id="root1.version_"
                            required
                            //defaultValue="Other"
                            {...register("root1.version_", {
                              required: "This field is required",
                            })}
                            onChange={(e:any) => {
                              handleVerOther(e.target.value);
                              if (e.target.value !== "Other") {
                                unregister("root1.userversion");
                              }
                            }}
                            name="root1.version_"
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
                            {/* <option value="Not Specified">Not Specified</option> */}
                          </Select>
                          {errors.root2 && errors.root2.version_ && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.root2.version_
                                ? errors.root2.version_.message
                                : null}
                            </span>
                          )}
                          {otherv === "Other" ? (
                            <Box w="100%" paddingTop={3}>
                              <FormLabel
                                htmlFor="root1.userversion"
                                fontSize={15}
                                className={styles.requiredfield}
                              >
                                Specific version
                              </FormLabel>
                              <Input
                                id="root1.userversion"
                                {...register("root1.userversion", {
                                  required: "This field is required",
                                })}
                                size="sm"
                                required
                                placeholder="version"
                              ></Input>
                              <br></br>
                              <br></br>
                              <br></br>
                            </Box>
                          ) : null}
                        </Box>
                      </Flex>
                    ) : null}
                </Box>
              </Flex>
            </Step>
            <Step label={"Bug Details"}>
              <Flex w="100%" h="100%" minH={300}>
                <Box w="100%" h="100%">
                  <Box w="95%" paddingBottom={"5"}>
                    {firstempties !== 0 && firstempties !== undefined ? (
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

                    
                  </Box>

                  <Box w="100%">
                    <Flex
                      w="95%"
                      flexDirection={["column", "column", "row"]}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        w={["100%", "100%", "45%"]}
                        h="100%"
                        paddingBottom={"1%"}
                      >
                        <FormLabel
                          htmlFor="root2.bug_category_"
                          className={styles.requiredfield}
                        >
                          Bug category
                        </FormLabel>
                        <Select
                          id="root2.bug_category_"
                          size="sm"
                          required
                          {...register("root2.bug_category_", {
                            required: "This field is required",
                          })}
                          onClick={getCategory}
                          onChange={(e:any) => {
                            setcatid(
                              category.find(
                                (x) => x.category_name === e.target.value,
                              ).id,
                            );
                          }}
                          placeholder="Select a Category"
                        >
                          {
                            category.length > 0
                              ? category.map((item, i: any) => {
                                  return (
                                    <option key={i} value={item.category_name}>
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

                      <Box
                        w={["100%", "100%", "45%"]}
                        h="100%"
                        paddingBottom={"1%"}
                      >
                        <FormLabel
                          htmlFor="root2.bug_subcategory_"
                          className={styles.requiredfield}
                        >
                          Bug subcategory
                        </FormLabel>
                        <Select
                          id="root2.bug_subcategory_"
                          disabled={!catid || catid == ""}
                          size="sm"
                          required
                          {...register("root2.bug_subcategory_", {
                            required: "This field is required",
                          })}
                          placeholder="Select a Sub-Category"
                        >
                          {
                            subcategory.length > 0
                              ? subcategory.map((item: { name: string }) => {
                                  return (
                                    <>
                                      <option key={item.name} value={item.name}>
                                        {item.name}
                                      </option>
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
                      flexDirection={["column", "column", "row"]}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        w={["100%", "100%", "45%"]}
                        h="100%"
                        paddingBottom={"1%"}
                      >
                        <FormLabel
                          htmlFor="root2.bug_impact_"
                          className={styles.requiredfield}
                        >
                          Bug impact
                        </FormLabel>
                        <Input
                          id="root2.bug_impact_"
                          placeholder="Impact of bug"
                          required
                          {...register("root2.bug_impact_", {
                            required: "This field is required",
                          })}
                          name="root2.bug_impact_"
                          size="sm"
                        ></Input>

                        {errors.root2 && errors.root2.bug_impact_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root2.bug_impact_
                              ? errors.root2.bug_impact_.message
                              : null}
                          </span>
                        )}
                      </Box>

                      <Box
                        w={["100%", "100%", "45%"]}
                        h="100%"
                        paddingBottom={"1%"}
                      >
                        <FormLabel
                          htmlFor="root2.bug_description_"
                          className={styles.requiredfield}
                        >
                          Description
                        </FormLabel>
                        <Textarea
                          id="root2.bug_description_"
                          placeholder="Describe the bug"
                          required
                          {...register("root2.bug_description_", {
                            required: "This field is required",
                          })}
                          name="root2.bug_description_"
                          size="sm"
                        ></Textarea>
                        {errors.root2 && errors.root2.bug_description_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root2.bug_description_
                              ? errors.root2.bug_description_.message
                              : null}
                          </span>
                        )}
                      </Box>
                    </Flex>
                  </Box>

                  <Box w="95%" paddingBottom={"1%"}>
                    <Flex
                      w="100%"
                      flexDirection={["column", "column", "row"]}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      <Box w={["100%", "100%", "45%"]}>
                        <FormLabel htmlFor="fileUpload">Bug evidence</FormLabel>
                        <input
								// className={classes.fileInput}
								multiple
								id='fileUpload'
								type='file'
								accept='.pdf, .png, .jpg'
								onChange={takeFiles}
                />
                {/* <Button>Upload</Button> */}
                        {/* <Upload
                          id="fileUpload"
                          maxCount={3}
                          fileList={filedata}
                          onChange={(e) => {
                            takeFiles(e.fileList);
                          }}
                          accept=".jpg,.png,.jpeg,.pdf"
                        >
                        </Upload> */}
                        {filelimit ? (
                          <span style={{ color: "red" }}>
                            File limit exceeded (Max size: 1 Mb)
                          </span>
                        ) : null}
                      </Box>

                      <Box w={["100%", "100%", "45%"]} paddingBottom={"1%"}>
                        <FormLabel
                          htmlFor="root2.steps_to_reproduce_"
                          className={styles.requiredfield}
                        >
                          Steps to reproduce
                        </FormLabel>
                        <Textarea
                          id="root2.steps_to_reproduce_"
                          placeholder="Steps to reproduce bug"
                          required
                          {...register("root2.steps_to_reproduce_", {
                            required: "This field is required",
                          })}
                          name="root2.steps_to_reproduce_"
                        ></Textarea>
                        {errors.root2 && errors.root2.steps_to_reproduce_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root2.steps_to_reproduce_
                              ? errors.root2.steps_to_reproduce_.message
                              : null}
                          </span>
                        )}
                      </Box>

                     
                    </Flex>
                  </Box>
                </Box>
              </Flex>{" "}
            </Step>

            <Step label={"Additional Details"}>
              <Flex w="100%" h="100%" minH={300}>
                <Box w="100%" h="100%">
                  <Box w="95%" paddingTop={5} paddingBottom={20}>
                    {secondempties !== 0 && secondempties !== undefined ? (
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
                                checkEmptyinputsOne();
                                checkEmptyinputTwo();
                                checkEmptyinputThird();
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
                      flexDirection={["column", "column", "row"]}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      <Box w={["100%", "100%", "45%"]}>
                        <FormLabel htmlFor="root3.tech_used_">
                          Assistive technology used
                        </FormLabel>
                        <Select
                          size="sm"
                          id="root3.tech_used_"
                          {...register("root3.tech_used_", {})}
                          placeholder="Select Assistive Technology"
                          onChange={(e:any) => {
                            handleTechOther(e.target.value);
                            if (e.target.value !== "Other") {
                              unregister("root3.otherUsedTech");
                            }
                          }}
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
                        {otherTech === "Other" ? (
                            <Box w="100%" paddingTop={3} paddingBottom={2}>
                              <FormLabel
                                htmlFor="root3.otherUsedTech"
                                fontSize={15}
                                className={styles.requiredfield}
                              >
                                Specific Tech Used
                              </FormLabel>
                              <Input
                                id="root3.otherUsedTech"
                                {...register("root3.otherUsedTech", {
                                  required: "This field is required",
                                })}
                                size="sm"
                                required
                                placeholder="Specific Tech Used"
                              ></Input>
                            </Box>
                          ) : null}
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
                      {/* <Box w={["100%", "100%", "45%"]} paddingBottom={"1%"}>
                        <FormLabel
                          htmlFor="root3.steps_to_reproduce_"
                          className={styles.requiredfield}
                        >
                          Steps to reproduce
                        </FormLabel>
                        <Textarea
                          id="root3.steps_to_reproduce_"
                          placeholder="Steps to reproduce bug"
                          required
                          {...register("root3.steps_to_reproduce_", {
                            required: "This field is required",
                          })}
                          name="root3.steps_to_reproduce_"
                        ></Textarea>
                        {errors.root3 && errors.root3.steps_to_reproduce_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root3.steps_to_reproduce_
                              ? errors.root3.steps_to_reproduce_.message
                              : null}
                          </span>
                        )}
                      </Box> */}

                      <Box w={["100%", "100%", "45%"]} paddingBottom={"1%"}>
                        <FormLabel
                          htmlFor="root3.device_"
                          className={styles.requiredfield}
                        >
                          Device
                        </FormLabel>
                        <Textarea
                          id="root3.device_"
                          required
                          placeholder="Device"
                          {...register("root3.device_", {
                            required: "This field is required",
                          })}
                          name="root3.device_"
                        ></Textarea>
                        {errors.root3 && errors.root3.device_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root3.device_.message}
                          </span>
                        )}
                      </Box>
                    </Flex>
                    <Flex
                      w="100%"
                      flexDirection={["column", "column", "row"]}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      <Box w={["100%", "100%", "45%"]} paddingBottom={"1%"}>
                        <FormLabel
                          htmlFor="root3.affected_disability_"
                          className={styles.requiredfield}
                        >
                          Reviewed for which disablity
                        </FormLabel>
                        <Select
                          id="root3.affected_disability_"
                          size="sm"
                          required
                          placeholder="Select Disability Type"
                          {...register("root3.affected_disability_", {
                            required: "This is required",
                          })}
                        >
                          <option value="No Disability">No Disability</option>
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
                        {errors.root3 && errors.root3.affected_disability_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root3.affected_disability_
                              ? errors.root3.affected_disability_.message
                              : null}
                          </span>
                        )}
                      </Box>

                      <Box
                        w={["100%", "100%", "45%"]}
                        h="100%"
                        paddingBottom={"1%"}
                      >
                        <FormLabel htmlFor="root3.webapp_region_">
                          Region
                        </FormLabel>
                        <Stack direction="column">
                          <Controller
                            name={"root3.webapp_region_"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => {
                              return (
                                <ReactSelect
                                  id="root3.webapp_region_"
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
                        {/* <AutoComplete
                          openOnFocus
                          rollNavigation
                          onChange={(vals) => setCountryName(vals)}
                        >
                          <AutoCompleteInput
                            variant="outline"
                            value={countryName}
                            placeholder="Search..."
                            id="root3.webapp_region_"
                            {...register("root3.webapp_region_", {})}
                          />
                          <AutoCompleteList>
                            {countryList.map((country, oid) => (
                              <AutoCompleteItem
                                key={`country-${oid}`}
                                value={country.name}
                                label={country.name}
                                textTransform="capitalize"
                                align="center"
                              >
                                <Avatar
                                  size="sm"
                                  name={country.name}
                                  src={country.flag}
                                />
                                <Text ml="4">{country.name}</Text>
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete> */}
                        {errors.root3 && errors.root3.webapp_region_ && (
                          <span style={{ color: "red", fontSize: "13px" }}>
                            {errors.root3.webapp_region_
                              ? errors.root3.webapp_region_.message
                              : null}
                          </span>
                        )}
                      </Box>
                    </Flex>
                  </Box>

                  <Box w="95%" paddinginline={20}>
                    <Flex
                      w="100%"
                      flexDirection={["column", "column", "row"]}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box w={["100%", "100%", "20%"]}>
                        <Checkbox
                          className={styles.requiredfield}
                          paddingBottom={"1%"}
                          colorScheme="green"
                          required
                          defaultChecked
                        >
                          Terms and conditions
                        </Checkbox>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Step>
          </Steps>
        </FormControl>
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
                  isLoading={isSubmitting}
                  color={"white"}
                  onClick={() => {
                    checkEmptyinputsOne();
                    checkEmptyinputTwo();
                    checkEmptyinputThird();
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled
                  size="sm"
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
                  checkEmptyinputThird();
                }}
              >
                Next
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </form>
  );
};
