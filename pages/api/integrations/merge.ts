import { HttpBearerAuth, LinkTokenApi } from "@mergeapi/merge-hris-node";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

// Initialize merge API
const auth = new HttpBearerAuth();
auth.accessToken = "ADD_PROD_KEY_HERE";

const apiInstance = new LinkTokenApi();
apiInstance.setDefaultAuthentication(auth);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    // TODO: Get these from session
    const { slug, email } = req.body;

    const mergeEndUserOriginId = nanoid();

    const endUserDetails = {
      end_user_origin_id: mergeEndUserOriginId, // unique entity ID
      end_user_organization_name: slug, // your user's organization name
      end_user_email_address: email, // your user's email address
      categories: ["hris"],
    };

    try {
      const response = await apiInstance.linkTokenCreate(endUserDetails);
      res.status(200).json({
        data: { linkToken: response.body.link_token, mergeEndUserOriginId },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: { msg: "Error requesting link token" } });
    }
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
