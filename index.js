// Function that checks for input presence and creates a p and warning element
const checkInputs = () => {
  // Retrieve all of the inputs and warnings within the sign_up form
  const inputs = document.forms["sign_up"].getElementsByTagName("input");
  const warnings = document.forms["sign_up"].getElementsByTagName("p");

  // Get the p with email warning since it will vary according to the error
  const emailWarning = document.getElementById("emailWarning");
  emailWarning.textContent = "Email address is blank";
  let emailIndexPos = -1;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      warnings[i].classList.remove("invisible");
    }

    // Set emailIndexPos to index position of email warning
    emailIndexPos = warnings[i] === emailWarning ? i : emailIndexPos;
  }

  // Check email format and if necessary change email warning message
  if (checkInvalidEmail(inputs[emailIndexPos].value)) {
    emailWarning.textContent = "Please enter a valid email address";
    warnings[emailIndexPos].classList.remove("invisible");
  }
};

// Check the validity of a passed email address
const checkInvalidEmail = (email) => {
  // Check whether @ is present
  if (email.indexOf("@")) {
    // Split email string into array before and after @ symbol
    const parseEmail = email ? email.split("@") : undefined;

    if (parseEmail && parseEmail.length >= 2) {
      // Check for "." in organizationl portion of email
      if (parseEmail[1].indexOf(".")) {
        // Parse organization string
        const parseOrg = parseEmail[1].split(".");

        // If parsed org name has more than one parts and each are longer than one character then
        // after all check email is valid
        if (
          parseOrg.length > 1 &&
          parseOrg[0].length >= 1 &&
          parseOrg[1].length >= 1
        )
          return false;
      }
    }
  }
  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  // Select the form, each input and the submit button

  const submitButton = document.getElementById("submit_button");
  const firstName = document.getElementById("first_name");
  const lastName = document.getElementById("last_name");
  const emailAddress = document.getElementById("email_address");
  const password = document.getElementById("password");

  // Add an event listener on the submit button
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Clear out any warnings before checking inputs
    let warnings = document.getElementsByClassName("warning");
    // warnings.push(document.getElementsByClassName("emailWarning"));

    for (let msg of warnings) {
      msg.classList.add("invisible");
    }

    checkInputs();
  });
});
