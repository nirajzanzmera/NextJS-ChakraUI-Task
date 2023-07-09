import FeaturedReviews from "components/featured-reviews/FeaturedReviews";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero";
import Newsletter from "components/NewsLetter";
import type { NextPage } from "next";
import { getSession, getProviders } from "next-auth/react";
import Head from "next/head";
import Image from 'next/image'
// import { useEffect } from 'react'
// import jwtHelper from '../src/helper/jwt.helper'
import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav";
import { useEffect, useState } from "react";

const Home: NextPage = ({ providers }: any) => {
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
  
  const handleRefresh = () => {
    window.location.reload();
  }

  useEffect(() => {
    setSessionState(localStorage.getItem("access-enable-token"));
  }, []);

  return (
    <>
      <Head>
        <title>Access Enable</title>
        <meta
          name="description"
          content="All your customer feedback in one single place"
        />
      </Head>
      <SkipNavLink id="main">Skip to content</SkipNavLink>
      <Header
        session={sessionState}
        onOpenModalBug={onOpenModalBug}
        onCloseModalBug={onCloseModalBug}
        modalBug={modalBug}
        onOpenModalReview={onOpenModalReview}
        onCloseModalReview={onCloseModalReview}
        modalReview={modalReview}
      />
      <SkipNavContent as={"main"} id="main">
        <Hero
          onOpenModalBug={onOpenModalBug}
          onOpenModalReview={onOpenModalReview}
          // modalOpener={modalBug}
        />
        <FeaturedReviews />
        {/* <Newsletter /> */}
      </SkipNavContent>
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
