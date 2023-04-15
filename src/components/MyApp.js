import React, { useState } from "react";
import "./Form.css";

/**
 * Empty: Form has a disabled “Submit” button.
Typing: Form has an enabled “Submit” button.
Submitting: Form is completely disabled. Spinner is shown.
Success: “Thank you” message is shown instead of a form.
Error: Same as Typing state, but with an extra error message.
 */

const Form = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Empty");

  async function handleFormSubmit(e) {
    let textarea = document.getElementById("textarea");
    let errorMessage = document.getElementById("error");

    e.preventDefault();
    setStatus("Submitting");

    try {
      await submitForm(textarea.value);
      setStatus("Success");
    } catch (err) {
      setStatus("Error");

      errorMessage.textContent = err.message;
    } finally {
    }
  }
  async function submitForm(answer) {
    // Pretend it's hitting the network.

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (answer.toLowerCase().trim() === "istanbul") {
          resolve();
        } else {
          reject(new Error("Good guess but a wrong answer. Try again!"));
        }
      }, 1500);
    });
  }

  function handleTextareaChange(event) {
    const value = event.target.value;
    setText(value);
    if (value.length === 0) {
      setStatus("Empty");
    } else {
      setStatus("Typing");
    }
  }

  return (
    <div>
      <form
        id="form"
        onSubmit={handleFormSubmit}
        disabled={status === "Submitting"}
        hidden={status === "Success"}
      >
        <h2>City quiz</h2>
        <p>What city is located on two continents?</p>
        <p>hint: starts with istanbul :) :) :)</p>
        <textarea
          id="textarea"
          onInput={handleTextareaChange}
          value={text}
          disabled={status === "Submitting"}
        ></textarea>
        <br />
        <button
          id="button"
          disabled={status === "Empty" || status === "Submitting"}
        >
          Submit
        </button>
        <p id="loading" hidden={status !== "Submitting"}>
          Loading...
        </p>
        <p id="error" hidden={status !== "Error"}></p>
      </form>
      <h1 id="success" hidden={status !== "Success"}>
        That's right!
      </h1>
    </div>
  );
};

export default Form;
