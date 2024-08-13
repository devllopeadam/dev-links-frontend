import ProfileCard from "@/app/components/ProfileCard";

const Links = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <ProfileCard links={[{
        id: "2",
        url: "https://github.com/devllopeadam",
        name: "bibakhawa",
      }]} user={{
        profile_picture: "",
        first_name: "jeniah adam",
        last_name: "jeniah adam",
        email: "",
      }} />
    </div>
  )
};

export default Links;