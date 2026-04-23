import { getFormattedPhone } from "@/helpers/formatters";
import { styled } from "styled-components";

const FeedBack = ({ props }) => {
  const href = {
    phone: `tel:${props.contact}`,
    email: `mailto:${props.contact}`,
  };

  return (
    <>
      <Wrapper>
        <Top type={props.type}>
          <a href={href[props.type]}>
            {props.type === "phone"
              ? getFormattedPhone(props.contact)
              : props.contact}
          </a>
        </Top>
        <Bottom type={props.type} onClick={props.popUp}>
          {props.description}
        </Bottom>
      </Wrapper>
    </>
  );
};

export default FeedBack;

const Wrapper = styled.div`
  width: 180px;
  text-align: center;
  white-space: nowrap;
  transition: filter var(--transitionDuration);
  &:hover {
    filter: var(--hoverBrightness);
  }
  @media screen and (max-width: 768px) {
    width: 140px;
    font-size: smaller;
  }
`;
const Top = styled.div`
  &::before {
    width: 14px;
    height: 14px;
    transform: translateY(3px);
    display: ${({ type }) => (type === "phone" ? "inline-block" : "none")};
    content: url(${({ type }) =>
      type === "phone"
        ? "https://res.cloudinary.com/dllc7tavb/image/upload/v1719396585/icons/phone.svg"
        : ""});
    margin-right: 8px;
    align-self: center;
  }
  height: 34px;
  line-height: 32px;
  border: ${({ type }) => {
    switch (type) {
      case "phone":
        return "transparent";
      case "email":
        return "2px solid var(--secondaryColor)";
      default:
        return "none";
    }
  }};
  border-radius: var(--borderRadius) var(--borderRadius) 0 0;
`;
const Bottom = styled.div`
  &::selection {
    background: transparent;
  }
  height: 32px;
  line-height: 32px;
  background: ${({ type }) => {
    switch (type) {
      case "phone":
        return "transparent";
      case "email":
        return "var(--secondaryColor)";
      default:
        return "none";
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case "phone":
        return "var(--secondaryColor)";
      case "email":
        return "white";
      default:
        return "none";
    }
  }};
  border-radius: 0 0 var(--borderRadius) var(--borderRadius);
  font-weight: 600;
  cursor: pointer;
`;
