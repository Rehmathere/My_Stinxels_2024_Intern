import dayjs from "dayjs";

const processDateTime = (body) => {
  const { time } = body;
  const date = body.date.format("YYYY-MM-DD");
  const startTime = dayjs(time[0]).toISOString().split("T")[1];
  const endTime = dayjs(time[1]).toISOString().split("T")[1];

  return { date, startTime, endTime };
};

export default processDateTime;
