import Leftbar from "../Leftbar/Leftbar";
import RightBar from "../RightBar/RightBar";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-between">
      <Leftbar />
      <RightBar />
    </div>
  );
};

export default Home;
