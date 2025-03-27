const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

export const createGameImageString = (event, setter, prop) => {
  getBase64(event.target.files[0], (base64ImageString) => {
    console.log("Base64 of file is", base64ImageString);
    // Update a component state variable to the value of base64ImageString
    setter((prevState) => ({
      ...prevState,
      [prop]: base64ImageString,
    }));
  });
};
