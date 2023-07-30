import DisplayCards from "../components/displayCards";
import Header from "../components/header";
import Footer from "../components/footer";
import JoinDialog from "../components/joinDialog/JoinDialog";
import { useState } from "react";
const HomePage = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [groupId, setGroupId] = useState("");
  return (
    <>
      <Header />
      <DisplayCards
        setGroupId={(id: string) => setGroupId(id)}
        openJoinGroupDialog={() => setIsJoinDialogOpen(true)}
      />
      <JoinDialog
        open={isJoinDialogOpen}
        id={groupId}
        closeJoinDialog={() => setIsJoinDialogOpen(false)}
      />
      <Footer />
    </>
  );
};

export default HomePage;
