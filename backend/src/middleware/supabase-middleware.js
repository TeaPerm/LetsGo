export async function getUser(supabase, token) {
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  console.log("user " + JSON.stringify(user));
  return user;
}

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

export const supabase_middleware = async (req, res, supabase) => {
  const JWT = getToken(req);
  switch (JWT) {
    case null:
      res.status(401).json({ error: "no JWT parsed" });
      break;
    default:
      const { data: { user }, } = await supabase.auth.getUser(JWT);
      req.user = user;
  }
};
