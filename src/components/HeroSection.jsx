import { Link } from "react-router-dom";
import hero from "../assets/images/verifyrlanding.png";
import databiz from "../assets/images/client-databiz.svg";
import audiophile from "../assets/images/client-audiophile.svg";
import meet from "../assets/images/client-meet.svg";
import maker from "../assets/images/client-maker.svg";

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse justify-between md:flex-row mt-10 lg:mt-0 ">
      <div className="mt-10  flex flex-col gap-8 lg:mt-28">
        <p className="font-bold text-5xl text-cyan-700 text-center md:text-left">
          Make remote work
        </p>
        <p className="text-center md:text-left">
          Get your team in sync,no matter your location,
          <br className="hidden lg:block" />
          Streamline processes,create
          <br className="lg:hidden" /> team rituals{" "}
          <br className="hidden lg:block" /> and watch productivity soar
        </p>
        <Link to="/verify " className="w-[8rem] mx-auto md:mx-0 ">
          <p className=" py-2 px-4 text-white text-center bg-cyan-700 rounded-md cursor-pointer">
            Verify now
          </p>
        </Link>

        <ul className="flex gap-4 items-center my-8 md:my-0 md:mt-16">
          <li>
            <img src={databiz} alt="databiz" />
          </li>
          <li>
            <img src={audiophile} alt="audiophile" />
          </li>
          <li>
            <img src={meet} alt="meet" />
          </li>
          <li>
            <img src={maker} alt="maker" />
          </li>
        </ul>
      </div>
      <div className=" w-full lg:w-auto">
        <img src={hero} alt="hero image" className="mx-auto" />
      </div>
    </div>
  );
};

export default HeroSection;
