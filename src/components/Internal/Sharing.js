import React from "react";

export const shareLink = (message, link) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Sharing",
        text: message,
        url: link,
      })
      .then(() => {
        console.log("Successfully shared");
        return true;
      })
      .catch((error) => {
        console.error("Something went wrong sharing the blog", error);
      });
  } else {
    return false;
  }
};
