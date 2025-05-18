import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OauthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const username = searchParams.get("username");
    if (token && username) {
      localStorage.setItem("token", token);
      navigate(`/restaurant/${username}`);
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams]);

  return <div>Logging you in...</div>;
};

export default OauthSuccess;