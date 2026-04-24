"use client";

/*Libs*/
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import styled from "styled-components";

/*Components*/
import Message from "@/components/message";
import Button from "@/form/button";
import { Input, Textarea } from "@/components/form-react-hook";
import { APIConfig } from "@/api/config";

const FeedbackForm = () => {
  /*Consts*/
  const methods = useForm();

  /*Translations*/
  const tFeedbackForm = useTranslations("FeedbackForm");
  const tMailerMessage = useTranslations("Mailer");

  /*States*/
  const [responseMessage, setResponseMessage] = useState(null);
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [isResponsing, setIsResponsing] = useState(false);
  const [filePath, setFilePath] = useState(null);

  /*Effects*/
  useEffect(() => {
    if (methods.watch("file").length) {
      uploadFile(methods.watch("file"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch("file")]);

  /*Handlers*/
  const onSubmit = async (data) => {
    setIsResponsing(true);
    const { email, email2, message, name } = data;
    try {
      const response = await fetch(
        `${APIConfig.host}:${APIConfig.port}/send-email`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            email2,
            message,
            name,
            filePath,
          }),
        },
      );

      const responseData = await response.json();

      if (responseData["message"] === "OK") {
        setResponseMessage(
          tMailerMessage("success", {
            number: `${responseData["number"]}`,
          }),
        );
        setShowResponseMessage(true);
        setIsResponsing(false);
        methods.reset();
        setFilePath(null);
      }
    } catch (err) {
      setResponseMessage(tMailerMessage("error"));
      setShowResponseMessage(true);
      setIsResponsing(false);
    }
  };

  const uploadFile = async () => {
    setIsResponsing(true);
    const formData = new FormData();
    const file = methods.getValues("file")[0];
    formData.append("file", file);
    try {
      const response = await fetch(
        `${APIConfig.host}:${APIConfig.port}/upload`,
        {
          method: "post",
          body: formData,
        },
      );
      const responseData = await response.json();

      if (responseData["message"] === "OK") {
        setIsResponsing(false);
        setFilePath(
          `${APIConfig.host}:${APIConfig.port}/uploads/${responseData["filename"]}`,
        );
      }
    } catch (e) {}
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
          <h2>{tFeedbackForm("h2")}</h2>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input className="no-display" type="email" name="email" />
            <Input
              type="email"
              name="email2"
              placeholder={tFeedbackForm("email")}
              required={true}
            />
            <Input
              type="text"
              name="name"
              placeholder={tFeedbackForm("name")}
              required={true}
            />
            <Textarea
              name="message"
              placeholder={tFeedbackForm("text")}
              required={true}
            />
            <Input type="file" name="file" aria-label="File" />
            <Button name="sentMessage" disabled={isResponsing}>
              {tFeedbackForm("sent")}
            </Button>
          </form>
        </Form>
      </FormProvider>
    </>
  );
};

export default FeedbackForm;

const Form = styled.section`
  width: 100%;
  box-sizing: border-box;

  form {
    width: 100%;
    padding: 24px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    box-sizing: border-box;

    /* Примусово застосовуємо правильну блочну модель до всіх елементів форми */
    * {
      box-sizing: border-box;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    input {
      width: 100%; /* Додано, щоб інпути займали рівно свою колонку */
      max-width: 100%;
      overflow: hidden;
    }

    textarea {
      width: 100%; /* Додано */
      grid-column-start: 1;
      grid-column-end: 3;
      height: 320px;
      resize: vertical; /* Дозволяє змінювати розмір лише по вертикалі, щоб не ламати сітку */

      /* Видалено grid-template-columns, оскільки textarea не є контейнером */

      @media screen and (max-width: 768px) {
        grid-column-start: 1;
        grid-column-end: 2; /* Виправлено: у мобільній версії лише 1 колонка, тому end має бути 2 */
      }
    }

    button {
      justify-self: end;
      max-width: 100%; /* Запобігає виходу кнопки за межі екрана */
    }
  }
`;
