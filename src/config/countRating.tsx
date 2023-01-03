import { enterprise } from "./types";

export  const countRating = (singleEnterprise:enterprise) => {
    let sum = 0;
    let count = 0;
    singleEnterprise?.comments.forEach((comment) => {
      if(comment.rating){
          sum += comment.rating;
          count++;
        }
    });
    if(count===0 && sum===0){
      return 0;
    }
    return sum / count;
  };