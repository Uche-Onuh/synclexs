import { useSelector } from "react-redux";

const useAuth = () => {
  // Access the user state from the Redux store
  const { isLoggedIn } = useSelector((state) => state.user);

  // Check if the isLoggedin
  if (isLoggedIn) {
    return isLoggedIn;
  } else {
    return null;
  }
};

export default useAuth;
