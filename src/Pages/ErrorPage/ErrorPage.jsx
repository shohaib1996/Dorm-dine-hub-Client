import Lottie from "react-lottie";
import error_lottie from "../../../public/error_lottie.json"
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error_lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Lottie
          options={defaultOptions}
          height={400}
          width={600}

        />
        <Link to="/">
          <button className="btn btn-accent text-white">Go Home</button>
        </Link>
      </div>

    </div>
  );
};

export default ErrorPage;