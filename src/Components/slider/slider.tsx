import { useEffect, useState } from "react";
import { enterprise, imagesType } from "../../Pages/SingleEnterprise/singleEnterprise";
import "./slider.css";

const Slider = (props:{enterprise:enterprise}) => {

  const images:imagesType[]=props.enterprise.imagesEnterprise;


  const [slide, setSlide] = useState(1)

    const autoPlay = () => {
        if(slide !== images.length){
            setSlide(slide + 1)
        } 
        else{
            setSlide(1)
        }
    }

    const moveDot = (index:number) => {
        setSlide(index)
    }

    useEffect(()=>{
      const play = setInterval(()=>{
          autoPlay();        
      }, 4000);
      return () => clearInterval(play);
  });

    return (
      <div className="container-slider">
        {images.map((obj, index) => {
          return (
            <div
              key={obj.public_id}
              className={
                slide === index + 1 ? "photo active" : "photo"
              }
            >
              <img key={obj.public_id} src={obj.url} alt="error" />
            </div>
          );
        })}

        <div className="dots">
        {images.map((_, i) =>  (
            <div
            key={i}
              onClick={() => moveDot(i+1)}
              className={slide === i+1 ? "prezentation dot" : "dot"}
            ></div>
          ))}
        </div>
      </div>
    );
}

export default Slider;
