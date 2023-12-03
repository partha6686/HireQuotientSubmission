export const baseURL = "https://geektrust.s3-ap-southeast-1.amazonaws.com";

// adminui-problem/members.json
export const getApi = async (url) => {
  try {
    const res = await fetch(baseURL + url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to load users. Please check your Internet Connection!",
      error,
    };
  }
};
