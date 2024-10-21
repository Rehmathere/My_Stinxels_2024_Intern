import dayjs from "dayjs";
const to24Hour = (time) => {
  return dayjs(time, "HH:mm:ss.SSSZ").format("HH:mm");
};

export default to24Hour;
