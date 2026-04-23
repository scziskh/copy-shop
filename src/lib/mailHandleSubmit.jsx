export const mailHandleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const response = await fetch("/api/mailer", {
      method: "post",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`, "push");
    }

    alert("It is OK!");
  } catch (err) {
    console.error(err);
    alert("Error, please try resubmitting the form");
  }
};
