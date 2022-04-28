export const loginPost = ({ email, password }) => {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const signupPost = ({ name, lastName, email, password }) => {
  console.log(name, lastName, email, password);
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      lastName,
      email,
      password,
    }),
  });
};
