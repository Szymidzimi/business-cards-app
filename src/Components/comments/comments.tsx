import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Rating } from "react-simple-star-rating";
import { validateNotEmptyInputWithSpaces,validateXss  } from "../../Components/inputComponent/validation";
import { getUserData, TokenUserData } from "../../config/decodeUser";
import { enterprise } from "../../config/types";
import "./comments.css";

type Props = {
  singleEnterprise: enterprise;
  setSingleEnterprises: any
  };

const Comments = ({singleEnterprise,setSingleEnterprises}:Props) => {

  const [userDataToken, setUserDataToken] = useState<TokenUserData | null| undefined>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [actualRating, setActualRating] = useState(0);
  const [commentError, setCommentError] = useState("");

  const handleRating = (rate: number) => {
    setRating(rate);
    setActualRating(rate);
  }
  const onPointerMove = (value: number, index: number) => setActualRating(value)

  const deleteCommentAndRating = async () => {
    try {
      const response = await fetch(
        `/enterprises/deleteCommentAndRating/${singleEnterprise._id}/${userDataToken?.id}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": localStorage.getItem("token") || "",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setSingleEnterprises(data);
      setMessage(data.message);
    } catch (error: any) {
      console.log(error);
    }
  };
  const validateComment = (comment: string) => {
    
    // if (validateNotEmptyInputWithSpaces(comment)) {
    //   setCommentError("Pole nie może być puste");
    //   return false;
    // }
    // if (validateXss(comment)) {
    //   setCommentError("Nie można używać znaków specjalnych");
    //   return false;
    // }
    setCommentError("");
    return true;
  };

  const handleSubmitOfForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(validateComment(comment)){

    const commentAndRating = {
      userName: userDataToken?.username,
      contextOfComment: comment,
      rating: rating,
      userId: userDataToken?.id,
    };
    try {
      const response = await fetch(
        `/enterprises/addComment/${singleEnterprise._id}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": localStorage.getItem("token") || "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentAndRating),
        }
      );
      const data = await response.json();
      setSingleEnterprises(data);
      setMessage(data.message);
    } catch (error: any) {
      console.log(error);
    }
  }};
  useEffect(() => {
    setUserDataToken(getUserData());
  }, []);

  return (
    <>

<div className="comment-content">
          <div className="entrprise-header">
            <h5 className="entrprise-title">Komentarze</h5>
            <div className="ratings-header">
            <div>Twoja ocena:</div>
            <div><Rating
            className="rating-icon"
                  onClick={handleRating}
                  size={25}
                  iconsCount={6}
                  onPointerMove={onPointerMove}
                  // onPointerLeave={() => setActualRating(0)}
                  /* Available Props */
            />
            <span>{actualRating}</span><span>/6</span></div>
            </div>
          </div>
          <div className="entrprise-body">
            {/* <!-- Location --> */}
            <div className="block-2">
              <div className="title-section">Dodaj komentarz:</div>
              <div className="details-section-comments">
              <form
              onSubmit={(event) => handleSubmitOfForm(event)}
              >
              <div className="details-section-comments">
                <textarea
                  className="add-textarea-comments"
                  rows={6}
                  defaultValue={""}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
              <div className="error-message">{commentError}</div>
              <div className="comments-footer">
                <button className="registerButton rightButton">
                  Dodaj
                </button>
              </div>
            </form>
              </div>
            </div>
            {/* <!-- About --> */}
            <div className="block-2">
              <div className="entrprise-title">Wszystkie komentarze:</div>
              {singleEnterprise.comments[0]? singleEnterprise.comments.map((enterprise) => (
              <div className="comment-content-single-comment" key={enterprise.userId.toString()}>
                <div className="author-section-comments">
                  <div className="user-name-com">{enterprise.userName}</div>
                  {(enterprise.rating)?
                  <Rating
                    className="rating-icon"
                    size={25}
                    iconsCount={6}
                    readonly={true}
                    initialValue={enterprise.rating}
                  />:null}
                  {(userDataToken?.id === enterprise.userId)?
                   <button
                className="delete-button-comment"
                title="Delete"
                onClick={() => deleteCommentAndRating()}
                >
                <AiOutlineDelete />
              </button>:null}
                </div>
                  <div className="context-section-comments">
                  {enterprise.contextOfComment}
                  </div>
              </div>
              )):
              <div className="details-section">
                Brak komentarzy
              </div>
              }
            </div>
          </div>
        </div>

    </>
  );
};

export default Comments;
