"use client";

import { CldImage as CldImageDefault } from "next-cloudinary";

const Image = (props) => {
  return <CldImageDefault {...props} />;
};

export default Image;
