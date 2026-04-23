/*Libs*/
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import styled from "styled-components";

/*Components*/
import Message from "@/components/message";
import Button from "@/form/button";
import { Input } from "@/components/form-react-hook";
import { APIConfig } from "@/api/config";

const CallbackForm = () => {
  /*Translations*/
  const tMailerMessage = useTranslations("Mailer");
  const tFeedbackForm = useTranslations("FeedbackForm");
  const tFeedback = useTranslations("Feedback");

  /*States*/
  const [responseMessage, setResponseMessage] = useState(null);
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [isResponsing, setIsResponsing] = useState(false);
  const methods = useForm();

  /*Handlers*/
  const onSubmit = async (data) => {
    setIsResponsing(true);
    try {
      const response = await fetch(
        `${APIConfig.host}:${APIConfig.port}/call-me`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();

      if (responseData["message"] === "OK") {
        setResponseMessage(
          tMailerMessage("success", {
            number: `${responseData["number"]}`,
          })
        );
        setShowResponseMessage(true);
        setIsResponsing(false);
        methods.reset();
      }
    } catch (err) {
      setResponseMessage(tMailerMessage("error"));
      setShowResponseMessage(true);
      setIsResponsing(false);
    }
  };

  return (
    <>
      {showResponseMessage && responseMessage && (
        <Message
          message={responseMessage}
          header={tMailerMessage("header")}
          close={() => setShowResponseMessage(false)}
        />
      )}
      <FormProvider {...methods}>
        <Form>
          <h2>{tFeedback("phone.description")}</h2>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder={tFeedbackForm("name")}
              name="name"
              required={true}
            />
            <Input
              type="phone"
              placeholder={tFeedbackForm("phone")}
              name="phone"
              required={true}
            />
            <Button title={tFeedbackForm("sent")} disabled={isResponsing} />
          </form>
        </Form>
      </FormProvider>
    </>
  );
};

export default CallbackForm;

const Form = styled.section`
  align-self: start;
  form {
    padding: 24px 0;
    display: grid;
    gap: 24px;
    button {
      justify-self: end;
    }
  }
`;
