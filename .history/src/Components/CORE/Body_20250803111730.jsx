import ProfileView from "./ProfileView";

const Body = () => {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/view");
      if (res.data.success) {
        dispatch(addUser(res.data.profile));
        setProfile(res.data.profile);
      } else {
        setErrorMsg(res.data.message || "Profile not found");
      }
    } catch (error) {
      navigate("/login");
      setErrorMsg(error?.response?.data?.message || "Unexpected error");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4">
      {profile ? (
        <ProfileView profile={profile} />
      ) : (
        <p>{errorMsg || "Loading..."}</p>
      )}
    </div>
  );
};
export default Body;