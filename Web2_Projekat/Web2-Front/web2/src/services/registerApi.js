import axiosInstance from "./axiosConfig";

export const registration = async (data) => {
  try {
    console.log(data);
    const res = await axiosInstance.post(
      "/api/Registration/registration",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (cerror) {
    alert("Nesto se desilo prilikom registracije");
    return null;
  }
};
