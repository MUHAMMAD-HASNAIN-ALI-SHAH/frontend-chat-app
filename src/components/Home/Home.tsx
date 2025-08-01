import { useEffect, useState } from "react";
import Leftbar from "../Leftbar/Leftbar";
import RightBar from "../RightBar/RightBar";
import { useChatStore } from "@/store/useChatStore";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const Home = () => {
  const width = useWindowWidth();
  const isMobile = width < 935;
  const { selectedChat } = useChatStore();

  return (
    <div className="w-full h-full flex">
      {(!isMobile || !selectedChat) && (
        <div
          className={`${
            isMobile ? "w-full" : "w-[25%]"
          } h-full overflow-y-auto p-2 flex flex-col gap-3`}
        >
          <Leftbar />
        </div>
      )}

      {(!isMobile || selectedChat) && (
        <div
          className={`${isMobile ? "w-full" : "w-[75%]"} h-full flex flex-col`}
        >
          <RightBar />
        </div>
      )}
    </div>
  );
};

export default Home;
