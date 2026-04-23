"use client";

import styled from "styled-components";
import Icon from "./icon";
import SingleCloseButton from "@/form/singleCloseButton";
import { useState } from "react";

const Messangers = (props) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      {isShow && (
        <Wrapper $params={isShow}>
          <SingleCloseButton handler={() => setIsShow(!isShow)} />
          <Icons>
            <Icon
              href="viber://chat/?number=%2B380931507510"
              img="icons/th1csmedlvazdpklsr2y"
              label="Viber"
            />
            <Icon
              href="https://t.me/yevhenii_copy_shop_ua"
              img="icons/ztkbpxmtdyk13p98g193"
              label="Telegram"
            />
          </Icons>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  bottom: 150px;
  right: 12px;
`;

const Icons = styled.div`
  display: flex;
  position: fixed;
  bottom: 24px;
  right: 24px;
  gap: 12px;
  background: #fff;
  box-shadow: var(--boxShadow);
  padding: 12px;
`;

export default Messangers;
