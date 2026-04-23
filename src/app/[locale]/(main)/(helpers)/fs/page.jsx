"use client";

import Fallback from "@/components/fallback";
import { useEffect } from "react";

const FSPage = () => {
  useEffect(() => {
    window.location.assign("https://fs.copy-shop.ua");
  });
  return <Fallback />;
};

export default FSPage;
