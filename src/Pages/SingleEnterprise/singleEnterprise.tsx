import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Comments from "../../Components/comments/comments";
import Map from "../../Components/map/map"
import Slider from "../../Components/slider/slider";
import { countRating } from "../../config/countRating";
import { enterprise } from "../../config/types";
import "./singleEnterprise.css";

const SingleEnterprise = () => {

  let { name } = useParams();

  const [singleEnterprise, setSingleEnterprises] = useState<enterprise | null>(
    null
  );

  // const countRating = () => {
  //   let sum = 0;
  //   let count = 0;
  //   singleEnterprise?.comments.forEach((comment) => {
  //     if(comment.rating){
  //         sum += comment.rating;
  //         count++;
  //       }
  //   });
  //   console.log(sum/count)
  //   return sum / count;
  // };


  const fetchEnterprises = async () => {
    const jsonEnterprise = await fetch(
      `/enterprises/getEnterpriseByName/${name}`
    );
    window.scroll(0, 0);

    const enterprise = await jsonEnterprise.json();
    if (enterprise.length > 0) {
      setSingleEnterprises(enterprise[0]);
    }
  };
  useEffect(() => {
    fetchEnterprises();

  }, []);

  return (
    <>
      <div className="main-container-to-enterprise">
        <div className="entrprise-content">
          <div className="entrprise-header">
            <h5 className="entrprise-title">{singleEnterprise?.name}</h5>
            <div className="ratings-header">
            <div>{singleEnterprise&&<Rating
            className="rating-icon"
                  size={35}
                  iconsCount={6}
                  readonly={true}
                  initialValue={countRating(singleEnterprise)}
                  allowFraction={true}
                  /* Available Props */
            />}
            </div>
            </div>
          </div>
          <div className="entrprise-body">
            {/* <!-- Location --> */}
            <div className="block-2">
              <div className="title-section">Dane adresowe:</div>
              <div className="details-section">
              <span className="detals-helper">Adres (ulica):</span> {singleEnterprise?.street}<span className="detals-helper"> Nr. </span>{singleEnterprise?.number}<br/>
              <span className="detals-helper">Kod Pocztowy:</span> {singleEnterprise?.zipCode} <br/>
              <span className="detals-helper">Miasto:</span> {singleEnterprise?.city} <br/>
              <span className="detals-helper">Województwo: </span>{singleEnterprise?.voivodeship}
           
              </div>
            </div>
            {/* <!-- About --> */}
            <div className="block-2">
              <div className="title-section">Dane kontaktowe:</div>
              <div className="details-section">
              <span className="detals-helper">Tel:</span> {singleEnterprise?.numberPhone} <br/>
              <span className="detals-helper">Email:</span> {singleEnterprise?.email} <br/>
              <span className="detals-helper">Strona</span> <a href="{singleEnterprise?.webside}">{singleEnterprise?.webside}</a><br/>
              </div>
            </div>
            {/* <!-- About --> */}
            <div className="block-2">
              <div className="title-section">Opis Firmy:</div>
              <div className="details-section">
                <div className="description-section">
                {singleEnterprise?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="album-photo">
             {singleEnterprise&&<Slider enterprise={singleEnterprise}/>}
        </div>
        <div className="map-section">      
          {singleEnterprise&&<Map enterprise={singleEnterprise}/>}
      </div>

      <div className="comment-section">
      {singleEnterprise && <Comments singleEnterprise={singleEnterprise} setSingleEnterprises={setSingleEnterprises}></Comments>}
        
      </div>
      </div>
    </>
  );
};

export default SingleEnterprise;
