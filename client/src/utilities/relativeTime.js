const relativeTime = timestamp => {
  const currentTime = new Date();
  const convertedTimestamp = new Date(timestamp);
  // Time difference in seconds
  const timeDifference = (currentTime - convertedTimestamp) / 1000;
  // Less than a minute
  if (timeDifference < 60) {
    return "just now";
  }
  let time;
  // Less than a hour
  if (timeDifference < 60 * 60) {
    time = [parseInt(timeDifference / 60), "minute"];
  }
  // Less than a day
  else if (timeDifference < 60 * 60 * 24) {
    time = [parseInt(timeDifference / (60 * 60)), "hour"];
  }
  // Less than a month (assumption: every month has 31 days)
  else if (timeDifference < 60 * 60 * 24 * 31) {
    time = [parseInt(timeDifference / (60 * 60 * 24)), "day"];
  }
  // Less than a year
  else if (timeDifference < 60 * 60 * 24 * 31 * 12) {
    time = [parseInt(timeDifference / (60 * 60 * 24 * 31)), "month"];
  }
  // More than or equal a year
  else if (timeDifference >= 60 * 60 * 24 * 31 * 12) {
    time = [parseInt(timeDifference / (60 * 60 * 24 * 31 * 12)), "year"];
  }

  if (time[0] > 1) {
    time[1] += "s";
  }
  return time.concat("ago").join(" ");
};

export default relativeTime;
