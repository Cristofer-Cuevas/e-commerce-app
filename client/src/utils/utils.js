export const getCookie = () => {
  let cookieValue;

  if (document.cookie) {
    let cookie = document.cookie.split("; ").find((row) => {
      return row.startsWith("Jwt=");
    });

    if (cookie) {
      cookie = cookie.split("=")[1];
      cookieValue = cookie;
    }
  }

  return cookieValue;
};

export const setCookie = (token) => {
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  document.cookie = `Jwt=${token}; expires=${cookieExpires}; path=/`;
};
