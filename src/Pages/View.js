import AddVideoCard from "../Components/AddVideoCard";
import VideoContainer from "../Components/VideoContainer";
import AddCategoryCard from "../Components/AddCategoryCard";
import RandomVideoCard from "../Components/RandomVideoCard";
import { useState } from "react";
import CollectionsContainer from "../Components/CollectionsContainer";

const View = () => {
  const [card, setCard] = useState({});

  const[category, setCategory]=useState()

  //  const [show, setShow] = useState(false);

  return (
    <div className="main-view w-100">
      <div className="main-container w-100">
        <h3>Whats possible with Play n Pause</h3>
        <div className="card-container">
          <AddVideoCard setCard={setCard}> </AddVideoCard>
          <AddCategoryCard setCategory={setCategory}></AddCategoryCard>
          <RandomVideoCard></RandomVideoCard>
        </div>

        <div className="sections">
          <VideoContainer
            card={card}
          ></VideoContainer>
          <CollectionsContainer
            category={category}
      
          ></CollectionsContainer>
        </div>
      </div>
    </div>
  );
};

export default View;
