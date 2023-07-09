import React, { useEffect, useState } from "react";
import AllReviewList from "components/allreview/listreview";
import Header from "components/Header";
import axios from "axios";
import Footer from "components/Footer";

interface list {
  data: any;
}

export default function Application({ apps }: any) {
  const [sessionState, setSessionState] = useState<any>();
  const [modalBug, setModalBug] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const onOpenModalBug = () => {
    setModalBug(true);
  };
  const onOpenModalReview = () => {
    setModalReview(true);
  };
  const onCloseModalBug = () => {
    setModalBug(false);
  };
  const onCloseModalReview = () => {
    setModalReview(false);
  };

  useEffect(() => {
    setSessionState(localStorage.getItem("access-enable-token"));
  }, []);

  return (
    <div>
      <Header
        session={sessionState}
        onOpenModalBug={onOpenModalBug}
        onCloseModalBug={onCloseModalBug}
        modalBug={modalBug}
        onOpenModalReview={onOpenModalReview}
        onCloseModalReview={onCloseModalReview}
        modalReview={modalReview}
      />
      <AllReviewList data={apps ? apps : {}} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  var apps = await axios
    .get("https://172-105-61-130.ip.linodeusercontent.com:5000/searchresults?type=bug_reviews&searchquery=")
    .then((response) => response.data);

  return { props: { apps } };
}
