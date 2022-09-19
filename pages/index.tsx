import { useMergeLink } from "@mergeapi/react-merge-link";
import axios from "axios";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

const Home: NextPage = () => {
  const [linkToken, setLinkToken] = useState("");

  const onSuccess = useCallback((public_token: string) => {
    // Send public_token to server (Step 3)
  }, []);

  const { open, isReady } = useMergeLink({
    linkToken: linkToken,
    onSuccess,
  });

  const startNewConnection = useCallback(async () => {
    const response = await axios.post("/api/integrations/merge", {
      slug: "companyslug",
      email: "user@email.com",
    });

    setLinkToken(response.data.data.linkToken);
  }, []);

  useEffect(() => {
    startNewConnection();
  }, [startNewConnection]);

  return (
    <div>
      <button disabled={!isReady} onClick={open}>
        Preview linking experience
      </button>
    </div>
  );
};

export default Home;
